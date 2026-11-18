# prsnn — notes for Claude (whole repository)

One repo: `mobile/` (Expo app for iPhone and Android), `backend/` (Supabase: `backend/supabase/migrations`, `tests`,
`functions`; project `mhovyhapzhxcmcuelbol`), `web/` (prsnn.com, Next.js static export on Cloudflare, build folder `web/`).
Each folder has its own CLAUDE.md, README and graphify knowledge graph (`<folder>/graphify-out`).

## Working rules (from the owner)
- Keep the theme: porcelain #F1F1F4, midnight #181B34, champagne #C9B68E, deep champagne #8E7646; Urbanist; Outfit "prsnn." logo.
- App screens use `svc.*` through React Query with `qk` keys; every data screen has loading, error and empty states;
  icon-only buttons need `accessibilityLabel`. Don't fake data.
- Business rules go in `mobile/src/domain` with tests in `mobile/__tests__`.
- Backend changes are migrations or edge functions in `backend/supabase`, documented in `mobile/API.md` and covered by
  `mobile/scripts/e2e-supabase.mjs` (plus a rolled-back SQL test in `backend/supabase/tests`).
- Secrets never go in the repo or in `EXPO_PUBLIC_*`. Keep the owner's email and test passwords out of the repo.
- Don't work around denied actions or Supabase confirmation prompts.
- Show designs before building UI, unless the owner says "build".
- No pull requests unless asked. Run `graphify query` in the folder before reading code, and `graphify update .` there after changes.

## Commands
```
cd mobile && npm run typecheck && npm run lint && npm test
cd web && npm run build
cd mobile && npx eas-cli@latest build -p android --profile production   # store build (see mobile/docs/LAUNCH_GUIDE.md)
```
