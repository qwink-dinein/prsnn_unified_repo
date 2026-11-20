-- STATUS: applied 20 Nov; checked live (prices, campaigns, companion share) with round16.
-- First-hour offer + admin campaigns (owner, 20 Nov).
-- • First-hour offer: a member's first booking has its first hour at ₹99 and every other hour at the normal
--   price, so it costs the package price minus (1-hour price − ₹99) = ₹300 off today. "First" = no paid
--   booking yet; a booking refunded because no companion was free (alloc_state 'failed') doesn't count.
-- • Campaigns: a superadmin runs one at a time (label, headline, % off or a price per hour, everyone or new
--   members only, which lengths, start and end). The member pays the lowest of normal / first-hour / campaign,
--   never both discounts. The price is locked on the booking (package_price), and list_price keeps the normal
--   price so companions are paid their usual share of the FULL price: prsnn pays the discount.

alter table public.bookings
  add column if not exists list_price integer,
  add column if not exists offer_kind text check (offer_kind in ('first_hour', 'campaign')),
  add column if not exists offer_label text,
  add column if not exists campaign_id uuid;

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  label text not null check (char_length(label) between 2 and 30),
  headline text not null check (char_length(headline) between 4 and 80),
  kind text not null check (kind in ('percent', 'per_hour')),
  value integer not null check (value > 0),
  audience text not null default 'everyone' check (audience in ('everyone', 'new')),
  hours integer[] not null default '{1,2,3,4,5,6,7,8,9,10,11,12}',
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  ended_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at),
  check (kind <> 'percent' or value between 1 and 90)
);
create index if not exists campaigns_window on public.campaigns (starts_at, ends_at) where ended_at is null;
create index if not exists campaigns_created_by on public.campaigns (created_by);
alter table public.campaigns enable row level security; -- read and written only through the functions below
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'bookings_campaign_id_fkey') then
    alter table public.bookings add constraint bookings_campaign_id_fkey foreign key (campaign_id) references public.campaigns (id) on delete set null;
  end if;
end $$;
create index if not exists bookings_campaign on public.bookings (campaign_id);

-- The offer lives with the other prices (settings.pricing); on by default at ₹99.
update public.settings set value = value || '{"firstHourOffer": {"on": true, "price": 99}}'::jsonb
 where key = 'pricing' and not value ? 'firstHourOffer';

create or replace function private.is_first_timer(uid uuid)
returns boolean language sql stable set search_path = '' as $$
  select uid is not null and not exists (
    select 1 from public.bookings b where b.requester_id = uid and b.payment_status in ('paid', 'refunded') and b.alloc_state is distinct from 'failed')
$$;

create or replace function private.active_campaign()
returns public.campaigns language sql stable set search_path = '' as $$
  select * from public.campaigns where ended_at is null and starts_at <= now() and ends_at > now() order by starts_at desc limit 1
$$;

-- What `uid` pays for `hrs` hours and why. assume_new: show a logged-out visitor the new-member prices.
create or replace function private.quote(uid uuid, hrs integer, assume_new boolean default false)
returns jsonb language plpgsql stable set search_path = '' as $$
declare normal integer := private.price_for(hrs); one integer := private.price_for(1); fo jsonb := private.pricing() -> 'firstHourOffer';
        fhp integer; is_new boolean; best integer; kind text; label text; cid uuid; c public.campaigns; p integer;
begin
  if normal is null then return null; end if;
  best := normal;
  is_new := assume_new or private.is_first_timer(uid);
  fhp := (fo ->> 'price')::integer;
  if coalesce((fo ->> 'on')::boolean, false) and is_new and fhp is not null and fhp < one then
    p := normal - (one - fhp);
    if p < best then best := p; kind := 'first_hour'; label := 'First hour offer'; end if;
  end if;
  c := private.active_campaign();
  if c.id is not null and hrs = any (c.hours) and (c.audience = 'everyone' or is_new) then
    p := case when c.kind = 'percent' then round(normal * (100 - c.value) / 100.0)::integer else least(normal, c.value * hrs) end;
    if p < best then best := p; kind := 'campaign'; label := c.label; cid := c.id; end if;
  end if;
  return jsonb_build_object('hours', hrs, 'normal', normal, 'price', best, 'saving', normal - best, 'kind', kind, 'label', label, 'campaignId', cid,
    'firstHour', case when kind = 'first_hour' then fhp end, 'rest', case when kind = 'first_hour' then best - fhp end);
