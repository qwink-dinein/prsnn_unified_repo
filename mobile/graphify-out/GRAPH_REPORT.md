# Graph Report - mobile  (2026-11-19)

## Corpus Check
- 199 files · ~319,478 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .example 1)

## Summary
- 1707 nodes · 7912 edges · 74 communities (58 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 249 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f16ea69`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- react-native
- dependencies
- LocationFields.tsx
- expo
- pin.ts
- landing.py
- components/bookings.tsx
- devDependencies
- demoAdmin.ts
- Text.tsx
- compilerOptions
- scripts
- e2e-supabase.mjs
- home.tsx
- rules.tsx
- demo.ts
- Text
- wallet_prices.py
- pay/[bookingId].tsx
- screens_v2.py
- wallet_variants.py
- journey.py
- package.json
- pathlib
- domain/mode.ts
- companion/[id].tsx
- all_screens.py
- preview.tsx
- btn
- body
- chat_keyboard.py
- foot
- admin.ts
- profile.tsx
- brand_screens.py
- space
- verification.ts
- expo-crypto
- photo
- interest.ts
- flow.ts
- card_systems.py
- wallet.tsx
- booking.ts
- useSession
- logo_concepts.py
- view_as.py
- logo_luxe.py
- onboarding.tsx
- wordmarks.py
- @expo-google-fonts/outfit@^0.4.3
- @expo-google-fonts/urbanist@^0.4.2
- m_book
- domain/chat.ts
- expo-image-picker
- expo-secure-store
- jest
- RequestCard.tsx
- base64
- fellow/earnings.tsx
- useSession
- @react-native-community/netinfo
- expo-linking@~58.0.14
- expo-notifications
- session.ts
- react-native-web@~0.21.4
- expo-system-ui@~58.0.6
- expo-video
- zod@^4.6.7
- zustand
- react-native-url-polyfill
- react-native-worklets@0.13.0
- @supabase/supabase-js

## God Nodes (most connected - your core abstractions)
1. `Text()` - 222 edges
2. `body()` - 138 edges
3. `Icon` - 127 edges
4. `Button()` - 111 edges
5. `errorMessage()` - 111 edges
6. `btn()` - 104 edges
7. `react-native` - 104 edges
8. `ic()` - 102 edges
9. `colors` - 97 edges
10. `Header()` - 93 edges

## Surprising Connections (you probably didn't know these)
- `SessionState` --references--> `SessionUser`  [EXTRACTED]
  src/state/session.ts → src/domain/types.ts
- `AdminLayout()` --calls--> `AdminGate()`  [EXTRACTED]
  src/app/admin/_layout.tsx → src/components/admin.tsx
- `day()` --calls--> `toDateKey()`  [EXTRACTED]
  src/services/demo.ts → src/domain/booking.ts
- `CompanionOnboarding()` --indirect_call--> `categoryTitle()`  [INFERRED]
  src/app/fellow/onboarding.tsx → src/domain/categories.ts
- `EditProfile()` --calls--> `Loading()`  [EXTRACTED]
  src/app/edit-profile.tsx → src/components/ui/layout.tsx

## Import Cycles
- None detected.

## Communities (74 total, 16 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.06
Nodes (47): IdentityValue, AdminReport, AdminChatMessage, AdminOverview, AdminPerson, AllocationState, AppNotification, ApprovalStatus (+39 more)

### Community 1 - "react-native"
Cohesion: 0.08
Nodes (33): react-native, AdminLayout(), styles, ID_COPY, styles, OPTIONS, R, styles (+25 more)

### Community 2 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, expo@~58.0.20, expo-constants@~58.0.13, expo-device@~58.0.5, expo-font@~58.0.10, expo-haptics@~58.0.7, expo-image@~58.0.17, expo-linear-gradient@~58.0.3 (+15 more)

### Community 3 - "LocationFields.tsx"
Cohesion: 0.12
Nodes (34): Privacy(), PrivacyForm(), identityComplete(), IdentityForm(), AreaSheet(), CitySheet(), Dropdown(), fold() (+26 more)

### Community 4 - "expo"
Cohesion: 0.04
Nodes (47): backgroundColor, foregroundImage, monochromeImage, adaptiveIcon, allowBackup, blockedPermissions, package, permissions (+39 more)

### Community 5 - "pin.ts"
Cohesion: 0.24
Nodes (17): loginIdOfAuthUser(), loginKey(), sameLogin(), sessionIsGone(), checkLocalPin(), clearLocalPin(), forgetSavedSession(), hash() (+9 more)

### Community 6 - "landing.py"
Cohesion: 0.34
Nodes (17): btn(), cat_card(), companion_band(), faq(), final_cta(), footer(), ic(), landing_a() (+9 more)

### Community 7 - "components/bookings.tsx"
Cohesion: 0.22
Nodes (22): BookingDetail(), styles, Confirmed(), styles, PanicScreen(), BookingCard(), MetaLine(), PrepaidStatus() (+14 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (19): { defineConfig }, expoConfig, devDependencies, eslint@^9.0.0, eslint-config-expo@~58.0.4, jest@^30.5.2, jest-expo@~58.0.12, @testing-library/react-native@^14.1.0 (+11 more)

### Community 9 - "demoAdmin.ts"
Cohesion: 0.08
Nodes (30): AdminBooking, AuditEntry, BroadcastRecord, CityPlan, PanicAlert, backend, Backend, activity (+22 more)

### Community 10 - "Text.tsx"
Cohesion: 0.12
Nodes (21): expo-haptics, Splash(), SignedOut(), tab(), TabsLayout(), styles, LABEL, styles (+13 more)

### Community 11 - "compilerOptions"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, compilerOptions, allowImportingTsExtensions, noEmit, paths, strict, types, exclude (+2 more)

### Community 12 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, export:web, graph, ios, lint, start, test (+2 more)

### Community 13 - "e2e-supabase.mjs"
Cohesion: 0.08
Nodes (15): fs, book(), cand, card, [compId, memId], got, img, offer (+7 more)

### Community 14 - "home.tsx"
Cohesion: 0.08
Nodes (43): expo-image, expo-linear-gradient, expo-router, styles, PHOTOS, styles, Discover(), greeting() (+35 more)

### Community 15 - "rules.tsx"
Cohesion: 0.33
Nodes (8): agreedAt(), Consent, ConsentKind, HOUSE_RULES, LEGAL_VERSION, missingConsents(), NOT_FOR, signInConsents()

### Community 16 - "demo.ts"
Cohesion: 0.07
Nodes (26): BusyTime, BlockedPerson, allDays, bookings, companionStatus(), day(), demo, demoBlocks (+18 more)

### Community 17 - "Text"
Cohesion: 0.05
Nodes (175): react-native-safe-area-context, @tanstack/react-query, Activity(), AdminActivity(), priceDiff(), short(), styles, AdminAdmins() (+167 more)

### Community 18 - "wallet_prices.py"
Cohesion: 0.25
Nodes (13): big_card(), cta(), header(), ic(), p_companion(), p_lift(), p_stack(), p_swipe() (+5 more)

### Community 19 - "pay/[bookingId].tsx"
Cohesion: 0.20
Nodes (14): METHODS, Pay(), styles, baseOptions(), checkoutHtml(), CheckoutOptions, openWebCheckout(), Props (+6 more)

### Community 20 - "screens_v2.py"
Cohesion: 0.05
Nodes (46): keypad(), s_pin_login(), a_overview_sub(), banner(), booked(), booking_detail(), c_status_changes(), c_status_live() (+38 more)

### Community 21 - "wallet_variants.py"
Cohesion: 0.31
Nodes (11): bell(), card(), head(), logo(), tabs(), v_grid(), v_lifted(), v_passes() (+3 more)

### Community 22 - "journey.py"
Cohesion: 0.07
Nodes (31): city_pill(), day_trips(), plan_rows(), b64(), bar(), chat_screen(), dots(), keypad() (+23 more)

### Community 23 - "package.json"
Cohesion: 0.12
Nodes (16): @expo-google-fonts/dm-sans@^0.4.2, @expo-google-fonts/lora@^0.4.2, expo-splash-screen@~58.0.11, expo-status-bar@~58.0.4, react-native-gesture-handler@~3.3.0, react-native-webview@14.0.1, main, name (+8 more)

### Community 24 - "pathlib"
Cohesion: 0.15
Nodes (7): letters(), monogram(), wordmark(), icon(), mark(), row(), screen()

### Community 25 - "domain/mode.ts"
Cohesion: 0.22
Nodes (13): open(), canUseCompanionMode(), modeForNotification(), modeOfSide(), modesFor(), SideMode, sideMode(), Who (+5 more)

### Community 26 - "companion/[id].tsx"
Cohesion: 0.05
Nodes (91): Row(), CategoryPage(), CompanionProfile(), styles, perks(), SearchTab(), styles, AvailableTodayToggle() (+83 more)

### Community 27 - "all_screens.py"
Cohesion: 0.13
Nodes (37): checkbox(), chips(), field(), label(), notice(), s_admins(), s_broadcast(), s_chat() (+29 more)

### Community 28 - "preview.tsx"
Cohesion: 0.27
Nodes (13): endPreview(), go(), PreviewAs, PreviewStart, PreviewStrip(), routeFor(), sampleUser(), startLivePreview() (+5 more)

### Community 29 - "btn"
Cohesion: 0.09
Nodes (59): bar(), btn(), card(), ic(), pill(), s_activity(), s_admin_bookings(), s_approvals() (+51 more)

### Community 30 - "body"
Cohesion: 0.19
Nodes (38): avatar(), body(), group(), h(), row(), s_admin(), s_admin_booking(), s_bookings() (+30 more)

### Community 31 - "chat_keyboard.py"
Cohesion: 0.38
Nodes (3): composer(), header(), svg()

### Community 32 - "foot"
Cohesion: 0.20
Nodes (25): foot(), c1(), c2(), c3(), c4(), c5(), c6(), c7() (+17 more)

### Community 33 - "admin.ts"
Cohesion: 0.30
Nodes (10): AdminAction, BookingTab, can(), canActOn(), describeAction(), isStaff(), isSuperadmin(), refundableAmount() (+2 more)

### Community 34 - "profile.tsx"
Cohesion: 0.22
Nodes (18): AdminOverview(), BLINK, Money(), PanicBanner(), Person(), styles, ProfileTab(), styles (+10 more)

### Community 35 - "brand_screens.py"
Cohesion: 0.15
Nodes (19): confirmed(), mark(), profile(), row(), welcome(), btn(), chat(), checkout() (+11 more)

### Community 36 - "space"
Cohesion: 0.08
Nodes (35): react, react-native-reanimated, DOT_FADE, DOT_SETTLE, styles, PinCheck(), PULSE, styles (+27 more)

### Community 37 - "verification.ts"
Cohesion: 0.47
Nodes (4): VerificationStatus, fixNeeds(), ID_TYPES, parseReasons()

### Community 39 - "photo"
Cohesion: 0.23
Nodes (12): photo(), s_apply(), s_category(), s_companion(), s_home_more(), s_login(), shade(), bc() (+4 more)

### Community 40 - "interest.ts"
Cohesion: 0.33
Nodes (7): APPROVAL, categoryTitle(), MEET, SignupChoices, signupDetails(), topCategories(), base

### Community 41 - "flow.ts"
Cohesion: 0.19
Nodes (16): marketRole(), AppMode, effectiveMode(), hasIdentity(), needsSetup(), SessionUser, afterAuth(), afterPin() (+8 more)

### Community 42 - "card_systems.py"
Cohesion: 0.22
Nodes (18): e_booking(), e_home(), e_prices(), g_booking(), g_home(), g_prices(), ic(), logo() (+10 more)

### Community 43 - "wallet.tsx"
Cohesion: 0.33
Nodes (6): react-native-svg, Guilloche, Material, MaterialCard(), MATERIALS, styles

### Community 44 - "booking.ts"
Cohesion: 0.14
Nodes (16): amountDuePaise(), BookingTab, CategoryKey, DAY_KEYS, DURATIONS, EarningsSummary, FREE_TODAY_MINUTES, MIN_LEAD_MINUTES (+8 more)

### Community 45 - "useSession"
Cohesion: 0.17
Nodes (17): AppEffects(), RootLayout(), styles, PhotoViewerHost(), ConfirmProvider(), connectOnlineManager(), OfflineBanner(), setUnauthorizedHandler() (+9 more)

### Community 46 - "logo_concepts.py"
Cohesion: 0.19
Nodes (10): card(), diamond(), diamond_only(), face_to_face(), pin_p(), svg(), two_seats(), uid() (+2 more)

### Community 47 - "view_as.py"
Cohesion: 0.23
Nodes (10): s_action(), s_companion_dash(), s_companion_onb(), s_exit(), s_member_book(), s_member_home(), s_pick(), s_switch() (+2 more)

### Community 48 - "logo_luxe.py"
Cohesion: 0.29
Nodes (9): card(), cut(), gem(), linked(), signature(), svg(), uid(), word() (+1 more)

### Community 49 - "onboarding.tsx"
Cohesion: 0.11
Nodes (40): EditForm(), EditProfile(), styles, CompanionOnboarding(), INTERESTS, Line(), Options(), Step (+32 more)

### Community 50 - "wordmarks.py"
Cohesion: 0.27
Nodes (4): bodoni_italic(), gem(), light_lower(), urbanist_lower()

### Community 53 - "m_book"
Cohesion: 0.38
Nodes (7): price_card(), price_tab(), s_availability(), s_book_length(), stack(), c_availability(), m_book()

### Community 54 - "domain/chat.ts"
Cohesion: 0.15
Nodes (18): idOf(), ChatBooking, chatOpen(), ChatThread, chatThreads(), endsAt(), mergeMessages(), threadKey() (+10 more)

### Community 57 - "jest"
Cohesion: 0.40
Nodes (5): jest, moduleNameMapper, preset, testMatch, transformIgnorePatterns

### Community 58 - "RequestCard.tsx"
Cohesion: 0.24
Nodes (12): CompanionDashboard(), Stat(), RequestCard(), styles, useNow(), canComplete(), minutesLeft(), startsAt() (+4 more)

### Community 59 - "base64"
Cohesion: 0.19
Nodes (6): pair(), phone(), section(), font_card(), icon(), mark()

### Community 60 - "fellow/earnings.tsx"
Cohesion: 0.22
Nodes (17): Earnings(), EarningsScreen(), styles, BookingsTab(), styles, TABS, EarningsTab(), MessagesTab() (+9 more)

### Community 61 - "useSession"
Cohesion: 0.18
Nodes (17): Chat(), isDivider(), Row, styles, time(), HoldButton(), PanicButton(), RiseIn() (+9 more)

### Community 65 - "session.ts"
Cohesion: 0.15
Nodes (12): @react-native-async-storage/async-storage@2.2.0, @react-native-async-storage/async-storage, Role, setApiToken(), DEMO, SITE_URL, SUPABASE_KEY, SUPABASE_URL (+4 more)

## Knowledge Gaps
- **2 isolated node(s):** `expo/tsconfig.base`, `COMMUNITY_IMAGE`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 423 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Text()` connect `Text` to `react-native`, `profile.tsx`, `LocationFields.tsx`, `space`, `RequestCard.tsx`, `components/bookings.tsx`, `Text.tsx`, `useSession`, `home.tsx`, `preview.tsx`, `onboarding.tsx`, `pay/[bookingId].tsx`, `companion/[id].tsx`, `fellow/earnings.tsx`, `useSession`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base`, `COMMUNITY_IMAGE` to the rest of the system?**
  _2 weakly-connected nodes found - possible missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06108597285067873 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `dependencies`, `LocationFields.tsx`, `components/bookings.tsx`, `Text.tsx`, `home.tsx`, `Text`, `pay/[bookingId].tsx`, `package.json`, `domain/mode.ts`, `companion/[id].tsx`, `preview.tsx`, `profile.tsx`, `space`, `wallet.tsx`, `useSession`, `onboarding.tsx`, `RequestCard.tsx`, `fellow/earnings.tsx`, `useSession`, `session.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `react-native` be split into smaller, more focused modules?**
  _Cohesion score 0.07676767676767676 - nodes in this community are weakly interconnected._
- **Why does `react` connect `space` to `react-native`, `dependencies`, `LocationFields.tsx`, `RequestCard.tsx`, `components/bookings.tsx`, `Text.tsx`, `wallet.tsx`, `useSession`, `home.tsx`, `Text`, `onboarding.tsx`, `pay/[bookingId].tsx`, `domain/chat.ts`, `package.json`, `domain/mode.ts`, `companion/[id].tsx`, `fellow/earnings.tsx`, `useSession`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._