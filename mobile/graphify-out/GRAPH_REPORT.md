# Graph Report - mobile  (2026-11-20)

## Corpus Check
- 204 files · ~324,876 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .example 1)

## Summary
- 1758 nodes · 8209 edges · 80 communities (67 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 249 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d693689`
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
- space
- devDependencies
- demoAdmin.ts
- colors
- compilerOptions
- scripts
- e2e-supabase.mjs
- tokens.ts
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
- push.ts
- booking.ts
- companion/[id].tsx
- preview.tsx
- bar
- body
- PhotoCard.tsx
- foot
- Button.tsx
- profile.tsx
- brand_screens.py
- motion.tsx
- domain/pricing.ts
- IdentityForm.tsx
- ic
- interest.ts
- flow.ts
- card_systems.py
- react-native-svg
- formatINR
- useSession
- logo_concepts.py
- view_as.py
- logo_luxe.py
- Icon
- wordmarks.py
- states.tsx
- categories.py
- m_book
- domain/chat.ts
- expo-image-picker
- @react-native-async-storage/async-storage
- jest
- Dashboard.tsx
- base64
- ModeSwitch.tsx
- useSession
- layout.tsx
- pack-web.js
- expo-notifications
- session.ts
- safety.ts
- expo-system-ui@~58.0.6
- expo-video
- view-as.tsx
- zustand
- react-native-url-polyfill
- wordmark_dot.py
- react-native-worklets@0.13.0
- lib/chat.ts
- expo@~58.0.20
- expo-font
- expo-status-bar
- react-dom@19.3.0
- react-native-gesture-handler

## God Nodes (most connected - your core abstractions)
1. `Text()` - 232 edges
2. `body()` - 138 edges
3. `Icon` - 127 edges
4. `Button()` - 119 edges
5. `errorMessage()` - 116 edges
6. `react-native` - 107 edges
7. `btn()` - 104 edges
8. `ic()` - 102 edges
9. `colors` - 99 edges
10. `Header()` - 98 edges

## Surprising Connections (you probably didn't know these)
- `day()` --calls--> `toDateKey()`  [EXTRACTED]
  src/services/demo.ts → src/domain/booking.ts
- `Chat()` --calls--> `typing`  [EXTRACTED]
  src/app/chat/[bookingId].tsx → src/components/ui/motion.tsx
- `HomeTab()` --calls--> `useMode()`  [EXTRACTED]
  src/app/(tabs)/home.tsx → src/lib/mode.ts
- `Discover()` --calls--> `CompanionCard()`  [EXTRACTED]
  src/app/(tabs)/home.tsx → src/components/companions.tsx
- `Discover()` --calls--> `HomeCategories()`  [EXTRACTED]
  src/app/(tabs)/home.tsx → src/components/HomeCategories.tsx

## Import Cycles
- None detected.

## Communities (80 total, 13 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.06
Nodes (39): BookingTab, AdminChatMessage, AdminOverview, AdminPerson, AllocationState, AppNotification, Availability, BookingStatus (+31 more)

### Community 1 - "react-native"
Cohesion: 0.11
Nodes (28): expo-image, react, react-native, styles, Phase, styles, styles, OPTIONS (+20 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, expo-constants@~58.0.13, expo-crypto@~58.0.7, expo-device@~58.0.5, @expo-google-fonts/lora@^0.4.2, expo-haptics@~58.0.7, expo-image@~58.0.17, expo-linear-gradient@~58.0.3 (+16 more)

### Community 3 - "LocationFields.tsx"
Cohesion: 0.11
Nodes (29): AreaSheet(), CitySheet(), Dropdown(), fold(), LocationFields(), NoMatch(), Row(), Sheet() (+21 more)

### Community 4 - "expo"
Cohesion: 0.04
Nodes (47): backgroundColor, foregroundImage, monochromeImage, adaptiveIcon, allowBackup, blockedPermissions, package, permissions (+39 more)

### Community 5 - "pin.ts"
Cohesion: 0.25
Nodes (16): loginIdOfAuthUser(), loginKey(), sameLogin(), sessionIsGone(), checkLocalPin(), clearLocalPin(), forgetSavedSession(), hash() (+8 more)

### Community 6 - "landing.py"
Cohesion: 0.34
Nodes (17): btn(), cat_card(), companion_band(), faq(), final_cta(), footer(), ic(), landing_a() (+9 more)

### Community 7 - "space"
Cohesion: 0.13
Nodes (27): expo-router, react-native-safe-area-context, @tanstack/react-query, styles, EMPTY, styles, styles, LABEL (+19 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (19): { defineConfig }, expoConfig, devDependencies, eslint@^9.0.0, eslint-config-expo@~58.0.4, jest@^30.5.2, jest-expo@~58.0.12, @testing-library/react-native@^14.1.0 (+11 more)

### Community 9 - "demoAdmin.ts"
Cohesion: 0.07
Nodes (31): AuditEntry, BroadcastRecord, PanicAlert, Role, backend, Backend, activity, allDays (+23 more)

### Community 10 - "colors"
Cohesion: 0.14
Nodes (20): expo-haptics, react-native-reanimated, PULSE, styles, styles, WEAK, styles, styles (+12 more)

### Community 11 - "compilerOptions"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, compilerOptions, allowImportingTsExtensions, noEmit, paths, strict, types, exclude (+2 more)

### Community 12 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, android, export:web, graph, ios, lint, start, test (+2 more)

### Community 13 - "e2e-supabase.mjs"
Cohesion: 0.15
Nodes (8): book(), cand, card, [compId, memId], got, img, offer, rpc()

### Community 14 - "tokens.ts"
Cohesion: 0.09
Nodes (20): expo-linear-gradient, styles, PHOTOS, styles, styles, EARN_HOURS, STEPS, styles (+12 more)

### Community 15 - "rules.tsx"
Cohesion: 0.33
Nodes (8): agreedAt(), Consent, ConsentKind, HOUSE_RULES, LEGAL_VERSION, missingConsents(), NOT_FOR, signInConsents()

### Community 16 - "demo.ts"
Cohesion: 0.07
Nodes (28): BusyTime, allDays, bookings, companionStatus(), day(), demo, demoBlocks, DemoCompanion (+20 more)

### Community 17 - "Text"
Cohesion: 0.05
Nodes (182): Activity(), AdminActivity(), priceDiff(), short(), AdminAdmins(), Admins(), styles, Approvals() (+174 more)

### Community 18 - "wallet_prices.py"
Cohesion: 0.29
Nodes (12): big_card(), cta(), header(), ic(), p_companion(), p_lift(), p_stack(), p_swipe() (+4 more)

### Community 19 - "pay/[bookingId].tsx"
Cohesion: 0.23
Nodes (11): METHODS, styles, baseOptions(), checkoutHtml(), CheckoutOptions, openWebCheckout(), Props, RazorpaySheet() (+3 more)

### Community 20 - "screens_v2.py"
Cohesion: 0.05
Nodes (55): keypad(), s_pin_login(), s_pin_set(), a_approvals_photos(), a_overview_sub(), a_panic(), a_reject(), booked() (+47 more)

### Community 21 - "wallet_variants.py"
Cohesion: 0.27
Nodes (12): bell(), card(), guilloche(), head(), logo(), tabs(), v_grid(), v_lifted() (+4 more)

### Community 22 - "journey.py"
Cohesion: 0.08
Nodes (26): b64(), bar(), chat_screen(), dots(), keypad(), opts(), page(), pkrow() (+18 more)

### Community 23 - "package.json"
Cohesion: 0.11
Nodes (18): @expo-google-fonts/dm-sans@^0.4.2, @expo-google-fonts/outfit@^0.4.3, @expo-google-fonts/urbanist@^0.4.2, @react-native-community/netinfo@^12.0.1, react-native-screens@~4.30.0, react-native-webview@14.0.1, zod@^4.6.7, main (+10 more)

### Community 24 - "pathlib"
Cohesion: 0.13
Nodes (8): composer(), header(), svg(), letters(), monogram(), wordmark(), icon(), mark()

### Community 25 - "push.ts"
Cohesion: 0.48
Nodes (5): open(), modeForNotification(), enterModeFor(), openFromPush(), registerForPush()

### Community 26 - "booking.ts"
Cohesion: 0.07
Nodes (58): styles, TABS, SearchTab(), BookingChoice, BookingPicker(), OfferLine(), styles, WEEK (+50 more)

### Community 27 - "companion/[id].tsx"
Cohesion: 0.18
Nodes (24): CompanionProfile(), styles, CompanionCard(), CompanionRow(), firstName(), fromPrice(), HeartButton(), Photo() (+16 more)

### Community 28 - "preview.tsx"
Cohesion: 0.29
Nodes (12): endPreview(), go(), PreviewAs, PreviewStart, routeFor(), sampleUser(), startLivePreview(), startPreview() (+4 more)

### Community 29 - "bar"
Cohesion: 0.12
Nodes (54): avatar(), bar(), card(), checkbox(), chips(), field(), label(), pill() (+46 more)

### Community 30 - "body"
Cohesion: 0.16
Nodes (43): body(), group(), h(), row(), s_admin(), s_admin_booking(), s_bookings(), s_dashboard() (+35 more)

### Community 31 - "PhotoCard.tsx"
Cohesion: 0.13
Nodes (17): DeckCard(), Dot(), HomeCategories(), styles, DARK, ICON, Parallax, ParallaxPhoto() (+9 more)

### Community 32 - "foot"
Cohesion: 0.15
Nodes (39): btn(), foot(), notice(), s_book_time(), s_companion(), s_confirmed(), s_email(), s_otp() (+31 more)

### Community 33 - "Button.tsx"
Cohesion: 0.11
Nodes (15): EMPTY, styles, Person, styles, BG, FG, Props, styles (+7 more)

### Community 34 - "profile.tsx"
Cohesion: 0.21
Nodes (15): AdminOverview(), BLINK, Money(), PanicBanner(), Person(), styles, ProfileTab(), styles (+7 more)

### Community 35 - "brand_screens.py"
Cohesion: 0.15
Nodes (19): confirmed(), mark(), profile(), row(), welcome(), btn(), chat(), checkout() (+11 more)

### Community 36 - "motion.tsx"
Cohesion: 0.14
Nodes (15): bob, EASE_OUT, easeOutQuart(), fadeOnly, fadeUp, fromLeft, fromRight, MeetPair() (+7 more)

### Community 37 - "domain/pricing.ts"
Cohesion: 0.21
Nodes (15): applyPricing(), BASE_RATE, companionKeepFor(), companionShareOf(), DEFAULT_PACKAGE_PRICES, DEFAULT_PRICING, HEADLINE_HOURS, listeners (+7 more)

### Community 38 - "IdentityForm.tsx"
Cohesion: 0.24
Nodes (13): identityComplete(), IdentityValue, styles, COMPANION_MEET_OPTIONS, companionMeets(), GENDER_OPTIONS, SEE_OPTIONS, VISIBILITY_COPY (+5 more)

### Community 39 - "ic"
Cohesion: 0.11
Nodes (26): ic(), photo(), s_activity(), s_apply(), s_booking(), s_category(), s_home_more(), s_login() (+18 more)

### Community 40 - "interest.ts"
Cohesion: 0.31
Nodes (8): APPROVAL, categoryTitle(), MEET, roleLabel(), SignupChoices, signupDetails(), topCategories(), base

### Community 41 - "flow.ts"
Cohesion: 0.14
Nodes (27): Splash(), staffLevel(), AppMode, canUseCompanionMode(), effectiveMode(), modeOfSide(), modesFor(), SideMode (+19 more)

### Community 42 - "card_systems.py"
Cohesion: 0.22
Nodes (18): e_booking(), e_home(), e_prices(), g_booking(), g_home(), g_prices(), ic(), logo() (+10 more)

### Community 44 - "formatINR"
Cohesion: 0.10
Nodes (47): Checkout(), newKey(), RELATIONS, Step(), styles, FooterPrice(), perks(), CampaignBanner() (+39 more)

### Community 45 - "useSession"
Cohesion: 0.21
Nodes (18): AppEffects(), RootLayout(), styles, ConfirmProvider(), connectOnlineManager(), OfflineBanner(), setUnauthorizedHandler(), EMPTY (+10 more)

### Community 46 - "logo_concepts.py"
Cohesion: 0.19
Nodes (10): card(), diamond(), diamond_only(), face_to_face(), pin_p(), svg(), two_seats(), uid() (+2 more)

### Community 47 - "view_as.py"
Cohesion: 0.26
Nodes (10): s_action(), s_companion_dash(), s_companion_onb(), s_exit(), s_member_book(), s_member_home(), s_pick(), s_switch() (+2 more)

### Community 48 - "logo_luxe.py"
Cohesion: 0.29
Nodes (9): card(), cut(), gem(), linked(), signature(), svg(), uid(), word() (+1 more)

### Community 49 - "Icon"
Cohesion: 0.11
Nodes (43): Row(), CategoryPage(), styles, initial(), CompanionOnboarding(), INTERESTS, Line(), Options() (+35 more)

### Community 50 - "wordmarks.py"
Cohesion: 0.27
Nodes (4): bodoni_italic(), gem(), light_lower(), urbanist_lower()

### Community 51 - "states.tsx"
Cohesion: 0.14
Nodes (12): styles, Tab, REASONS, styles, LIVE_INTERVAL, POP, ProgressBar(), PULSE (+4 more)

### Community 52 - "categories.py"
Cohesion: 0.19
Nodes (7): city_pill(), day_trips(), plan_rows(), pk(), profile(), row(), screen()

### Community 53 - "m_book"
Cohesion: 0.38
Nodes (7): price_card(), price_tab(), s_availability(), s_book_length(), stack(), c_availability(), m_book()

### Community 54 - "domain/chat.ts"
Cohesion: 0.23
Nodes (9): idOf(), ChatBooking, ChatThread, chatThreads(), endsAt(), threadKey(), threadOf(), ChatMessage (+1 more)

### Community 56 - "@react-native-async-storage/async-storage"
Cohesion: 0.33
Nodes (5): expo-secure-store@~58.0.2, @react-native-async-storage/async-storage@2.2.0, expo-secure-store, @react-native-async-storage/async-storage, secure

### Community 57 - "jest"
Cohesion: 0.40
Nodes (5): jest, moduleNameMapper, preset, testMatch, transformIgnorePatterns

### Community 58 - "Dashboard.tsx"
Cohesion: 0.22
Nodes (13): HomeTab(), CompanionDashboard(), Stat(), styles, BellButton(), companionStatusLine(), fixNeeds(), ID_TYPES (+5 more)

### Community 59 - "base64"
Cohesion: 0.33
Nodes (3): pair(), phone(), section()

### Community 60 - "ModeSwitch.tsx"
Cohesion: 0.29
Nodes (13): SignedOut(), tab(), TabsLayout(), LABEL, ModeSwitch(), OtherModeBanner(), styles, badgeLabel() (+5 more)

### Community 61 - "useSession"
Cohesion: 0.24
Nodes (13): Chat(), isDivider(), Row, styles, time(), ActiveAlert(), HoldButton(), PanicButton() (+5 more)

### Community 62 - "layout.tsx"
Cohesion: 0.23
Nodes (10): styles, BRAND_WORD, dotColorFor(), isLight(), Wordmark(), bellStyles, layoutStyles, Logo() (+2 more)

### Community 63 - "pack-web.js"
Cohesion: 0.20
Nodes (6): fs, fs, html, js, mime, path

### Community 65 - "session.ts"
Cohesion: 0.13
Nodes (10): ID_COPY, styles, DOT_FADE, DOT_SETTLE, styles, EASE_OUT_CSS, setApiToken(), DEMO (+2 more)

### Community 66 - "safety.ts"
Cohesion: 0.28
Nodes (7): AdminReport, BlockedPerson, PANIC_AFTER_END_MS, REPORT_DETAILS_MAX, REPORT_REASONS, reportError(), ReportReason

### Community 69 - "view-as.tsx"
Cohesion: 0.33
Nodes (5): Data, DATA, STARTS, styles, WHO

### Community 72 - "wordmark_dot.py"
Cohesion: 0.60
Nodes (3): font_card(), icon(), mark()

### Community 74 - "lib/chat.ts"
Cohesion: 0.18
Nodes (13): @supabase/supabase-js@^2.119.0, @supabase/supabase-js, mergeMessages(), demoThread(), messageId(), Row, Status, toMessage() (+5 more)

## Knowledge Gaps
- **2 isolated node(s):** `expo/tsconfig.base`, `COMMUNITY_IMAGE`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 434 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Text()` connect `Text` to `react-native`, `LocationFields.tsx`, `space`, `colors`, `tokens.ts`, `pay/[bookingId].tsx`, `booking.ts`, `companion/[id].tsx`, `preview.tsx`, `PhotoCard.tsx`, `Button.tsx`, `profile.tsx`, `IdentityForm.tsx`, `flow.ts`, `formatINR`, `useSession`, `Icon`, `states.tsx`, `Dashboard.tsx`, `ModeSwitch.tsx`, `useSession`, `layout.tsx`, `session.ts`, `view-as.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `expo/tsconfig.base`, `COMMUNITY_IMAGE` to the rest of the system?**
  _2 weakly-connected nodes found - possible missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06448202959830866 - nodes in this community are weakly interconnected._
- **Why does `react-native` connect `react-native` to `dependencies`, `LocationFields.tsx`, `space`, `colors`, `tokens.ts`, `Text`, `pay/[bookingId].tsx`, `package.json`, `push.ts`, `booking.ts`, `companion/[id].tsx`, `preview.tsx`, `PhotoCard.tsx`, `Button.tsx`, `profile.tsx`, `motion.tsx`, `IdentityForm.tsx`, `formatINR`, `useSession`, `Icon`, `states.tsx`, `@react-native-async-storage/async-storage`, `Dashboard.tsx`, `ModeSwitch.tsx`, `useSession`, `layout.tsx`, `session.ts`, `view-as.tsx`, `lib/chat.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `react-native` be split into smaller, more focused modules?**
  _Cohesion score 0.10953058321479374 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react-native` to `dependencies`, `LocationFields.tsx`, `space`, `colors`, `tokens.ts`, `Text`, `pay/[bookingId].tsx`, `package.json`, `booking.ts`, `companion/[id].tsx`, `PhotoCard.tsx`, `Button.tsx`, `motion.tsx`, `domain/pricing.ts`, `flow.ts`, `formatINR`, `useSession`, `Icon`, `states.tsx`, `Dashboard.tsx`, `ModeSwitch.tsx`, `useSession`, `layout.tsx`, `session.ts`, `view-as.tsx`, `lib/chat.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._