end $$;

-- Home, companion page and checkout: today's offer prices for the person asking (or a visitor).
create or replace function public.price_offers()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); fo jsonb := private.pricing() -> 'firstHourOffer'; c public.campaigns := private.active_campaign();
        anon boolean := uid is null; is_new boolean; h integer; prices jsonb := '{}'::jsonb; one integer := private.price_for(1);
begin
  is_new := anon or private.is_first_timer(uid);
  for h in 1..12 loop prices := prices || jsonb_build_object(h::text, private.quote(uid, h, anon)); end loop;
  return jsonb_build_object(
    'firstHour', case when coalesce((fo ->> 'on')::boolean, false) and is_new and (fo ->> 'price')::integer < one
                      then jsonb_build_object('price', (fo ->> 'price')::integer, 'saving', one - (fo ->> 'price')::integer) end,
    'campaign', case when c.id is not null and (c.audience = 'everyone' or is_new) then jsonb_build_object(
      'id', c.id, 'label', c.label, 'headline', c.headline, 'kind', c.kind, 'value', c.value, 'audience', c.audience, 'hours', to_jsonb(c.hours), 'endsAt', c.ends_at) end,
    'prices', prices);
end $$;

-- ── Admin (superadmin changes, staff can look) ──
create or replace function public.admin_campaigns()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare fo jsonb := private.pricing() -> 'firstHourOffer';
begin
  perform private.need_staff();
  return jsonb_build_object(
    'firstHour', jsonb_build_object('on', coalesce((fo ->> 'on')::boolean, false), 'price', (fo ->> 'price')::integer,
      'bookings', (select count(*) from public.bookings where offer_kind = 'first_hour' and payment_status = 'paid'),
      'discount', (select coalesce(sum(list_price - package_price), 0) from public.bookings where offer_kind = 'first_hour' and payment_status = 'paid')),
    'campaigns', (select coalesce(jsonb_agg(jsonb_build_object(
        'id', c.id, 'label', c.label, 'headline', c.headline, 'kind', c.kind, 'value', c.value, 'audience', c.audience, 'hours', to_jsonb(c.hours),
        'startsAt', c.starts_at, 'endsAt', c.ends_at, 'endedAt', c.ended_at,
        'status', case when c.ended_at is not null or c.ends_at <= now() then 'ended' when c.starts_at > now() then 'scheduled' else 'running' end,
        'bookings', (select count(*) from public.bookings b where b.campaign_id = c.id and b.payment_status = 'paid'),
        'discount', (select coalesce(sum(b.list_price - b.package_price), 0) from public.bookings b where b.campaign_id = c.id and b.payment_status = 'paid'))
      order by c.created_at desc), '[]'::jsonb) from (select * from public.campaigns order by created_at desc limit 50) c));
end $$;

