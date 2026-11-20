# Graph Report - web  (2026-11-20)

## Corpus Check
- 150 files · ~80,612 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .jsonld 1)

## Summary
- 577 nodes · 1689 edges · 23 communities (17 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba0db4ed`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- Reveal
- OfferCards.jsx
- LegalLayout.jsx
- @sentry/nextjs
- login/page.jsx
- reset-password/page.jsx
- devDependencies
- PageHead
- package.json
- ProcessIllustrations.jsx
- WhyChooseUs.jsx
- app/layout.jsx
- [slug]/page.jsx
- allowBuilds
- dependencies
- compilerOptions
- setup.jsx
- postcss.config.mjs
- eslint.config.mjs
- scripts
- vitest
- content.js

## God Nodes (most connected - your core abstractions)
1. `next` - 73 edges
2. `rich()` - 66 edges
3. `useAuth()` - 60 edges
4. `react` - 60 edges
5. `PageHead()` - 39 edges
6. `Reveal()` - 37 edges
7. `Loading()` - 36 edges
8. `Name()` - 34 edges
9. `Contact()` - 24 edges
10. `axios` - 23 edges

## Surprising Connections (you probably didn't know these)
- `TestConsumer()` --calls--> `useAuth()`  [EXTRACTED]
  src/tests/context/AuthContext.test.jsx → legacy/web-app/app/(app)/context/AuthContext.jsx
- `SiteLayout()` --calls--> `OfferBar()`  [EXTRACTED]
  app/(site)/layout.jsx → app/(site)/_components/OfferBar.jsx
- `OfferCards()` --calls--> `StoreButtons()`  [EXTRACTED]
  app/(site)/_components/OfferCards.jsx → app/(site)/_components/StoreButtons.jsx
- `Home()` --calls--> `OfferCards()`  [EXTRACTED]
  app/(site)/page.jsx → app/(site)/_components/OfferCards.jsx
- `PricePicker()` --calls--> `OfferPrice()`  [EXTRACTED]
  app/(site)/_components/PricePicker.jsx → app/(site)/_components/OfferPrice.jsx

## Import Cycles
- None detected.

## Communities (23 total, 6 thin omitted)

### Community 0 - "next"
Cohesion: 0.06
Nodes (57): AdminLayout(), AdminOnboardingPage(), AdminPanel(), UserDetailsPage(), FellowProfile(), GlobalClickGuard(), Chat(), Notification() (+49 more)

### Community 1 - "Reveal"
Cohesion: 0.06
Nodes (50): allInterestTags, CompanionCard(), CompanionsContent(), CompanionsPage(), daysOfWeek, EmptyState(), FilterChip(), modeApiLabels (+42 more)

### Community 2 - "OfferCards.jsx"
Cohesion: 0.25
Nodes (16): OfferBar(), EXAMPLES, Examples(), hrs(), inr(), OfferCards(), inr(), OfferPrice() (+8 more)

### Community 3 - "LegalLayout.jsx"
Cohesion: 0.50
Nodes (12): CodeOfConduct(), LegalBody(), LegalHero(), LegalIntro(), LegalList(), legalNav, LegalNav(), LegalSection() (+4 more)

### Community 4 - "@sentry/nextjs"
Cohesion: 0.12
Nodes (10): onRouterTransitionStart, onRequestError, register(), dynamic, GET(), SentryExampleAPIError, Page(), SentryExampleFrontendError (+2 more)

### Community 5 - "login/page.jsx"
Cohesion: 0.15
Nodes (16): AuthInput(), getPasswordStrength(), IconEye(), IconEyeOff(), Login(), LoginContent(), trustItems, DEFAULT_PASSWORD_LENGTH (+8 more)

### Community 6 - "reset-password/page.jsx"
Cohesion: 0.26
Nodes (15): AuthField(), AuthShell(), AuthSubmit(), EyeToggle(), IconEye(), IconEyeOff(), IconLock(), IconMail() (+7 more)

### Community 8 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom@^29.0.1, tailwindcss@^4, @testing-library/react@^16.3.2, @testing-library/user-event@^14.6.1, @types/react@19.2.9, @types/react-dom@^19, vitest@^4.1.0 (+5 more)

### Community 9 - "PageHead"
Cohesion: 0.07
Nodes (65): metadata, NotFound(), outfit, urbanist, About(), metadata, metadata, Page() (+57 more)

### Community 10 - "package.json"
Cohesion: 0.18
Nodes (10): @tailwindcss/postcss@^4, @types/node@20.19.30, engines, node, name, packageManager, private, version (+2 more)

### Community 13 - "app/layout.jsx"
Cohesion: 0.40
Nodes (3): metadata, SITE_URL, viewport

### Community 15 - "[slug]/page.jsx"
Cohesion: 0.09
Nodes (22): AI_AND_SEARCH, dynamic, PRIVATE, JsonLd(), list, metadata, Cta(), dynamicParams (+14 more)

### Community 16 - "allowBuilds"
Cohesion: 0.40
Nodes (4): allowBuilds, @sentry/cli, sharp, unrs-resolver

### Community 17 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, axios@^1.13.2, next@16.1.4, react@19.2.3, react-dom@19.2.3, @sentry/nextjs@^10.44.0, socket.io-client@^4.8.3, react-dom (+1 more)

### Community 21 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.1.4, eslint, eslint-config-next

### Community 23 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, test

### Community 27 - "content.js"
Cohesion: 0.06
Nodes (73): Become(), metadata, STEPS, CategoryPage(), dynamicParams, generateMetadata(), SHARED_FAQ, Guilloche() (+65 more)

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `Reveal`, `OfferCards.jsx`, `LegalLayout.jsx`, `@sentry/nextjs`, `login/page.jsx`, `reset-password/page.jsx`, `PageHead`, `package.json`, `[slug]/page.jsx`, `dependencies`, `content.js`?**
  _High betweenness centrality (0.469) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.05691471287801563 - nodes in this community are weakly interconnected._
- **Why does `react` connect `next` to `Reveal`, `OfferCards.jsx`, `LegalLayout.jsx`, `@sentry/nextjs`, `login/page.jsx`, `reset-password/page.jsx`, `PageHead`, `package.json`, `ProcessIllustrations.jsx`, `WhyChooseUs.jsx`, `dependencies`, `content.js`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Should `Reveal` be split into smaller, more focused modules?**
  _Cohesion score 0.060528559249786874 - nodes in this community are weakly interconnected._
- **Why does `@sentry/nextjs` connect `@sentry/nextjs` to `next`, `dependencies`, `package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `@sentry/nextjs` be split into smaller, more focused modules?**
  _Cohesion score 0.12380952380952381 - nodes in this community are weakly interconnected._
- **Should `PageHead` be split into smaller, more focused modules?**
  _Cohesion score 0.07340823970037454 - nodes in this community are weakly interconnected._