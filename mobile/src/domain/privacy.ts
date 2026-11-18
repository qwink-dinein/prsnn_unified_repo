import type { Gender, SeeGender, Visibility } from './types';

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'nonbinary', label: 'Non-binary' },
];

export const SEE_OPTIONS: { value: SeeGender; label: string }[] = [
  { value: 'woman', label: 'Women' },
  { value: 'man', label: 'Men' },
  { value: 'nonbinary', label: 'Non-binary people' },
  { value: 'everyone', label: 'Everyone' },
];

/**
 * Owner's rule (18 Nov): everyone starts open, because a visible photo drives trust and bookings.
 * Choosing "Locked" first shows the photo nudge (components/PhotoNudge). The gender argument is kept
 * so callers don't change if the rule ever differs by gender again.
 */
export const defaultVisibility = (_g?: Gender | null): Visibility => 'open';

export const VISIBILITY_COPY: Record<Visibility, { title: string; body: string }> = {
  open: { title: 'Open', body: 'Everyone' },
  locked: { title: 'Locked', body: 'Only people you’ve booked with' },
};

/** Companion sign-up and Privacy: who a companion is comfortable meeting (they can find and book them). */
export const COMPANION_MEET_OPTIONS: { value: SeeGender; label: string; body?: string }[] = [
  { value: 'woman', label: 'Women' },
  { value: 'man', label: 'Men' },
  { value: 'nonbinary', label: 'Non-binary people' },
  { value: 'everyone', label: 'Everyone', body: 'More members can book you' },
];

/**
 * Same rule as the server's private.meets: a companion with no choice, or "everyone", meets anyone;
 * otherwise only members of that gender (a member whose gender isn't known doesn't fit).
 */
export const companionMeets = (companionSee: SeeGender | null | undefined, memberGender: Gender | null | undefined) =>
  !companionSee || companionSee === 'everyone' || (!!memberGender && companionSee === memberGender);

export const seeLabel = (s?: SeeGender | null) => SEE_OPTIONS.find((o) => o.value === s)?.label ?? 'Everyone';

/**
 * Has this person finished the gender / show-me / visibility step?
 * Companions aren't asked "show me" (they don't browse), so they only need
 * gender and visibility — otherwise every companion login looped back to setup.
 */
export const hasIdentity = (u?: { role?: string; gender?: Gender; seeGender?: SeeGender; profileVisibility?: Visibility } | null) =>
  // Staff working in Admin skip these questions (domain/setup needsSetup); in Booking they answer them like anyone.
  !!(u?.gender && u?.profileVisibility && (u.role === 'companion' || u.seeGender));