create or replace function public.admin_save_campaign(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare c public.campaigns; cid uuid := nullif(p ->> 'id', '')::uuid; hrs integer[]; s timestamptz; e timestamptz;
begin
  perform private.need_super();
  if char_length(trim(coalesce(p ->> 'label', ''))) not between 2 and 30 then perform private.fail('Add a short label (2 to 30 characters).'); end if;
  if char_length(trim(coalesce(p ->> 'headline', ''))) not between 4 and 80 then perform private.fail('Add a headline (4 to 80 characters).'); end if;
  if coalesce(p ->> 'kind', '') not in ('percent', 'per_hour') then perform private.fail('Choose % off or a price per hour.'); end if;
  if (p ->> 'value') !~ '^[0-9]+$' then perform private.fail('Enter the discount as a whole number.'); end if;
  if p ->> 'kind' = 'percent' and (p ->> 'value')::integer not between 1 and 90 then perform private.fail('Percent off must be between 1 and 90.'); end if;
  if p ->> 'kind' = 'per_hour' and (p ->> 'value')::integer not between 1 and private.price_for(1) - 1 then
    perform private.fail('The price per hour must be below the normal 1-hour price (₹' || private.price_for(1) || ').'); end if;
  hrs := array(select distinct x::integer from jsonb_array_elements_text(coalesce(p -> 'hours', '[]'::jsonb)) x where x ~ '^[0-9]+$' and x::integer between 1 and 12 order by 1);
  if cardinality(hrs) = 0 then perform private.fail('Choose at least one length.'); end if;
  s := coalesce(nullif(p ->> 'startsAt', '')::timestamptz, now());
  begin e := (p ->> 'endsAt')::timestamptz; exception when others then perform private.fail('Choose when it ends.'); end;
  if e is null or e <= greatest(s, now()) then perform private.fail('The end must be after the start and in the future.'); end if;
  if exists (select 1 from public.campaigns o where o.ended_at is null and o.ends_at > now() and o.id is distinct from cid
              and tstzrange(o.starts_at, o.ends_at) && tstzrange(s, e)) then
    perform private.fail('Another campaign runs at that time. End it first, or pick other dates.');
  end if;
  if cid is null then
    insert into public.campaigns (label, headline, kind, value, audience, hours, starts_at, ends_at, created_by)
    values (trim(p ->> 'label'), trim(p ->> 'headline'), p ->> 'kind', (p ->> 'value')::integer, coalesce(nullif(p ->> 'audience', ''), 'everyone'), hrs, s, e, (select auth.uid()))
    returning * into c;
  else
    update public.campaigns set label = trim(p ->> 'label'), headline = trim(p ->> 'headline'), kind = p ->> 'kind', value = (p ->> 'value')::integer,
           audience = coalesce(nullif(p ->> 'audience', ''), 'everyone'), hours = hrs, starts_at = s, ends_at = e
     where id = cid and ended_at is null returning * into c;
    if not found then perform private.fail('Campaign not found or already ended.'); end if;
  end if;
  perform private.audit('campaign.save', 'campaign', c.id::text, null, to_jsonb(c));
  return jsonb_build_object('message', case when c.starts_at <= now() then 'Campaign is live. It shows on Home now.' else 'Campaign scheduled.' end, 'id', c.id);
end $$;

create or replace function public.admin_end_campaign(cid uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  perform private.need_super();
  update public.campaigns set ended_at = now() where id = cid and ended_at is null;
  if not found then perform private.fail('Campaign not found or already ended.'); end if;
  perform private.audit('campaign.end', 'campaign', cid::text, null, null);
  return jsonb_build_object('message', 'Campaign ended. Bookings already made keep their price.');
end $$;

create or replace function public.admin_set_first_hour_offer(is_on boolean, price integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare before jsonb := private.pricing() -> 'firstHourOffer';
begin
  perform private.need_super();
  if price is null or price < 1 or price >= private.price_for(1) then
    perform private.fail('The first-hour price must be between ₹1 and ₹' || (private.price_for(1) - 1) || '.'); end if;
  update public.settings set value = value || jsonb_build_object('firstHourOffer', jsonb_build_object('on', is_on, 'price', price)) where key = 'pricing';
  perform private.audit('settings.first_hour_offer', 'settings', 'pricing', before, jsonb_build_object('on', is_on, 'price', price));
  return jsonb_build_object('message', case when is_on then 'First-hour offer is on at ₹' || price || '.' else 'First-hour offer is off.' end);
end $$;

revoke all on function public.price_offers(), public.admin_campaigns(), public.admin_save_campaign(jsonb), public.admin_end_campaign(uuid),
  public.admin_set_first_hour_offer(boolean, integer) from public;
grant execute on function public.price_offers() to anon, authenticated;
grant execute on function public.admin_campaigns(), public.admin_save_campaign(jsonb), public.admin_end_campaign(uuid),
  public.admin_set_first_hour_offer(boolean, integer) to authenticated;

-- ── Patch existing functions (exact text replacements; fail loudly if the text changed) ──
do $$
declare
  edits constant jsonb := jsonb_build_array(
    -- booking: price from the quote, record the offer, cancel this member's other unpaid first-hour bookings
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', 'declare uid uuid := (select auth.uid());', 'new', 'declare q jsonb; uid uuid := (select auth.uid());'),
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', 'price := private.price_for(hrs);', 'new', 'q := private.quote(uid, hrs); price := (q ->> ''price'')::int;'),
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', '  insert into public.bookings (requester_id, preferred_companion_id,',
      'new', '  if q ->> ''kind'' = ''first_hour'' then
    update public.bookings set alloc_state = ''cancelled'', status = ''cancelled'', cancelled_by = ''system'', cancel_reason = ''replaced_by_new_booking'', cancelled_at = now()
     where requester_id = uid and offer_kind = ''first_hour'' and alloc_state = ''awaiting_payment'' and payment_status <> ''paid'';
  end if;
  insert into public.bookings (requester_id, preferred_companion_id,'),
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', 'recipient_city, recipient_state)', 'new', 'recipient_city, recipient_state, list_price, offer_kind, offer_label, campaign_id)'),
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', 'left(rec ->> ''state'', 80))',
      'new', 'left(rec ->> ''state'', 80), case when q ->> ''kind'' is not null then (q ->> ''normal'')::int end, q ->> ''kind'', q ->> ''label'', (q ->> ''campaignId'')::uuid)'),
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', '''pricePerHour'', 399, ''duration'', dur::text))',
      'new', '''pricePerHour'', 399, ''duration'', dur::text, ''normal'', (q ->> ''normal'')::int, ''saving'', (q ->> ''saving'')::int, ''offer'', q ->> ''kind'', ''offerLabel'', q ->> ''label'', ''firstHour'', (q ->> ''firstHour'')::int, ''rest'', (q ->> ''rest'')::int))'),
    jsonb_build_object('fn', 'public.create_prepaid_booking(jsonb)', 'old', '''pricePerHour'', b.price_per_hour, ''duration'', b.duration_min::text))',
      'new', '''pricePerHour'', b.price_per_hour, ''duration'', b.duration_min::text, ''normal'', coalesce(b.list_price, b.package_price), ''saving'', coalesce(b.list_price - b.package_price, 0), ''offer'', b.offer_kind, ''offerLabel'', b.offer_label))'),
    -- companions are paid their share of the FULL price
    jsonb_build_object('fn', 'public.accept_offer(uuid)', 'old', 'companion_share = floor(amount_paid * (1 - share))', 'new', 'companion_share = floor(coalesce(list_price, amount_paid) * (1 - share))'),
    jsonb_build_object('fn', 'public.admin_reassign_booking(uuid,uuid)', 'old', 'companion_share = floor(amount_paid * (1 - (private.pricing()', 'new', 'companion_share = floor(coalesce(list_price, amount_paid) * (1 - (private.pricing()'),
    jsonb_build_object('fn', 'public.incoming_bookings()', 'old', 'coalesce(b.companion_share, floor(b.amount_paid * (1 -', 'new', 'coalesce(b.companion_share, floor(coalesce(b.list_price, b.amount_paid) * (1 -'),
    jsonb_build_object('fn', 'private.next_offer(uuid)', 'old', 'floor(b.amount_paid * (1 - (p ->> ''platformShare'')::numeric))', 'new', 'floor(coalesce(b.list_price, b.amount_paid) * (1 - (p ->> ''platformShare'')::numeric))'),
    -- the app sees the normal price and the offer on every booking
    jsonb_build_object('fn', 'private.booking_json(public.bookings,uuid)', 'old', '''amountPaid'', b.amount_paid, ''paidAt'', b.paid_at,',
      'new', '''listPrice'', b.list_price, ''offerKind'', b.offer_kind, ''offerLabel'', b.offer_label, ''amountPaid'', b.amount_paid, ''paidAt'', b.paid_at,'),
    -- re-pricing unpaid bookings never removes an offer
    jsonb_build_object('fn', 'public.admin_save_pricing(jsonb,boolean)', 'old', 'where alloc_state = ''awaiting_payment'' and payment_status = ''pending'' and package_price <>',
      'new', 'where offer_kind is null and alloc_state = ''awaiting_payment'' and payment_status = ''pending'' and package_price <>'));
  e jsonb; cur_fn text := ''; buf text;
begin
  for e in select * from jsonb_array_elements(edits) loop
    if e ->> 'fn' <> cur_fn then
      if cur_fn <> '' then execute buf; end if;
      cur_fn := e ->> 'fn';
      buf := pg_get_functiondef(cur_fn::regprocedure);
    end if;
    if position(e ->> 'old' in buf) = 0 then raise exception 'Text not found in %: %', cur_fn, e ->> 'old'; end if;
    buf := replace(buf, e ->> 'old', e ->> 'new');
  end loop;
  execute buf;
end $$;
