# Graph Report - mobile  (2026-11-20)

## Corpus Check
- 209 files · ~327,283 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .example 1)

## Summary
- 1786 nodes · 8332 edges · 76 communities (60 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 250 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `60680259`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- Icon.tsx
- dependencies
- places.ts
- expo
- pin.ts
- landing.py
- colors
- devDependencies
- demoAdmin.ts
- Text.tsx
- compilerOptions
- scripts
- e2e-supabase.mjs
- layout.tsx
- rules.tsx
- demo.ts
- Button
- all_screens.py
- pay/[bookingId].tsx
- screens_v2.py
- admin.tsx
- journey.py
- package.json
- pathlib
- prices.tsx
- booking.ts
- companion/[id].tsx
- preview.tsx
- btn
- body
- home.tsx
- foot
- user/[id].tsx
- Text
- brand_screens.py
- review.tsx
- domain/pricing.ts
- IdentityForm.tsx
- photo
- ErrorState
- useSession
- card_systems.py
- wallet.tsx
- formatINR
- LocationFields.tsx
- logo_concepts.py
- view_as.py
- logo_luxe.py
- Icon
- wordmarks.py
- chat_keyboard.py
- categories.py
- m_book
- components/bookings.tsx
- expo-image-picker
- @react-native-async-storage/async-storage
- jest
- verification.ts
- make_icons.py
- react-native
- expo-application
- expo-crypto
- @expo-google-fonts/dm-sans@^0.4.2
- @expo-google-fonts/lora@^0.4.2
- @expo-google-fonts/urbanist@^0.4.2
- safety.ts
- @react-native-community/netinfo
- react-native-webview
- zod@^4.6.7
- react-native-url-polyfill
- wordmark_dot.py
- @supabase/supabase-js
- expo@~58.0.20
- expo-font
- react-native-gesture-handler

## God Nodes (most connected - your core abstractions)
1. `Text()` - 236 edges
2. `body()` - 138 edges
3. `Icon` - 127 edges
4. `Button()` - 123 edges
5. `errorMessage()` - 118 edges
6. `react-native` - 110 edges
7. `btn()` - 104 edges
8. `ic()` - 102 edges
9. `Header()` - 100 edges
10. `colors` - 100 edges

## Surprising Connections (you probably didn't know these)
- `CompanionOnboarding()` --indirect_call--> `categoryTitle()`  [INFERRED]
  src/app/fellow/onboarding.tsx → src/domain/categories.ts
- `day()` --calls--> `toDateKey()`  [EXTRACTED]
  src/services/demo.ts → src/domain/booking.ts
- `a_plans()` --calls--> `ic()`  [EXTRACTED]
  scripts/design/screens_v2.py → scripts/design/all_screens.py
- `banner()` --calls--> `ic()`  [EXTRACTED]
  scripts/design/screens_v2.py → scripts/design/all_screens.py
- `bc()` --calls--> `ic()`  [EXTRACTED]
  scripts/design/screens_v2.py → scripts/design/all_screens.py

## Import Cycles
- None detected.

## Communities (76 total, 16 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.06
Nodes (41): BusyTime, AdminChatMessage, AdminOverview, AdminPerson, AllocationState, AppNotification, AuditEntry, Availability (+33 more)

### Community 1 - "Icon.tsx"
Cohesion: 0.12
Nodes (13): Data, DATA, STARTS, styles, WHO, OPTIONS, R, styles (+5 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, expo-constants@~58.0.13, expo-device@~58.0.5, @expo-google-fonts/outfit@^0.4.3, expo-haptics@~58.0.7, expo-image@~58.0.17, expo-linear-gradient@~58.0.3, expo-notifications@~58.1.8 (+18 more)

### Community 3 - "places.ts"
Cohesion: 0.21
Nodes (10): ALL_PLACES, areaName(), cityCount, fold(), POPULAR, searchPlaces(), STATE_NAMES, uniqueAreas() (+2 more)

### Community 4 - "expo"
Cohesion: 0.04
Nodes (47): backgroundColor, foregroundImage, monochromeImage, adaptiveIcon, allowBackup, blockedPermissions, package, permissions (+39 more)

### Community 5 - "pin.ts"
Cohesion: 0.21
Nodes (18): loginIdOfAuthUser(), loginKey(), sameLogin(), sessionIsGone(), checkLocalPin(), clearLocalPin(), forgetSavedSession(), hash() (+10 more)

### Community 6 - "landing.py"
Cohesion: 0.09
Nodes (43): btn(), cat_card(), companion_band(), faq(), final_cta(), footer(), ic(), landing_a() (+35 more)

### Community 7 - "colors"
Cohesion: 0.09
Nodes (40): expo-router, react, @tanstack/react-query, styles, FILTERS, styles, styles, styles (+32 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (19): { defineConfig }, expoConfig, devDependencies, eslint@^9.0.0, eslint-config-expo@~58.0.4, jest@^30.5.2, jest-expo@~58.0.12, @testing-library/react-native@^14.1.0 (+11 more)

### Community 9 - "demoAdmin.ts"
Cohesion: 0.07
Nodes (30): BroadcastRecord, CityPlan, PanicAlert, Role, Backend, activity, allDays, bk() (+22 more)

### Community 10 - "Text.tsx"
Cohesion: 0.07
Nodes (39): react-native-reanimated, Row, styles, DOT_FADE, DOT_SETTLE, styles, styles, ActiveAlert() (+31 more)

### Community 11 - "compilerOptions"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, compilerOptions, allowImportingTsExtensions, noEmit, paths, strict, types, exclude (+2 more)

### Community 12 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, export:web, graph, ios, lint, start, test (+2 more)

### Community 13 - "e2e-supabase.mjs"
Cohesion: 0.09
Nodes (14): fs, book(), cand, card, [compId, memId], got, img, offer (+6 more)

### Community 14 - "layout.tsx"
Cohesion: 0.07
Nodes (45): expo-image, expo-linear-gradient, react-native-safe-area-context, styles, Tab, EMPTY, styles, styles (+37 more)

### Community 15 - "rules.tsx"
Cohesion: 0.33
Nodes (8): agreedAt(), Consent, ConsentKind, HOUSE_RULES, LEGAL_VERSION, missingConsents(), NOT_FOR, signInConsents()

### Community 16 - "demo.ts"
Cohesion: 0.07
Nodes (28): allDays, bookings, companionStatus(), day(), demo, demoAppUpdate, demoBlocks, DemoCompanion (+20 more)

### Community 17 - "Button"
Cohesion: 0.15
Nodes (47): AdminAppUpdates(), Draft, draftOf(), Updates(), Approvals(), AdminBroadcast(), Broadcast(), styles (+39 more)

### Community 18 - "all_screens.py"
Cohesion: 0.13
Nodes (37): checkbox(), chips(), field(), label(), notice(), s_admins(), s_broadcast(), s_chat() (+29 more)

### Community 19 - "pay/[bookingId].tsx"
Cohesion: 0.26
Nodes (9): baseOptions(), checkoutHtml(), CheckoutOptions, openWebCheckout(), Props, RazorpaySheet(), RazorpaySuccess, styles (+1 more)

### Community 20 - "screens_v2.py"
Cohesion: 0.05
Nodes (46): keypad(), s_pin_login(), a_overview_sub(), banner(), booked(), booking_detail(), c_status_changes(), c_status_live() (+38 more)

### Community 21 - "admin.tsx"
Cohesion: 0.14
Nodes (29): AdminBookingDetail(), CompanionPicker(), PersonLink(), Sheet, styles, Wrap(), EMPTY, styles (+21 more)

### Community 22 - "journey.py"
Cohesion: 0.08
Nodes (26): b64(), bar(), chat_screen(), dots(), keypad(), opts(), page(), pkrow() (+18 more)

### Community 23 - "package.json"
Cohesion: 0.11
Nodes (18): expo-linking@~58.0.14, expo-secure-store@~58.0.2, expo-status-bar@~58.0.4, expo-video@~58.0.13, react-native-screens@~4.30.0, react-native-worklets@0.13.0, zustand@^5.0.16, main (+10 more)

### Community 24 - "pathlib"
Cohesion: 0.18
Nodes (6): pair(), phone(), section(), letters(), monogram(), wordmark()

### Community 25 - "prices.tsx"
Cohesion: 0.16
Nodes (19): AdminCampaign(), Editor(), endOfDay(), ENDS, Form(), isoDate(), styles, AdminCampaigns() (+11 more)

### Community 26 - "booking.ts"
Cohesion: 0.08
Nodes (43): BookingChoice, BookingPicker(), OfferLine(), styles, WEEK, AvailabilityEditor(), HOURS, styles (+35 more)

### Community 27 - "companion/[id].tsx"
Cohesion: 0.21
Nodes (23): CompanionProfile(), styles, CompanionCard(), CompanionRow(), firstName(), fromPrice(), HeartButton(), Photo() (+15 more)

### Community 28 - "preview.tsx"
Cohesion: 0.26
Nodes (13): endPreview(), go(), PreviewAs, PreviewStart, routeFor(), sampleUser(), startLivePreview(), startPreview() (+5 more)

### Community 29 - "btn"
Cohesion: 0.09
Nodes (59): bar(), btn(), card(), ic(), pill(), s_activity(), s_admin_bookings(), s_approvals() (+51 more)

### Community 30 - "body"
Cohesion: 0.19
Nodes (38): avatar(), body(), group(), h(), row(), s_admin(), s_admin_booking(), s_bookings() (+30 more)

### Community 31 - "home.tsx"
Cohesion: 0.09
Nodes (36): Row(), CategoryPage(), Discover(), greeting(), HomeTab(), styles, BecomeCompanionCard(), CommunityBanner() (+28 more)

### Community 32 - "foot"
Cohesion: 0.20
Nodes (25): foot(), c1(), c2(), c3(), c4(), c5(), c6(), c7() (+17 more)

### Community 33 - "user/[id].tsx"
Cohesion: 0.11
Nodes (31): AdminAdmins(), Admins(), styles, PanicDetail(), styles, tel(), ReviewCompanion(), styles (+23 more)

### Community 34 - "Text"
Cohesion: 0.12
Nodes (36): AdminOverview(), BLINK, Money(), PanicBanner(), Person(), styles, Earnings(), EarningsScreen() (+28 more)

### Community 35 - "brand_screens.py"
Cohesion: 0.15
Nodes (19): confirmed(), mark(), profile(), row(), welcome(), btn(), chat(), checkout() (+11 more)

### Community 36 - "review.tsx"
Cohesion: 0.27
Nodes (11): Checkout(), newKey(), RELATIONS, Step(), styles, amountDuePaise(), canHomeVisit(), endTimeOf() (+3 more)

### Community 37 - "domain/pricing.ts"
Cohesion: 0.16
Nodes (26): perks(), a11y(), PackageGrid(), Props, styles, tagFor(), applyPricing(), BASE_RATE (+18 more)

### Community 38 - "IdentityForm.tsx"
Cohesion: 0.29
Nodes (9): IdentityValue, COMPANION_MEET_OPTIONS, companionMeets(), SEE_OPTIONS, ApprovalStatus, Gender, SeeGender, Visibility (+1 more)

### Community 39 - "photo"
Cohesion: 0.23
Nodes (12): photo(), s_apply(), s_category(), s_companion(), s_home_more(), s_login(), shade(), bc() (+4 more)

### Community 40 - "ErrorState"
Cohesion: 0.11
Nodes (41): Activity(), AdminActivity(), priceDiff(), short(), styles, AdminBookings(), AdminDisputes(), styles (+33 more)

### Community 41 - "useSession"
Cohesion: 0.05
Nodes (70): Splash(), AppEffects(), RootLayout(), styles, open(), Pin(), ConfirmProvider(), Logo() (+62 more)

### Community 42 - "card_systems.py"
Cohesion: 0.22
Nodes (18): e_booking(), e_home(), e_prices(), g_booking(), g_home(), g_prices(), ic(), logo() (+10 more)

### Community 43 - "wallet.tsx"
Cohesion: 0.29
Nodes (7): react-native-svg@15.16.0, react-native-svg, Guilloche, Material, MaterialCard(), MATERIALS, styles

### Community 44 - "formatINR"
Cohesion: 0.15
Nodes (26): FooterPrice(), CampaignBanner(), CampaignBannerView(), Example(), EXAMPLES, FirstHourCard(), styles, useOffers() (+18 more)

### Community 45 - "LocationFields.tsx"
Cohesion: 0.38
Nodes (12): AreaSheet(), CitySheet(), Dropdown(), fold(), LocationFields(), NoMatch(), Row(), Sheet() (+4 more)

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
Cohesion: 0.08
Nodes (57): styles, initial(), CompanionOnboarding(), INTERESTS, Line(), Options(), Step, STEPS (+49 more)

### Community 50 - "wordmarks.py"
Cohesion: 0.27
Nodes (4): bodoni_italic(), gem(), light_lower(), urbanist_lower()

### Community 51 - "chat_keyboard.py"
Cohesion: 0.38
Nodes (3): composer(), header(), svg()

### Community 52 - "categories.py"
Cohesion: 0.31
Nodes (5): city_pill(), day_trips(), plan_rows(), pk(), profile()

### Community 53 - "m_book"
Cohesion: 0.38
Nodes (7): price_card(), price_tab(), s_availability(), s_book_length(), stack(), c_availability(), m_book()

### Community 54 - "components/bookings.tsx"
Cohesion: 0.08
Nodes (53): BookingDetail(), styles, Chat(), isDivider(), time(), Confirmed(), OfferSummary(), BookingCard() (+45 more)

### Community 57 - "jest"
Cohesion: 0.40
Nodes (5): jest, moduleNameMapper, preset, testMatch, transformIgnorePatterns

### Community 58 - "verification.ts"
Cohesion: 0.43
Nodes (6): VerificationStatus, companionStatusLine(), ID_TYPES, idUploadError(), isLiveCompanion(), needsBack()

### Community 60 - "react-native"
Cohesion: 0.16
Nodes (15): expo-haptics, react-native, SignedOut(), tab(), TabsLayout(), styles, LABEL, styles (+7 more)

### Community 66 - "safety.ts"
Cohesion: 0.28
Nodes (7): AdminReport, BlockedPerson, PANIC_AFTER_END_MS, REPORT_DETAILS_MAX, REPORT_REASONS, reportError(), ReportReason

### Community 72 - "wordmark_dot.py"
Cohesion: 0.60
Nodes (3): font_card(), icon(), mark()

## Knowledge Gaps
- **2 isolated node(s):** `expo/tsconfig.base`, `COMMUNITY_IMAGE`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 439 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Text()` connect `Text` to `Icon.tsx`, `colors`, `Text.tsx`, `layout.tsx`, `Button`, `admin.tsx`, `prices.tsx`, `booking.ts`, `companion/[id].tsx`, `preview.tsx`, `home.tsx`, `user/[id].tsx`, `review.tsx`, `domain/pricing.ts`, `ErrorState`, `useSession`, `formatINR`, `LocationFields.tsx`, `Icon`, `components/bookings.tsx`, `react-native`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base`, `COMMUNITY_IMAGE` to the rest of the system?**
  _2 weakly-connected nodes found - possible missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06376811594202898 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `Icon.tsx`, `dependencies`, `pin.ts`, `colors`, `Text.tsx`, `layout.tsx`, `Button`, `pay/[bookingId].tsx`, `admin.tsx`, `package.json`, `prices.tsx`, `booking.ts`, `companion/[id].tsx`, `preview.tsx`, `home.tsx`, `user/[id].tsx`, `Text`, `review.tsx`, `domain/pricing.ts`, `ErrorState`, `useSession`, `wallet.tsx`, `formatINR`, `LocationFields.tsx`, `Icon`, `components/bookings.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `Icon.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `react` connect `colors` to `Icon.tsx`, `dependencies`, `Text.tsx`, `layout.tsx`, `Button`, `pay/[bookingId].tsx`, `admin.tsx`, `package.json`, `prices.tsx`, `booking.ts`, `companion/[id].tsx`, `home.tsx`, `user/[id].tsx`, `Text`, `review.tsx`, `domain/pricing.ts`, `ErrorState`, `useSession`, `wallet.tsx`, `LocationFields.tsx`, `Icon`, `components/bookings.tsx`, `react-native`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._