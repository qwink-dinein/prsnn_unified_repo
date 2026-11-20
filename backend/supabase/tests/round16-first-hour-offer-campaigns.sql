-- First-hour offer + campaigns (migration 20261120100000). Paste into the SQL editor: everything is rolled back.
begin;
create temp table r(t text, v text) on commit drop;
do $$
declare newbie uuid; regular uuid; s uuid; q jsonb; o jsonb; cid uuid;
begin
  select id into s from public.profiles where staff_role = 'superadmin' limit 1;
  select p.id into newbie from public.profiles p where p.role = 'user' and p.staff_role is null and private.is_first_timer(p.id) limit 1;
  select p.id into regular from public.profiles p where p.role = 'user' and not private.is_first_timer(p.id) limit 1;

  q := private.quote(newbie, 1); insert into r values ('first-timer, 1 hour', (q ->> 'price') || ' (normal ' || (q ->> 'normal') || ')');
  q := private.quote(newbie, 2); insert into r values ('first-timer, 2 hours = ₹99 + rest', (q ->> 'price') || ' = ' || (q ->> 'firstHour') || ' + ' || (q ->> 'rest'));
  q := private.quote(newbie, 12); insert into r values ('first-timer, 12 hours saves 300', (q ->> 'saving'));
  q := private.quote(regular, 2); insert into r values ('regular member pays normal', (q ->> 'price') || ' kind=' || coalesce(q ->> 'kind', 'none'));

  perform set_config('request.jwt.claims', json_build_object('sub', s, 'role', 'authenticated')::text, true);
  o := public.admin_save_campaign(jsonb_build_object('label', 'Test sale', 'headline', '25% off every booking', 'kind', 'percent', 'value', 25,
        'audience', 'everyone', 'hours', jsonb_build_array(1,2,4), 'endsAt', (now() + interval '2 days')::text));
  cid := (o ->> 'id')::uuid;
  begin
    perform public.admin_save_campaign(jsonb_build_object('label', 'Clash', 'headline', 'Another one', 'kind', 'percent', 'value', 10,
          'hours', jsonb_build_array(1), 'endsAt', (now() + interval '1 day')::text));
    insert into r values ('two campaigns at once', 'allowed (bug)');
  exception when others then insert into r values ('two campaigns at once', 'refused'); end;
  q := private.quote(regular, 2); insert into r values ('regular, campaign 25% off 699', (q ->> 'price') || ' ' || coalesce(q ->> 'label', ''));
  q := private.quote(newbie, 1); insert into r values ('first-timer gets the lower (99 vs 299)', (q ->> 'price') || ' ' || (q ->> 'kind'));
  q := private.quote(regular, 6); insert into r values ('length not in campaign', (q ->> 'price') || ' kind=' || coalesce(q ->> 'kind', 'none'));

  perform set_config('request.jwt.claims', json_build_object('sub', regular, 'role', 'authenticated')::text, true);
  o := public.price_offers(); insert into r values ('Home shows campaign to regular', coalesce(o -> 'campaign' ->> 'label', 'none') || ', firstHour=' || coalesce(o ->> 'firstHour', 'none'));
  begin perform public.admin_end_campaign(cid); insert into r values ('member can end campaign', 'yes (bug)');
  exception when others then insert into r values ('member can end campaign', 'no'); end;

  perform set_config('request.jwt.claims', json_build_object('sub', s, 'role', 'authenticated')::text, true);
  perform public.admin_end_campaign(cid);
  q := private.quote(regular, 2); insert into r values ('after ending: normal again', (q ->> 'price'));
  insert into r values ('admin list has it', (select (public.admin_campaigns() -> 'campaigns' -> 0 ->> 'status')));
end $$;
select * from r;
rollback;
