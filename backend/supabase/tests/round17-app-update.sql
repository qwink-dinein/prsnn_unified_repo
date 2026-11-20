-- Force update (migration 20261120140000). Paste into the SQL editor: everything is rolled back.
begin;
create temp table r(t text, v text) on commit drop;
do $$
declare s uuid; m uuid; o jsonb;
begin
  select id into s from public.profiles where staff_role = 'superadmin' limit 1;
  select id into m from public.profiles where staff_role is null limit 1;
  insert into r values ('default: nobody blocked', (select value -> 'android' ->> 'minVersion' from public.settings where key = 'app_update') is null::text);

  perform set_config('request.jwt.claims', json_build_object('sub', m, 'role', 'authenticated')::text, true);
  begin perform public.admin_set_app_update('{"android": {"minVersion": "9.9.9"}}'); insert into r values ('member can set it', 'yes (bug)');
  exception when others then insert into r values ('member can set it', 'no'); end;

  perform set_config('request.jwt.claims', json_build_object('sub', s, 'role', 'authenticated')::text, true);
  begin perform public.admin_set_app_update('{"android": {"minVersion": "1.x"}}'); insert into r values ('bad version', 'saved (bug)');
  exception when others then insert into r values ('bad version', 'refused'); end;
  begin perform public.admin_set_app_update('{"ios": {"url": "http://x"}}'); insert into r values ('http link', 'saved (bug)');
  exception when others then insert into r values ('http link', 'refused'); end;
  o := public.admin_set_app_update('{"android": {"minVersion": "1.0.1", "minBuild": 8, "url": "https://prsnn.com/app.apk"}, "ios": {}, "message": "Please update"}');
  insert into r values ('superadmin saves', (o -> 'value' -> 'android' ->> 'minVersion') || ' build ' || (o -> 'value' -> 'android' ->> 'minBuild'));
  insert into r values ('stored', (select value ->> 'message' from public.settings where key = 'app_update'));
end $$;
select * from r;
rollback;
