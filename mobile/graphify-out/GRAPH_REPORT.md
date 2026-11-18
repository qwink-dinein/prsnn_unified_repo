# Graph Report - mobile  (2026-11-18)

## Corpus Check
- 198 files · ~319,096 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .example 1)

## Summary
- 1704 nodes · 7895 edges · 75 communities (62 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 249 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5fc1a7e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- colors
- dependencies
- LocationFields.tsx
- expo
- pin.ts
- landing.py
- react-native
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
- domain.test.ts
- search.tsx
- screens_v2.py
- layout.tsx
- journey.py
- package.json
- pathlib
- domain/mode.ts
- domain/pricing.ts
- all_screens.py
- preview.tsx
- btn
- body
- chat_keyboard.py
- foot
- admin.ts
- admin/index.tsx
- brand_screens.py
- states.tsx
- IdentityForm.tsx
- companion/[id].tsx
- photo
- interest.ts
- flow.ts
- card_systems.py
- wallet.tsx
- BookingPicker.tsx
- useSession
- logo_concepts.py
- view_as.py
- logo_luxe.py
- Icon
- wordmarks.py
- radius
- profile.tsx
- m_book
- components/bookings.tsx
- categories.py
- expo@~58.0.20
- jest
- verification.ts
- base64
- lib/mode.ts
- safety.ts
- expo-constants
- expo-linking@~58.0.14
- expo-notifications
- config.ts
- expo-splash-screen
- expo-system-ui@~58.0.6
- expo-video
- react-dom@19.3.0
- react-native-gesture-handler
- react-native-url-polyfill
- react-native-webview
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
- `CompanionOnboarding()` --indirect_call--> `categoryTitle()`  [INFERRED]
  src/app/fellow/onboarding.tsx → src/domain/categories.ts
- `day()` --calls--> `toDateKey()`  [EXTRACTED]
  src/services/demo.ts → src/domain/booking.ts
- `CompanionOnboarding()` --calls--> `CategoryTiles()`  [EXTRACTED]
  src/app/fellow/onboarding.tsx → src/components/CategoryTiles.tsx
- `CompanionOnboarding()` --calls--> `AvailabilityEditor()`  [EXTRACTED]
  src/app/fellow/onboarding.tsx → src/components/fellow/AvailabilityEditor.tsx
- `CompanionOnboarding()` --calls--> `emptyAvailability()`  [EXTRACTED]
  src/app/fellow/onboarding.tsx → src/components/fellow/AvailabilityEditor.tsx

## Import Cycles
- None detected.

## Communities (75 total, 13 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.06
Nodes (40): BookingTab, AdminChatMessage, AdminOverview, AdminPerson, AllocationState, AppNotification, Availability, BookingStatus (+32 more)

### Community 1 - "colors"
Cohesion: 0.08
Nodes (33): react, AdminActivity(), AdminAdmins(), styles, Tab, AdminBroadcast(), styles, AdminLayout() (+25 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, expo-crypto@~58.0.7, expo-device@~58.0.5, expo-font@~58.0.10, expo-haptics@~58.0.7, expo-image@~58.0.17, expo-linear-gradient@~58.0.3, expo-router@~58.0.27 (+17 more)

### Community 3 - "LocationFields.tsx"
Cohesion: 0.14
Nodes (20): AreaSheet(), CitySheet(), Dropdown(), fold(), LocationFields(), NoMatch(), Row(), Sheet() (+12 more)

### Community 4 - "expo"
Cohesion: 0.04
Nodes (47): backgroundColor, foregroundImage, monochromeImage, adaptiveIcon, allowBackup, blockedPermissions, package, permissions (+39 more)

### Community 5 - "pin.ts"
Cohesion: 0.16
Nodes (23): expo-secure-store@~58.0.2, expo-secure-store, @react-native-async-storage/async-storage, loginIdOfAuthUser(), loginKey(), sameLogin(), sessionIsGone(), Role (+15 more)

### Community 6 - "landing.py"
Cohesion: 0.09
Nodes (43): btn(), cat_card(), companion_band(), faq(), final_cta(), footer(), ic(), landing_a() (+35 more)

### Community 7 - "react-native"
Cohesion: 0.13
Nodes (31): expo-router, react-native, react-native-safe-area-context, @tanstack/react-query, styles, styles, EMPTY, styles (+23 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (19): { defineConfig }, expoConfig, devDependencies, eslint@^9.0.0, eslint-config-expo@~58.0.4, jest@^30.5.2, jest-expo@~58.0.12, @testing-library/react-native@^14.1.0 (+11 more)

### Community 9 - "demoAdmin.ts"
Cohesion: 0.08
Nodes (29): priceCurveError(), AuditEntry, BroadcastRecord, PanicAlert, backend, Backend, activity, allDays (+21 more)

### Community 10 - "Text.tsx"
Cohesion: 0.13
Nodes (17): expo-haptics, styles, styles, WEAK, styles, PULSE, styles, styles (+9 more)

### Community 11 - "compilerOptions"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, compilerOptions, allowImportingTsExtensions, noEmit, paths, strict, types, exclude (+2 more)

### Community 12 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, export:web, graph, ios, lint, start, test (+2 more)

### Community 13 - "e2e-supabase.mjs"
Cohesion: 0.09
Nodes (14): fs, book(), cand, card, [compId, memId], got, img, offer (+6 more)

### Community 14 - "home.tsx"
Cohesion: 0.08
Nodes (39): expo-image, expo-linear-gradient, styles, styles, Options(), Options(), styles, BecomeCompanionCard() (+31 more)

### Community 15 - "rules.tsx"
Cohesion: 0.33
Nodes (8): agreedAt(), Consent, ConsentKind, HOUSE_RULES, LEGAL_VERSION, missingConsents(), NOT_FOR, signInConsents()

### Community 16 - "demo.ts"
Cohesion: 0.07
Nodes (28): BusyTime, SessionUser, AuthResult, allDays, bookings, companionStatus(), day(), demo (+20 more)

### Community 17 - "Text"
Cohesion: 0.06
Nodes (146): Activity(), priceDiff(), short(), Admins(), Approvals(), AdminBookingDetail(), CompanionPicker(), PersonLink() (+138 more)

### Community 18 - "domain.test.ts"
Cohesion: 0.14
Nodes (14): monthGrid(), CategoryKey, categoryOf(), categoryTitle(), COMMUNITY_FOCUS, offersCategory(), durationLine(), filterCompanions() (+6 more)

### Community 19 - "search.tsx"
Cohesion: 0.29
Nodes (10): SearchTab(), styles, AvailableTodayToggle(), CitySheet(), IconButton(), useLiveCompanions(), AREAS, areasFor() (+2 more)

### Community 20 - "screens_v2.py"
Cohesion: 0.05
Nodes (46): keypad(), s_pin_login(), a_overview_sub(), banner(), booked(), booking_detail(), c_status_changes(), c_status_live() (+38 more)

### Community 21 - "layout.tsx"
Cohesion: 0.14
Nodes (15): PHOTOS, styles, OPTIONS, R, styles, styles, dotColorFor(), isLight() (+7 more)

### Community 22 - "journey.py"
Cohesion: 0.09
Nodes (26): b64(), bar(), chat_screen(), dots(), keypad(), opts(), page(), pkrow() (+18 more)

### Community 23 - "package.json"
Cohesion: 0.11
Nodes (18): @expo-google-fonts/dm-sans@^0.4.2, @expo-google-fonts/lora@^0.4.2, @expo-google-fonts/outfit@^0.4.3, @expo-google-fonts/urbanist@^0.4.2, expo-image-picker@~58.0.10, @react-native-community/netinfo@^12.0.1, zod@^4.6.7, main (+10 more)

### Community 24 - "pathlib"
Cohesion: 0.19
Nodes (5): letters(), monogram(), wordmark(), icon(), mark()

### Community 25 - "domain/mode.ts"
Cohesion: 0.27
Nodes (10): open(), canUseCompanionMode(), effectiveMode(), modeForNotification(), modeOfSide(), modesFor(), Who, who() (+2 more)

### Community 26 - "domain/pricing.ts"
Cohesion: 0.14
Nodes (30): Row(), CategoryPage(), perks(), a11y(), PackageGrid(), Props, styles, tagFor() (+22 more)

### Community 27 - "all_screens.py"
Cohesion: 0.13
Nodes (37): checkbox(), chips(), field(), label(), notice(), s_admins(), s_broadcast(), s_chat() (+29 more)

### Community 28 - "preview.tsx"
Cohesion: 0.29
Nodes (12): endPreview(), go(), PreviewAs, PreviewStart, routeFor(), sampleUser(), startLivePreview(), startPreview() (+4 more)

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
Cohesion: 0.18
Nodes (16): AdminAction, can(), canActOn(), describeAction(), isStaff(), isSuperadmin(), marketRole(), refundableAmount() (+8 more)

### Community 34 - "admin/index.tsx"
Cohesion: 0.27
Nodes (11): AdminOverview(), BLINK, Money(), PanicBanner(), Person(), styles, StatTile(), CompanionDashboard() (+3 more)

### Community 35 - "brand_screens.py"
Cohesion: 0.15
Nodes (19): confirmed(), mark(), profile(), row(), welcome(), btn(), chat(), checkout() (+11 more)

### Community 36 - "states.tsx"
Cohesion: 0.08
Nodes (28): react-native-reanimated, ID_COPY, styles, DOT_FADE, DOT_SETTLE, styles, styles, BRAND_WORD (+20 more)

### Community 37 - "IdentityForm.tsx"
Cohesion: 0.24
Nodes (13): identityComplete(), IdentityValue, styles, COMPANION_MEET_OPTIONS, companionMeets(), GENDER_OPTIONS, SEE_OPTIONS, VISIBILITY_COPY (+5 more)

### Community 38 - "companion/[id].tsx"
Cohesion: 0.21
Nodes (23): CompanionProfile(), styles, CompanionCard(), CompanionRow(), firstName(), fromPrice(), HeartButton(), Photo() (+15 more)

### Community 39 - "photo"
Cohesion: 0.23
Nodes (12): photo(), s_apply(), s_category(), s_companion(), s_home_more(), s_login(), shade(), bc() (+4 more)

### Community 40 - "interest.ts"
Cohesion: 0.31
Nodes (8): APPROVAL, categoryTitle(), MEET, roleLabel(), SignupChoices, signupDetails(), topCategories(), base

### Community 41 - "flow.ts"
Cohesion: 0.38
Nodes (10): Splash(), staffLevel(), hasIdentity(), needsSetup(), afterAuth(), afterPin(), goHome(), goToLogin() (+2 more)

### Community 42 - "card_systems.py"
Cohesion: 0.22
Nodes (18): e_booking(), e_home(), e_prices(), g_booking(), g_home(), g_prices(), ic(), logo() (+10 more)

### Community 43 - "wallet.tsx"
Cohesion: 0.29
Nodes (7): react-native-svg@15.16.0, react-native-svg, Guilloche, Material, MaterialCard(), MATERIALS, styles

### Community 44 - "BookingPicker.tsx"
Cohesion: 0.13
Nodes (28): BookingChoice, BookingPicker(), styles, WEEK, AvailabilityEditor(), HOURS, styles, WEEK_DAYS (+20 more)

### Community 45 - "useSession"
Cohesion: 0.24
Nodes (16): AppEffects(), RootLayout(), styles, connectOnlineManager(), setUnauthorizedHandler(), MAX_APP_WIDTH, EMPTY, useLiveMe() (+8 more)

### Community 46 - "logo_concepts.py"
Cohesion: 0.19
Nodes (10): card(), diamond(), diamond_only(), face_to_face(), pin_p(), svg(), two_seats(), uid() (+2 more)

### Community 47 - "view_as.py"
Cohesion: 0.23
Nodes (10): s_action(), s_companion_dash(), s_companion_onb(), s_exit(), s_member_book(), s_member_home(), s_pick(), s_switch() (+2 more)

### Community 48 - "logo_luxe.py"
Cohesion: 0.29
Nodes (9): card(), cut(), gem(), linked(), signature(), svg(), uid(), word() (+1 more)

### Community 49 - "Icon"
Cohesion: 0.12
Nodes (24): styles, INTERESTS, Step, STEPS, styles, Phase, styles, styles (+16 more)

### Community 50 - "wordmarks.py"
Cohesion: 0.27
Nodes (4): bodoni_italic(), gem(), light_lower(), urbanist_lower()

### Community 51 - "radius"
Cohesion: 0.20
Nodes (8): Data, DATA, STARTS, styles, WHO, Props, styles, radius

### Community 52 - "profile.tsx"
Cohesion: 0.36
Nodes (8): ProfileTab(), styles, peopleLabel(), roleLabel(), companionStatusLine(), idCheckValue(), unregisterPush(), queryClient

### Community 53 - "m_book"
Cohesion: 0.38
Nodes (7): price_card(), price_tab(), s_availability(), s_book_length(), stack(), c_availability(), m_book()

### Community 54 - "components/bookings.tsx"
Cohesion: 0.05
Nodes (89): BookingDetail(), styles, Chat(), isDivider(), Row, styles, time(), Confirmed() (+81 more)

### Community 55 - "categories.py"
Cohesion: 0.31
Nodes (5): city_pill(), day_trips(), plan_rows(), pk(), profile()

### Community 57 - "jest"
Cohesion: 0.40
Nodes (5): jest, moduleNameMapper, preset, testMatch, transformIgnorePatterns

### Community 58 - "verification.ts"
Cohesion: 0.43
Nodes (6): VerificationStatus, ID_TYPES, idUploadError(), isLiveCompanion(), needsBack(), needsIdToAccept()

### Community 59 - "base64"
Cohesion: 0.19
Nodes (6): pair(), phone(), section(), font_card(), icon(), mark()

### Community 60 - "lib/mode.ts"
Cohesion: 0.16
Nodes (21): Discover(), greeting(), HomeTab(), SignedOut(), tab(), TabsLayout(), LABEL, ModeSwitch() (+13 more)

### Community 61 - "safety.ts"
Cohesion: 0.28
Nodes (7): AdminReport, BlockedPerson, PANIC_AFTER_END_MS, REPORT_DETAILS_MAX, REPORT_REASONS, reportError(), ReportReason

### Community 65 - "config.ts"
Cohesion: 0.28
Nodes (5): DEMO, SITE_URL, SUPABASE_KEY, SUPABASE_URL, supabase

## Knowledge Gaps
- **2 isolated node(s):** `expo/tsconfig.base`, `COMMUNITY_IMAGE`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 423 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Text()` connect `Text` to `colors`, `LocationFields.tsx`, `react-native`, `Text.tsx`, `home.tsx`, `search.tsx`, `layout.tsx`, `domain/pricing.ts`, `preview.tsx`, `admin/index.tsx`, `states.tsx`, `IdentityForm.tsx`, `companion/[id].tsx`, `flow.ts`, `BookingPicker.tsx`, `useSession`, `Icon`, `radius`, `profile.tsx`, `components/bookings.tsx`, `lib/mode.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base`, `COMMUNITY_IMAGE` to the rest of the system?**
  _2 weakly-connected nodes found - possible missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06363636363636363 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `colors`, `dependencies`, `pin.ts`, `Text.tsx`, `home.tsx`, `Text`, `search.tsx`, `layout.tsx`, `package.json`, `domain/mode.ts`, `domain/pricing.ts`, `preview.tsx`, `admin/index.tsx`, `states.tsx`, `IdentityForm.tsx`, `companion/[id].tsx`, `wallet.tsx`, `BookingPicker.tsx`, `useSession`, `Icon`, `radius`, `profile.tsx`, `components/bookings.tsx`, `lib/mode.ts`, `config.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `colors` be split into smaller, more focused modules?**
  _Cohesion score 0.07536231884057971 - nodes in this community are weakly interconnected._
- **Why does `react` connect `colors` to `dependencies`, `states.tsx`, `companion/[id].tsx`, `react-native`, `Text.tsx`, `wallet.tsx`, `BookingPicker.tsx`, `useSession`, `home.tsx`, `Text`, `Icon`, `radius`, `search.tsx`, `layout.tsx`, `components/bookings.tsx`, `package.json`, `domain/pricing.ts`, `lib/mode.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._