import { COMPANION_MEET_OPTIONS, companionMeets } from '@/domain/privacy';

describe('who a companion meets (same rule as the server’s private.meets)', () => {
  it('no choice yet, or Everyone, meets anyone', () => {
    expect(companionMeets(undefined, 'man')).toBe(true);
    expect(companionMeets(null, 'woman')).toBe(true);
    expect(companionMeets('everyone', 'nonbinary')).toBe(true);
    expect(companionMeets('everyone', undefined)).toBe(true);
  });
  it('Women only meets women', () => {
    expect(companionMeets('woman', 'woman')).toBe(true);
    expect(companionMeets('woman', 'man')).toBe(false);
    expect(companionMeets('woman', 'nonbinary')).toBe(false);
  });
  it('a member whose gender isn’t known only fits Everyone', () => {
    expect(companionMeets('man', undefined)).toBe(false);
    expect(companionMeets('man', null)).toBe(false);
  });
  it('offers the four choices, Everyone last', () => {
    expect(COMPANION_MEET_OPTIONS.map((o) => o.value)).toEqual(['woman', 'man', 'nonbinary', 'everyone']);
  });
});
