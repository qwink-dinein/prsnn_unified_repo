# prsnn · Go live, step by step (from 18 Nov 2026)

Do the stages in order. Each step says where to click and what to type. Never paste passwords, keys or
codes into chat or into this repo; they go only into the website or console that asks for them.

Times: stage 1–3 take an afternoon; Apple approval 1–3 days; Google: personal accounts need a 14-day closed test.

---

## Stage 1 · Make the one repo the real one (30 min)

**1.1 Merge the pull request**
1. Open https://github.com/qwink-dinein/prsnn_unified_repo/pull/1 (signed in as the account that owns `qwink-dinein`).
2. Click **Merge pull request → Confirm merge**. Don't tick "Delete branch".

**1.2 Point the website at it (Cloudflare)**
1. https://dash.cloudflare.com → **Workers & Pages** → open the prsnn website project.
2. **Settings → Build → Git repository → Manage / Disconnect**, then **Connect** → GitHub → `prsnn_unified_repo`.
   (If Cloudflare can't see the repo: GitHub → Settings → Applications → Cloudflare → Configure → add `prsnn_unified_repo`.)
3. **Production branch:** `main`.
4. **Root directory (path):** `web`
5. **Build command:** `pnpm run build` · **Deploy command:** `npx wrangler deploy` (same as before).
6. Build variables stay as they are (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPPORT_EMAIL`, …).
7. **Deployments → Retry / Deploy latest**. When it says Success, open https://prsnn.com and hard-refresh.
   Check: home page loads, "Become a companion" is in the header, https://prsnn.com/terms opens.

**1.3 Your Mac: switch to the one repo**
```bash
cd ~ && git clone https://github.com/qwink-dinein/prsnn_unified_repo.git prsnn
```
If it says "Permission denied" or 403: GitHub → `prsnn_unified_repo` → **Settings → Collaborators → Add people**
→ add `rentafellow` (the account your Mac uses) with **Write**, accept the email invite, then run the clone again.
```bash
cd ~/prsnn/mobile && npm install
```
From now on the app is built from `~/prsnn/mobile` (not `~/prsnn-mobile`).

**1.4 Archive the old repos** (after 1.2 works)
GitHub → each of `prsnn-mobile`, `prsnn-backend`, `prsnn-frontend` → **Settings → General → Danger Zone →
Archive this repository**. They stay readable; nobody can push to them by mistake.

**1.5 Tell the other Claude session** (the "PRSNN session continuation" in the phone app) to work in
`prsnn_unified_repo` from now on, or start a new session with that repo selected.

---

## Stage 2 · Push notifications (45 min)

Today no phone is registered for push; alerts only go by WhatsApp.

**2.1 Android (Firebase, free)**
1. https://console.firebase.google.com → **Add project** → name `prsnn` → Google Analytics **off** → Create.
2. On the project page → **Android icon (Add app)** → Package name exactly **`com.prsnn.app`** → Register app.
3. **Download google-services.json** → Next → Next → Continue to console.
4. Give the file to the builds:
   - expo.dev → log in → project **prsnn** → **Environment variables → Add variable** → Name `GOOGLE_SERVICES_JSON`,
     Type **File**, upload the file, tick **preview** and **production** → Save.
   - For local builds on your Mac also copy it to `~/prsnn/mobile/google-services.json` (it is git-ignored).
5. Firebase → ⚙ **Project settings → Service accounts → Generate new private key** → Generate (a JSON downloads).
6. On the Mac:
   ```bash
   cd ~/prsnn/mobile && npx eas-cli@latest credentials -p android
   ```
   Choose **production** → **Google Service Account** → **Manage your Google Service Account Key for Push
   Notifications (FCM V1)** → **Set up / Upload** → pick the JSON from step 5. Repeat once for **preview**.
   Then delete that JSON from Downloads.

**2.2 iPhone** (after Stage 4.1, the Apple account)
```bash
cd ~/prsnn/mobile && npx eas-cli@latest credentials -p ios
```
→ **production** → log in with your Apple ID → **Push Notifications: Manage your Apple Push Notifications Key**
→ **Set up a new key**. (Or answer **Yes** when the first iOS build asks about push.)

**2.3 Check** (after the next build is installed): log in, allow notifications, then Admin → Broadcast → send a
test to staff. It should arrive within a minute. Tell Claude and it will confirm the phone registered.

---

## Stage 3 · Review logins (15 min)

Store reviewers can't receive WhatsApp codes, so they get two made-up numbers with fixed codes.

1. https://supabase.com/dashboard → project **prsnn** → **Authentication → Sign In / Providers → Phone**.
2. **Test Phone Numbers and OTPs** → add two lines (pick your own 6-digit codes):
   `919000000101=<code A>` and `919000000102=<code B>` → Save. No WhatsApp is sent to these.
3. In the app: log in with **90000 00101** + code A → finish the member setup (photo, city, interests) → set a PIN.
4. Log out → log in with **90000 00102** + code B → **Become a companion** → fill everything in, upload any sample
   ID photo → submit. Then with your own account: **Admin → Approvals** → approve it, **Admin → ID checks** → approve.
5. Write the two logins down for the store forms only:
   "Member: +91 90000 00101, code A, PIN 1234. Companion: +91 90000 00102, code B, PIN 1234."

---

## Stage 4 · Apple App Store

**4.1 Developer account** — https://developer.apple.com/programs/enroll → **$99/year**.
Individual (fast, your name shows as seller) or Organisation (needs a D-U-N-S number; shows "prsnn"). 1–2 days.

**4.2 Create the app** — https://appstoreconnect.apple.com → **Apps → + → New App**:
Platform iOS · Name `prsnn` · Primary language English (India) · Bundle ID **`com.prsnn.app`**
(if it isn't in the list: developer.apple.com → Identifiers → + → App IDs → `com.prsnn.app`) · SKU `prsnn-ios` ·
Full access → Create.

**4.3 Build and upload** (cloud build: no Xcode needed)
```bash
cd ~/prsnn/mobile && npx eas-cli@latest build -p ios --profile production
```
Log in with your Apple ID when asked; let EAS create the certificate, provisioning profile and push key (Yes to all).
When it finishes:
```bash
npx eas-cli@latest submit -p ios --latest
```
Say **Yes** to creating an App Store Connect API key. After 15–60 min the build shows in App Store Connect →
**TestFlight**. Install **TestFlight** on your iPhone, open the build, and test: login, search, book, pay, chat,
report/block, delete account.

**4.4 The listing** (App Store Connect → prsnn → the 1.0 version)
- **Screenshots:** 6.9" iPhone, 1320 × 2868, at least 3 (Home, Search with Available today, companion profile, booking).
- **Promotional text / Description / Keywords:** from `docs/compliance/STORE_SUBMISSION.md` → "Listing".
- **Support URL** https://prsnn.com/support · **Marketing URL** https://prsnn.com
- **Privacy Policy URL** https://prsnn.com/privacy
- **App Privacy** (left menu): answer as in STORE_SUBMISSION.md → "App Store Connect · App Privacy".
- **Age Rating:** answer the questions as in STORE_SUBMISSION.md → result **18+**.
- **App Review Information:** sign-in required **Yes** → paste the two Stage 3 logins, your phone number,
  and the review note from STORE_SUBMISSION.md.
- **Pricing:** Free · **Availability:** India (add more later).
- **Build:** choose the TestFlight build → **Add for Review → Submit for Review**. Usually 1–3 days.

---

## Stage 5 · Google Play

**5.1 Developer account** — https://play.google.com/console/signup → **$25 once**.
- Personal: ID check 1–3 days, then a **closed test with at least 12 testers for 14 days** before Production.
- Organisation: D-U-N-S number needed, no 12-tester rule.

**5.2 Create the app** — Play Console → **Create app** → `prsnn` · English (India) · App · Free → accept → Create.

**5.3 Build**
```bash
cd ~/prsnn/mobile && npx eas-cli@latest build -p android --profile production --local --output ~/prsnn-builds/prsnn.aab
```
(This makes the store bundle `.aab`. The `.apk` you share on Drive is the `preview` profile.)

**5.4 Set up the app** (Dashboard → "Set up your app"; answers in STORE_SUBMISSION.md)
- **App access:** "All or some functionality is restricted" → add the two Stage 3 logins.
- **Ads:** No · **Content rating:** start questionnaire → Social → answers in STORE_SUBMISSION.md.
- **Target audience:** 18 and over only.
- **Data safety:** copy the table from STORE_SUBMISSION.md.
- **Privacy policy:** https://prsnn.com/privacy · **Delete account URL:** https://prsnn.com/delete-account
- **Child safety standards:** https://prsnn.com/child-safety (point of contact: your grievance officer)
- **Financial features:** none · **Government app:** no · **News:** no · **Health:** no.
- **Store listing:** short description (80 characters), full description, icon 512 × 512, feature graphic
  1024 × 500, at least 2 phone screenshots.

**5.5 Release**
1. **Testing → Internal testing → Create new release** → upload `prsnn.aab` → accept Google managing the
   signing key → release name `1.0.0` → Save → Review → **Start rollout**. Add your email as a tester; install
   from the link and test.
2. Personal account: **Testing → Closed testing → Create track** → same `.aab` → add at least **12 testers'
   Gmail addresses** → roll out. They must keep it installed for **14 days**. Then Dashboard → **Apply for production**.
3. **Production → Create new release** → the `.aab` → **Send for review** (1–7 days).

---

## Stage 6 · Before real users arrive

- **Delete the automated-test accounts** (Supabase → SQL Editor):
  ```sql
  delete from public.bookings where requester_id in (select id from auth.users where email like 'e2e-%@prsnn.test');
  delete from auth.users where email like 'e2e-%@prsnn.test';
  ```
  Keep the two Stage 3 review accounts.
- **Supabase Pro** (project → Settings → Billing → Upgrade): daily backups and no pausing. See LAUNCH_GUIDE Part E.
- **Razorpay:** dashboard shows **Activated** (KYC approved) and **Live mode**; settlement bank account added;
  keep some balance so refunds don't fail.
- **Grievance officer:** name, email and phone on https://prsnn.com/grievance are real (IT Rules 2021).
- **Website store buttons:** once each store approves, Cloudflare → build variables → set `NEXT_PUBLIC_APP_STORE_URL`
  and `NEXT_PUBLIC_PLAY_STORE_URL` → redeploy.
- **Booking #ABDFC7:** retry or close the failed ₹10 refund in Admin → Bookings → Refunds.
- Optional: email sign-in for visitors from abroad (Zoho app password + sender `admin@prsnn.com`, then one test).

## If something fails

Copy the last 20 lines of the error (or a screenshot) into the Claude session. Don't retry builds many times in a
row; one failed build with its log is enough to fix it.
