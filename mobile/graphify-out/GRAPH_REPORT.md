# Graph Report - mobile  (2026-11-18)

## Corpus Check
- 197 files · ~318,662 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .example 1)

## Summary
- 1701 nodes · 7887 edges · 61 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 249 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c5fda8f4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- ErrorState
- package.json
- LocationFields.tsx
- expo
- pin.ts
- landing.py
- layout.tsx
- devDependencies
- demoAdmin.ts
- tokens.ts
- compilerOptions
- scripts
- e2e-supabase.mjs
- PhotoCard.tsx
- rules.tsx
- demo.ts
- admin.tsx
- search.ts
- booking.ts
- screens_v2.py
- review.tsx
- journey.py
- wallet_prices.py
- pathlib
- wallet_variants.py
- domain/pricing.ts
- all_screens.py
- Text
- btn
- body
- chat_keyboard.py
- foot
- admin.ts
- Icon
- brand_screens.py
- session.ts
- IdentityForm.tsx
- companion/[id].tsx
- photo
- interest.ts
- RazorpaySheet.tsx
- card_systems.py
- wallet.tsx
- BookingPicker.tsx
- view-as.tsx
- logo_concepts.py
- view_as.py
- logo_luxe.py
- react-native
- wordmarks.py
- prices.tsx
- m_book
- chat/[bookingId].tsx
- fellow/earnings.tsx
- jest
- verification.ts
- base64
- profile.tsx
- safety.ts
- supabase.ts

## God Nodes (most connected - your core abstractions)
1. `Text()` - 222 edges
2. `body()` - 138 edges
3. `Icon` - 127 edges
4. `Button()` - 111 edges
5. `errorMessage()` - 111 edges
6. `react-native` - 104 edges
7. `btn()` - 104 edges
8. `ic()` - 102 edges
9. `colors` - 97 edges
10. `Header()` - 93 edges

## Surprising Connections (you probably didn't know these)
- `AdminLayout()` --calls--> `AdminGate()`  [EXTRACTED]
  src/app/admin/_layout.tsx → src/components/admin.tsx
- `CompanionOnboarding()` --indirect_call--> `categoryTitle()`  [INFERRED]
  src/app/fellow/onboarding.tsx → src/domain/categories.ts
- `day()` --calls--> `toDateKey()`  [EXTRACTED]
  src/services/demo.ts → src/domain/booking.ts
- `normaliseCompanion()` --calls--> `areaName()`  [EXTRACTED]
  src/services/backend.ts → src/domain/places.ts
- `toProfile()` --calls--> `areaName()`  [EXTRACTED]
  src/services/backend.ts → src/domain/places.ts

## Import Cycles
- None detected.

## Communities (61 total, 0 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.06
Nodes (40): BusyTime, AdminChatMessage, AdminOverview, AdminPerson, AllocationState, AppNotification, Availability, BookingStatus (+32 more)

### Community 1 - "ErrorState"
Cohesion: 0.11
Nodes (44): AdminAdmins(), Admins(), styles, Approvals(), styles, Tab, AdminBookings(), AdminBroadcast() (+36 more)

### Community 2 - "package.json"
Cohesion: 0.04
Nodes (64): dependencies, expo@~58.0.20, expo-constants@~58.0.13, expo-device@~58.0.5, expo-font@~58.0.10, @expo-google-fonts/dm-sans@^0.4.2, @expo-google-fonts/lora@^0.4.2, @expo-google-fonts/outfit@^0.4.3 (+56 more)

### Community 3 - "LocationFields.tsx"
Cohesion: 0.15
Nodes (26): AreaSheet(), CitySheet(), Dropdown(), fold(), LocationFields(), NoMatch(), Row(), Sheet() (+18 more)

### Community 4 - "expo"
Cohesion: 0.04
Nodes (47): backgroundColor, foregroundImage, monochromeImage, adaptiveIcon, allowBackup, blockedPermissions, package, permissions (+39 more)

### Community 5 - "pin.ts"
Cohesion: 0.21
Nodes (18): expo-crypto@~58.0.7, expo-crypto, loginIdOfAuthUser(), loginKey(), sameLogin(), sessionIsGone(), checkLocalPin(), clearLocalPin() (+10 more)

