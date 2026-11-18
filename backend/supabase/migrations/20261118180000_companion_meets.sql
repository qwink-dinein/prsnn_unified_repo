-- Companions choose who they're comfortable meeting (owner, 18 Nov). profiles.see_gender already exists:
-- for a member it's "who I want to meet", for a companion it's "who can find and book me". A member sees,
-- opens and is offered a companion only when both choices fit. Companions without a choice meet everyone.
-- Logged-out visitors (no gender known) browse as before; booking needs an account, which is checked.
-- Also: booking a companion you've blocked (or who blocked you) by calling the function directly now fails.

-- Does this companion meet someone of this gender? Unknown gender only fits "everyone".
create or replace function private.meets(c public.profiles, g public.gender)
returns boolean language sql immutable set search_path = '' as $$
  select coalesce(c.see_gender is null or c.see_gender = 'everyone' or c.see_gender::text = g::text, false)
$$;

-- Existing companions start as Everyone (only 2 had a member-era choice), so nobody disappears.
update public.profiles set see_gender = 'everyone' where role = 'companion' and see_gender is distinct from 'everyone';

create or replace function public.list_companions(see text default null)
returns jsonb language sql stable security definer set search_path = '' as $$
  with v as (select p.id, p.see_gender, p.gender from public.profiles p where p.id = (select auth.uid()))
  select coalesce(jsonb_agg(private.companion_card(c, (select id from v)) order by (c.verification_status = 'verified') desc, c.created_at desc), '[]'::jsonb)
  from public.profiles c
  where private.is_live(c)
    and c.id is distinct from (select id from v)
    and private.sees(coalesce((select see_gender from v), nullif(see, '')::public.see_gender), c.gender)
    and (not exists (select 1 from v) or private.meets(c, (select gender from v)))
    and not private.blocked(c.id, (select id from v))
$$;

create or replace function public.get_companion(cid uuid)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare c public.profiles; me public.profiles;
begin
  select * into c from public.profiles where id = cid;
  select * into me from public.profiles where id = (select auth.uid());
  if c.id is null or not private.is_live(c) or not private.sees(me.see_gender, c.gender)
     or (me.id is not null and c.id <> me.id and not private.meets(c, me.gender))
     or private.blocked(c.id, me.id) then
    perform private.fail('Companion not found.');
  end if;
  return private.companion_card(c, me.id);
end $$;

create or replace function private.eligible(c public.profiles, b public.bookings, see public.see_gender)
returns boolean language sql stable set search_path = '' as $$
  select private.is_live(c)
     and c.id is distinct from b.requester_id
     and not private.blocked(c.id, b.requester_id)
     and private.sees(see, c.gender)
     and private.meets(c, (select r.gender from public.profiles r where r.id = b.requester_id))
     and (b.city is null or lower(c.city) = lower(b.city))
     and private.available_at(c, b.scheduled_date, b.start_time)
     and (b.duration_min / 60) = any (private.offered_hours(c))
     and not exists (select 1 from public.booking_offers o where o.booking_id = b.id and o.companion_id = c.id)
     and not private.has_conflict(c.id, b)
$$;

-- create_prepaid_booking: same check on the chosen companion (one line changed, the rest kept as is).
do $$
declare def text := pg_get_functiondef('public.create_prepaid_booking(jsonb)'::regprocedure);
        old text := 'if c.id is null or not private.is_live(c) or not private.sees(me.see_gender, c.gender) then';
        new text := 'if c.id is null or not private.is_live(c) or not private.sees(me.see_gender, c.gender) or (c.id <> uid and (not private.meets(c, me.gender) or private.blocked(c.id, uid))) then';
begin
  if position(old in def) = 0 then raise exception 'create_prepaid_booking changed; update this migration'; end if;
  execute replace(def, old, new);
end $$;
