-- STATUS: applied 20 Nov; checked live with round17 (rolled back).
-- Force update (owner, 20 Nov). settings.app_update holds, per platform, the oldest app version/build that may still
-- open, and where "Update now" goes. The app reads it on every launch (settings are readable by everyone) and stops
-- older installs on an "Update required" screen. iPhone also checks the App Store's live version by itself.
-- Starts empty: nobody is blocked until a superadmin sets a requirement in Admin → App updates.
insert into public.settings (key, value)
values ('app_update', '{"android": {"minVersion": null, "minBuild": 0, "url": null}, "ios": {"minVersion": null, "minBuild": 0, "url": null}, "message": null}'::jsonb)
on conflict (key) do nothing;

create or replace function public.admin_set_app_update(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare before jsonb := (select value from public.settings where key = 'app_update'); v jsonb := '{}'::jsonb; os text; r jsonb;
begin
  perform private.need_super();
  foreach os in array array['android', 'ios'] loop
    r := coalesce(p -> os, '{}'::jsonb);
    if nullif(trim(coalesce(r ->> 'minVersion', '')), '') is not null and (r ->> 'minVersion') !~ '^\d+(\.\d+){0,3}$' then
      perform private.fail('Version looks like 1.0.3 (numbers and dots).'); end if;
    if coalesce(r ->> 'minBuild', '0') !~ '^\d+$' then perform private.fail('Build number is a whole number.'); end if;
    if nullif(trim(coalesce(r ->> 'url', '')), '') is not null and (r ->> 'url') !~ '^https://\S+$' then
      perform private.fail('The link must start with https://'); end if;
    v := v || jsonb_build_object(os, jsonb_build_object(
      'minVersion', nullif(trim(coalesce(r ->> 'minVersion', '')), ''),
      'minBuild', coalesce((r ->> 'minBuild')::integer, 0),
      'url', nullif(trim(coalesce(r ->> 'url', '')), '')));
  end loop;
  v := v || jsonb_build_object('message', nullif(left(trim(coalesce(p ->> 'message', '')), 200), ''));
  insert into public.settings (key, value, updated_by, updated_at) values ('app_update', v, (select auth.uid()), now())
  on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = excluded.updated_at;
  perform private.audit('settings.app_update', 'settings', 'app_update', before, v);
  return jsonb_build_object('message', 'Saved. Phones below the required version are asked to update the next time they open the app.', 'value', v);
end $$;

revoke all on function public.admin_set_app_update(jsonb) from public, anon;
grant execute on function public.admin_set_app_update(jsonb) to authenticated;