### Community 6 - "landing.py"
Cohesion: 0.34
Nodes (17): btn(), cat_card(), companion_band(), faq(), final_cta(), footer(), ic(), landing_a() (+9 more)

### Community 7 - "layout.tsx"
Cohesion: 0.10
Nodes (39): react-native-safe-area-context, @tanstack/react-query, Activity(), AdminActivity(), priceDiff(), short(), styles, EMPTY (+31 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (19): { defineConfig }, expoConfig, devDependencies, eslint@^9.0.0, eslint-config-expo@~58.0.4, jest@^30.5.2, jest-expo@~58.0.12, @testing-library/react-native@^14.1.0 (+11 more)

### Community 9 - "demoAdmin.ts"
Cohesion: 0.08
Nodes (29): AuditEntry, BroadcastRecord, CityPlan, PanicAlert, backend, Backend, activity, allDays (+21 more)

### Community 10 - "tokens.ts"
Cohesion: 0.06
Nodes (67): expo-haptics, expo-router, react, react-native-reanimated, AdminLayout(), styles, DOT_FADE, DOT_SETTLE (+59 more)

### Community 11 - "compilerOptions"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, compilerOptions, allowImportingTsExtensions, noEmit, paths, strict, types, exclude (+2 more)

### Community 12 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, export:web, graph, ios, lint, start, test (+2 more)

### Community 13 - "e2e-supabase.mjs"
Cohesion: 0.08
Nodes (15): fs, book(), cand, card, [compId, memId], got, img, offer (+7 more)

### Community 14 - "PhotoCard.tsx"
Cohesion: 0.09
Nodes (25): expo-image, expo-linear-gradient, styles, PHOTOS, styles, styles, styles, DeckCard() (+17 more)

### Community 15 - "rules.tsx"
Cohesion: 0.27
Nodes (10): longDate(), styles, agreedAt(), Consent, ConsentKind, HOUSE_RULES, LEGAL_VERSION, missingConsents() (+2 more)

### Community 16 - "demo.ts"
Cohesion: 0.07
Nodes (27): SessionUser, AuthResult, allDays, bookings, companionStatus(), day(), demo, demoBlocks (+19 more)

### Community 17 - "admin.tsx"
Cohesion: 0.11
Nodes (37): AdminBookingDetail(), PersonLink(), Sheet, styles, Wrap(), PanicDetail(), styles, tel() (+29 more)

### Community 18 - "search.ts"
Cohesion: 0.36
Nodes (6): offersCategory(), filterCompanions(), photosFirst(), Sort, SORTS, Companion

### Community 19 - "booking.ts"
Cohesion: 0.10
Nodes (30): BookingsTab(), styles, TABS, AREAS, areasFor(), amountDuePaise(), awaitingAnswer(), BookingTab (+22 more)

### Community 20 - "screens_v2.py"
Cohesion: 0.05
Nodes (46): keypad(), s_pin_login(), a_overview_sub(), banner(), booked(), booking_detail(), c_status_changes(), c_status_live() (+38 more)

### Community 21 - "review.tsx"
Cohesion: 0.14
Nodes (46): Checkout(), newKey(), RELATIONS, Step(), styles, BookingDetail(), styles, Confirmed() (+38 more)

### Community 22 - "journey.py"
Cohesion: 0.07
Nodes (31): city_pill(), day_trips(), plan_rows(), b64(), bar(), chat_screen(), dots(), keypad() (+23 more)

### Community 23 - "wallet_prices.py"
Cohesion: 0.25
Nodes (13): big_card(), cta(), header(), ic(), p_companion(), p_lift(), p_stack(), p_swipe() (+5 more)

### Community 24 - "pathlib"
Cohesion: 0.15
Nodes (7): letters(), monogram(), wordmark(), icon(), mark(), row(), screen()

### Community 25 - "wallet_variants.py"
Cohesion: 0.31
Nodes (11): bell(), card(), head(), logo(), tabs(), v_grid(), v_lifted(), v_passes() (+3 more)

### Community 26 - "domain/pricing.ts"
Cohesion: 0.13
Nodes (29): perks(), a11y(), PackageGrid(), Props, styles, tagFor(), refundIfCancelledNow(), applyPricing() (+21 more)

### Community 27 - "all_screens.py"
Cohesion: 0.13
Nodes (37): checkbox(), chips(), field(), label(), notice(), s_admins(), s_broadcast(), s_chat() (+29 more)

### Community 28 - "Text"
Cohesion: 0.21
Nodes (36): CompanionPicker(), ReportCard(), ReviewCompanion(), styles, ViewAs(), Blocked(), SelectDateTime(), DeleteAccount() (+28 more)

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
Cohesion: 0.13
Nodes (21): AdminAction, BookingTab, can(), canActOn(), describeAction(), isStaff(), isSuperadmin(), marketRole() (+13 more)

### Community 34 - "Icon"
Cohesion: 0.15
Nodes (32): CategoryPage(), styles, Splash(), Role(), Discover(), greeting(), HomeTab(), styles (+24 more)

### Community 35 - "brand_screens.py"
Cohesion: 0.15
Nodes (19): confirmed(), mark(), profile(), row(), welcome(), btn(), chat(), checkout() (+11 more)

### Community 36 - "session.ts"
Cohesion: 0.17
Nodes (9): ID_COPY, styles, IconName, Role, setApiToken(), DEMO, LINKS, SITE_URL (+1 more)

### Community 37 - "IdentityForm.tsx"
Cohesion: 0.29
Nodes (12): IdentityForm(), IdentityValue, styles, defaultVisibility(), GENDER_OPTIONS, SEE_OPTIONS, VISIBILITY_COPY, ApprovalStatus (+4 more)

### Community 38 - "companion/[id].tsx"
Cohesion: 0.21
Nodes (22): CompanionProfile(), styles, CompanionCard(), CompanionRow(), firstName(), fromPrice(), HeartButton(), Photo() (+14 more)

### Community 39 - "photo"
Cohesion: 0.23
Nodes (12): photo(), s_apply(), s_category(), s_companion(), s_home_more(), s_login(), shade(), bc() (+4 more)

### Community 40 - "interest.ts"
Cohesion: 0.31
Nodes (8): APPROVAL, categoryTitle(), MEET, roleLabel(), SignupChoices, signupDetails(), topCategories(), base

### Community 41 - "RazorpaySheet.tsx"
Cohesion: 0.26
Nodes (9): baseOptions(), checkoutHtml(), CheckoutOptions, openWebCheckout(), Props, RazorpaySheet(), RazorpaySuccess, styles (+1 more)

### Community 42 - "card_systems.py"
Cohesion: 0.22
Nodes (18): e_booking(), e_home(), e_prices(), g_booking(), g_home(), g_prices(), ic(), logo() (+10 more)

### Community 43 - "wallet.tsx"
Cohesion: 0.40
Nodes (5): Guilloche, Material, MaterialCard(), MATERIALS, styles

### Community 44 - "BookingPicker.tsx"
Cohesion: 0.17
Nodes (22): SearchTab(), BookingChoice, BookingPicker(), styles, WEEK, AvailabilityEditor(), AvailabilityValue, emptyAvailability() (+14 more)

### Community 45 - "view-as.tsx"
Cohesion: 0.09
Nodes (36): Data, DATA, STARTS, styles, WHO, AppEffects(), RootLayout(), styles (+28 more)

### Community 46 - "logo_concepts.py"
Cohesion: 0.19
Nodes (10): card(), diamond(), diamond_only(), face_to_face(), pin_p(), svg(), two_seats(), uid() (+2 more)

### Community 47 - "view_as.py"
Cohesion: 0.23
Nodes (10): s_action(), s_companion_dash(), s_companion_onb(), s_exit(), s_member_book(), s_member_home(), s_pick(), s_switch() (+2 more)

### Community 48 - "logo_luxe.py"
Cohesion: 0.29
Nodes (9): card(), cut(), gem(), linked(), signature(), svg(), uid(), word() (+1 more)

### Community 49 - "react-native"
Cohesion: 0.09
Nodes (41): react-native, styles, CompanionOnboarding(), INTERESTS, Line(), Options(), Step, STEPS (+33 more)

### Community 50 - "wordmarks.py"
Cohesion: 0.27
Nodes (4): bodoni_italic(), gem(), light_lower(), urbanist_lower()

### Community 51 - "prices.tsx"
Cohesion: 0.43
Nodes (6): AdminPrices(), Draft, draftOf(), Pair(), Prices(), styles

### Community 53 - "m_book"
Cohesion: 0.38
Nodes (7): price_card(), price_tab(), s_availability(), s_book_length(), stack(), c_availability(), m_book()

### Community 54 - "chat/[bookingId].tsx"
Cohesion: 0.09
Nodes (35): Chat(), isDivider(), Row, styles, time(), HoldButton(), PanicButton(), RiseIn() (+27 more)

### Community 55 - "fellow/earnings.tsx"
Cohesion: 0.48
Nodes (5): Earnings(), EarningsScreen(), styles, EarningsTab(), Brand()

### Community 57 - "jest"
Cohesion: 0.40
Nodes (5): jest, moduleNameMapper, preset, testMatch, transformIgnorePatterns

### Community 58 - "verification.ts"
Cohesion: 0.43
Nodes (6): VerificationStatus, ID_TYPES, idUploadError(), isLiveCompanion(), needsBack(), needsIdToAccept()

### Community 59 - "base64"
Cohesion: 0.19
Nodes (6): pair(), phone(), section(), font_card(), icon(), mark()

### Community 60 - "profile.tsx"
Cohesion: 0.11
Nodes (38): open(), SignedOut(), tab(), TabsLayout(), ProfileTab(), styles, LABEL, styles (+30 more)

### Community 61 - "safety.ts"
Cohesion: 0.28
Nodes (7): AdminReport, BlockedPerson, PANIC_AFTER_END_MS, REPORT_DETAILS_MAX, REPORT_REASONS, reportError(), ReportReason

### Community 65 - "supabase.ts"
Cohesion: 0.13
Nodes (12): expo-secure-store@~58.0.2, @react-native-async-storage/async-storage@2.2.0, react-native-url-polyfill@^4.0.0, @supabase/supabase-js@^2.119.0, expo-secure-store, @react-native-async-storage/async-storage, react-native-url-polyfill, @supabase/supabase-js (+4 more)

## Knowledge Gaps
- **2 isolated node(s):** `expo/tsconfig.base`, `COMMUNITY_IMAGE`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 423 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Text()` connect `Text` to `ErrorState`, `LocationFields.tsx`, `layout.tsx`, `tokens.ts`, `PhotoCard.tsx`, `rules.tsx`, `admin.tsx`, `booking.ts`, `review.tsx`, `domain/pricing.ts`, `Icon`, `session.ts`, `IdentityForm.tsx`, `companion/[id].tsx`, `BookingPicker.tsx`, `view-as.tsx`, `react-native`, `prices.tsx`, `chat/[bookingId].tsx`, `fellow/earnings.tsx`, `profile.tsx`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base`, `COMMUNITY_IMAGE` to the rest of the system?**
  _2 weakly-connected nodes found - possible missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06262626262626263 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `ErrorState`, `package.json`, `LocationFields.tsx`, `layout.tsx`, `tokens.ts`, `PhotoCard.tsx`, `rules.tsx`, `admin.tsx`, `booking.ts`, `review.tsx`, `domain/pricing.ts`, `Text`, `Icon`, `session.ts`, `IdentityForm.tsx`, `companion/[id].tsx`, `RazorpaySheet.tsx`, `wallet.tsx`, `BookingPicker.tsx`, `view-as.tsx`, `prices.tsx`, `chat/[bookingId].tsx`, `fellow/earnings.tsx`, `profile.tsx`, `supabase.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `ErrorState` be split into smaller, more focused modules?**
  _Cohesion score 0.10740203193033382 - nodes in this community are weakly interconnected._
- **Why does `react` connect `tokens.ts` to `ErrorState`, `package.json`, `LocationFields.tsx`, `layout.tsx`, `PhotoCard.tsx`, `rules.tsx`, `admin.tsx`, `booking.ts`, `review.tsx`, `domain/pricing.ts`, `Text`, `Icon`, `session.ts`, `companion/[id].tsx`, `RazorpaySheet.tsx`, `wallet.tsx`, `BookingPicker.tsx`, `view-as.tsx`, `react-native`, `prices.tsx`, `chat/[bookingId].tsx`, `fellow/earnings.tsx`, `profile.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04278846153846154 - nodes in this community are weakly interconnected._