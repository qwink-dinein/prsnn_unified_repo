-- STATUS: written 19 Nov, NOT applied yet (waiting for the owner to approve the Supabase prompt).
-- A new photo no longer hides the old one (owner, 19 Nov). Until staff approve a new photo, everyone
-- else keeps seeing the last approved one. If staff ask for changes to the photo that is live, it is
-- hidden at once. Removing the photo removes it everywhere. The person always sees their own latest upload.
alter table public.profiles add column if not exists approved_photo_path text;

update public.profiles set approved_photo_path = photo_path where photo_status = 'approved' and photo_path is not null;

-- Runs after the photo_review trigger (triggers fire in name order), so it sees the final status.
create or replace function private.keep_approved_photo()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.photo_path is null then
    new.approved_photo_path := null;
  elsif new.photo_status = 'approved' then
    new.approved_photo_path := new.photo_path;
  elsif new.photo_status = 'changes_requested' and new.photo_path = new.approved_photo_path then
    new.approved_photo_path := null; -- staff flagged the live photo itself
  end if;
  return new;
end $$;

drop trigger if exists profiles_zz_keep_approved_photo on public.profiles;
create trigger profiles_zz_keep_approved_photo before insert or update on public.profiles
  for each row execute function private.keep_approved_photo();

-- What other people see: the current photo once approved, otherwise the last approved one.
create or replace function private.public_photo(p public.profiles)
returns text language sql stable set search_path = '' as $$
  select case when p.photo_status = 'approved' and p.photo_path is not null then private.photo_url(p.photo_path)
              when p.approved_photo_path is not null then private.photo_url(p.approved_photo_path) end
$$;
