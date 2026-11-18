-- Companions choose who they meet (migration 20261118180000). Paste into the SQL editor: everything is rolled back.
begin;
create temp table r(t text, v text) on commit drop;
do $$
declare m uuid; c uuid; g public.gender; other public.gender; cnt int; x jsonb;
begin
  select id, gender into m, g from public.profiles where role = 'user' and staff_role is null and see_gender = 'everyone' and gender is not null limit 1;
  other := case when g = 'man' then 'woman' else 'man' end;
  perform set_config('request.jwt.claims', json_build_object('sub', m, 'role', 'authenticated')::text, true);
  x := public.list_companions(null); c := (x -> 0 ->> 'id')::uuid; cnt := jsonb_array_length(x);
  insert into r values ('existing companions meet everyone', (select bool_and(see_gender = 'everyone') from public.profiles where role = 'companion')::text);

  update public.profiles set see_gender = other::text::public.see_gender where id = c;
  insert into r values ('companion who meets only the other gender is hidden', (jsonb_array_length(public.list_companions(null)) = cnt - 1)::text);
  begin perform public.get_companion(c); insert into r values ('their profile opens', 'yes (bug)');
  exception when others then insert into r values ('their profile opens', 'no'); end;
  begin
    perform public.create_prepaid_booking(jsonb_build_object('companionId', c, 'idempotencyKey', 'meets-test-1', 'acceptTerms', true,
      'scheduledDate', (current_date + 3)::text, 'startTime', '12:00', 'duration', 60, 'meetingPlace', 'Inorbit Mall'));
    insert into r values ('can book them directly', 'yes (bug)');
  exception when others then insert into r values ('can book them directly', 'no: ' || sqlerrm); end;

  update public.profiles set see_gender = g::text::public.see_gender where id = c;
  insert into r values ('companion who meets this gender is shown', (jsonb_array_length(public.list_companions(null)) = cnt)::text);

  perform set_config('request.jwt.claims', 'null', true);
  update public.profiles set see_gender = other::text::public.see_gender where id = c;
  insert into r values ('logged-out visitors still browse', (jsonb_array_length(public.list_companions(null)) >= cnt)::text);
end $$;
select * from r;
rollback;
