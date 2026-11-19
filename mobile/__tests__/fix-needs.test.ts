import { fixNeeds, parseReasons } from '@/domain/verification';

describe('Fix and resubmit: what we ask for', () => {
  it('a photo request always needs a new photo', () => {
    expect(fixNeeds('photo', 'user', 'changes_requested')).toEqual({ profile: false, photo: true, area: false });
  });
  it('a companion profile request asks for the photo only when it was flagged', () => {
    expect(fixNeeds('profile', 'companion', 'approved', ['bio']).photo).toBe(false);
    expect(fixNeeds('profile', 'companion', 'changes_requested', ['bio']).photo).toBe(true);
    expect(fixNeeds('profile', 'companion', 'approved', ['photo']).photo).toBe(true);
  });
  it('“Wrong area or city” shows city and area', () => {
    expect(fixNeeds('profile', 'companion', 'approved', ['area']).area).toBe(true);
    expect(fixNeeds('profile', 'companion', 'approved', ['bio']).area).toBe(false);
    expect(fixNeeds('photo', 'user', 'changes_requested', ['area']).area).toBe(false);
  });
  it('reads reasons from the route safely', () => {
    expect(parseReasons('photo,area')).toEqual(['photo', 'area']);
    expect(parseReasons(['bio', 'x'])).toEqual(['bio']);
    expect(parseReasons(undefined)).toEqual([]);
  });
});
