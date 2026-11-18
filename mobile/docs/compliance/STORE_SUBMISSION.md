# prsnn · Store submission answers

Ready-to-paste answers for Google Play Console and App Store Connect. Bundle / package:
`com.prsnn.app`. Version comes from EAS (`appVersionSource: remote`, `autoIncrement`).

Replace `https://prsnn.com` with the live domain if it differs.

## URLs both stores ask for

| Field | URL |
|---|---|
| Privacy policy | https://prsnn.com/privacy |
| Terms of use (App Store EULA: custom) | https://prsnn.com/terms |
| Account deletion (Play: "Delete account URL") | https://prsnn.com/delete-account |
| Child safety standards (Play: social apps) | https://prsnn.com/child-safety |
| Support / marketing | https://prsnn.com/grievance · https://prsnn.com |

## Google Play · Data safety

Data is encrypted in transit: **Yes**. Users can request deletion: **Yes** (in app and at /delete-account).
Data sold: **No**. Used for advertising: **No**.

| Data type | Collected | Shared | Optional | Purpose |
|---|---|---|---|---|
| Name | Yes | No | No | Account management, App functionality |
| Phone number | Yes | No | No | Account management, App functionality (sign-in, WhatsApp booking updates) |
| Email address | Yes (email sign-up only) | No | Yes | Account management |
| Gender | Yes | No | No | App functionality (who you'd like to meet) |
| Approximate location (city/area typed by the user, not GPS) | Yes | No | No | App functionality |
| Photos | Yes | No | No | App functionality (profile photo), Fraud prevention, security and compliance (ID photos, selfie) |
| Other user-generated content (chat messages) | Yes | No | No | App functionality, Fraud prevention, security and compliance |
| Purchase history (bookings, amounts) | Yes | No | No | App functionality |
| User payment info (card / UPI / bank) | Yes, entered in Razorpay’s checkout page; prsnn never sees or stores it | Yes (Razorpay, payment processor) | No | App functionality (payments), Fraud prevention |
| User IDs | Yes | No | No | Account management |
| Device or other IDs (push token) | Yes | No | No | App functionality (notifications) |
| Crash logs / diagnostics | No (app) | – | – | – |

"Shared" is No because providers (Supabase, Waplify/WhatsApp, Expo push, Razorpay) process data on prsnn's behalf, which Play does not count as sharing.

Permissions: Camera (profile and ID photos), Photos (choose a photo), Notifications. Location, microphone and audio are blocked in `app.json`.

## Google Play · Content rating (IARC questionnaire)

- Category: **Social / Communication**.
- Users can interact or exchange content: **Yes** (chat between matched users only, after a paid booking).
- Shares user location with other users: **No** (only the public meeting place in a booking).
- Allows purchases: **Yes** (digital booking of real-world services; not in-app purchase of digital goods).
- Violence, sexual content, profanity, drugs, gambling: **None**.
- Target audience: **18 and over only**. Not designed for children.

## App Store Connect · App Privacy

Tracking: **No** (no data used to track across apps; `NSPrivacyTracking` false in the privacy manifest).

Data linked to the user (not used for tracking): Contact Info (name, phone, email), User Content (photos, messages),
Identifiers (user ID, device push token), Purchases (booking history), Sensitive Info: **No** (gender is not
Sensitive Info under Apple's definitions; ID photos are listed under User Content → Photos), Location: **No** (typed area only).
Purpose for all: App Functionality; photos also Other (identity verification).

Privacy manifest: `ios.privacyManifests` in `app.json` (UserDefaults CA92.1, FileTimestamp C617.1, SystemBootTime 35F9.1, DiskSpace E174.1).
Encryption: `usesNonExemptEncryption: false` (HTTPS only).

## App Store · Age rating

Mature/Suggestive themes: **None**. Unrestricted web access: **No**. User-generated content: **Yes, with moderation**
(profiles and photos reviewed by staff; anyone can **report** or **block** another person from their profile or the chat
("⋯"); reports reach staff in Admin → Reports; staff can suspend). Choose **18+** (meets real people in person).

## App review notes (both stores)

```
prsnn books platonic companions for everyday plans in public places, across India.
It is not a dating or escort service; meetings are strictly platonic and the app enforces
public meeting places (home visits only when a family books for a parent).

Payments use Razorpay (an RBI-authorised payment aggregator). Bookings are for real-world, in-person
services (platonic company), so In-App Purchase / Play Billing does not apply (App Store Guideline 3.1.3(e),
Google Play Payments policy: physical goods and services). Payments are live: you can browse, choose a
companion, length, day and time and reach the payment screen without paying. If you do complete a payment,
we refund it in full.

Sign-in is by mobile number. Demo accounts use test numbers with fixed codes (no message is sent):
  Member: +91 90000 00101, code in the "Sign-in information" field, then PIN 1234.
  Companion: +91 90000 00102, code in the "Sign-in information" field, then PIN 1234.
Safety: anyone can report or block another person from their profile or the chat (tap ⋯); reports go
to our team (Admin → Reports). The panic button alerts our staff; users are told to call 112 in an emergency.
Account deletion: Profile → Delete account (also https://prsnn.com/delete-account).
```

Create the two review accounts with test phone numbers (docs/GO_LIVE.md, Stage 3) and type their codes
only into the store consoles, never into the repo.

## Listing

**Name:** prsnn · **Subtitle (Apple, 30):** Verified company, in public · **Category:** Lifestyle (Apple) / Social (Play)

**Short description (Play, 80):** Book a verified companion for coffee, walks or events. Platonic, public, safe.

**Promotional text (Apple, 170):** New in town or don't want to go alone? Book an ID-checked companion for an hour or a
day: coffee, walks, events, study. Fixed prices, public places, a panic button in every session.

**Full description:**
```
prsnn is good company, on your terms. Book a verified companion for the everyday plans you'd rather not do alone:
a coffee, a walk, a concert, exploring a new city, studying together, or company for a parent.

• Every companion is approved by our team and ID-checked before their first booking
• Platonic only: not dating, not errands, not therapy. Public places only
• Fixed, clear prices from ₹399 an hour. Pay securely with Razorpay; cancellation and refund rules shown before you pay
• See who's free today, view profiles and photos, and book a length, day and time that suits you
• Chat opens once a booking is confirmed; phone numbers stay hidden
• Report or block anyone, and a panic button in every session that alerts our team
• Want to earn? Become a companion and keep 80% of every booking

For people 18 and over. Available across India.
```

**Keywords (Apple, 100):** companion,friend,company,meetup,new in town,walk,coffee,events,verified,india

## Screenshots

Use the sample-data build (`EXPO_PUBLIC_DEMO=1 npm run web`) at phone size, or the Admin → "View the app as" preview.
Faces in the category photos are AI-generated illustrations: don't present them as real companions in store screenshots.


## Payments and the stores

- **Apple App Store:** Guideline 3.1.3(e) "Goods and Services Outside of the App": apps that sell physical goods or
  services consumed outside the app must use a payment method other than In-App Purchase. prsnn bookings are
  in-person time, so Razorpay is correct, and IAP must **not** be used. Don't sell anything digital (subscriptions,
  boosts, unlocks) with Razorpay; those would need IAP.
- **Google Play:** Payments policy: Play Billing isn't required (and isn't allowed) for physical goods and services.
  Razorpay is fine. Same rule: anything digital would need Play Billing.
- Show the full price before payment (done), a clear refund policy (done, /refunds and in the booking review),
  and don't store card data (Razorpay's checkout page handles it; prsnn never sees card or UPI details).
