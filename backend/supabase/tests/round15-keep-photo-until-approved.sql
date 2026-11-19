-- Keep the old photo until a new one is approved (migration 20261119100000). Paste into the SQL editor:
-- everything is rolled back.
begin;
create temp table r(t text, v text) on commit drop;
do $$
declare c public.profiles; old_url text; seen text;
begin
  select * into c from public.profiles where role = 'companion' and photo_status = 'approved' and photo_path is not null and staff_role is null limit 1;
  old_url := private.public_photo(c);
  insert into r values ('approved photo is visible', (old_url is not null)::text);

  update public.profiles set photo_path = c.id || '/new-test.jpg' where id = c.id returning * into c;
  insert into r values ('new upload is pending', c.photo_status);
  insert into r values ('others still see the old photo', (private.public_photo(c) = old_url)::text);

  update public.profiles set photo_status = 'changes_requested' where id = c.id returning * into c;
  insert into r values ('new photo flagged: old one still shows', (private.public_photo(c) = old_url)::text);

  update public.profiles set photo_path = c.id || '/newer-test.jpg' where id = c.id returning * into c;
  update public.profiles set photo_status = 'approved' where id = c.id returning * into c;
  seen := private.public_photo(c);
  insert into r values ('after approval the new photo shows', (seen like '%newer-test.jpg%')::text);

  update public.profiles set photo_status = 'changes_requested' where id = c.id returning * into c;
  insert into r values ('live photo flagged: hidden', (private.public_photo(c) is null)::text);

  update public.profiles set photo_path = null where id = c.id returning * into c;
  insert into r values ('photo removed: nothing shows', (private.public_photo(c) is null)::text);
end $$;
select * from r;
rollback;
