import { bill, campaignError, hasOffer, offerHint, quoteOf, timeLeft, type Campaign } from '@/domain/offers';
import { DEFAULT_PACKAGE_PRICES } from '@/domain/pricing';

const prices = { ...DEFAULT_PACKAGE_PRICES };
const sale: Campaign = { id: 'c', label: 'Diwali offer', headline: '25% off', kind: 'percent', value: 25, audience: 'everyone', hours: [1, 2, 4], endsAt: '2026-11-23T00:00:00Z' };

describe('first-hour offer: first hour ₹99, the rest at the normal price', () => {
  it('1, 2, 4 and 12 hours', () => {
    expect(quoteOf(1, prices, { firstHourPrice: 99, isNew: true })?.price).toBe(99);
    expect(quoteOf(2, prices, { firstHourPrice: 99, isNew: true })).toMatchObject({ price: 399, normal: 699, saving: 300, firstHour: 99, rest: 300, kind: 'first_hour' });
    expect(quoteOf(4, prices, { firstHourPrice: 99, isNew: true })?.price).toBe(999);
    expect(quoteOf(12, prices, { firstHourPrice: 99, isNew: true })?.price).toBe(3299);
  });
  it('members who already booked pay the normal price', () => {
    expect(quoteOf(2, prices, { firstHourPrice: 99, isNew: false })).toMatchObject({ price: 699, kind: null });
  });
  it('the bill spells out the first hour and the rest', () => {
    const q = quoteOf(2, prices, { firstHourPrice: 99, isNew: true })!;
    expect(bill(q)).toEqual([
      { label: 'First hour (offer)', amount: '₹99', was: '₹399', accent: true },
      { label: '1 more hour (normal price)', amount: '₹300' },
    ]);
    expect(bill(quoteOf(4, prices, { firstHourPrice: 99, isNew: true })!)[1].label).toBe('3 more hours (normal price)');
    expect(offerHint(q)).toBe('₹99 + ₹300');
    expect(offerHint(quoteOf(1, prices, { firstHourPrice: 99, isNew: true })!)).toBe('1st hour ₹99');
  });
});

describe('campaigns', () => {
  it('25% off the lengths it covers, not the others', () => {
    expect(quoteOf(2, prices, { isNew: false, campaign: sale })).toMatchObject({ price: 524, kind: 'campaign', label: 'Diwali offer' });
    expect(quoteOf(6, prices, { isNew: false, campaign: sale })).toMatchObject({ price: 1899, kind: null });
  });
  it('a first-timer gets whichever is lower, never both', () => {
    expect(quoteOf(1, prices, { firstHourPrice: 99, isNew: true, campaign: sale })).toMatchObject({ price: 99, kind: 'first_hour' });
    const deep: Campaign = { ...sale, kind: 'per_hour', value: 150, hours: [4] };
    expect(quoteOf(4, prices, { firstHourPrice: 99, isNew: true, campaign: deep })).toMatchObject({ price: 600, kind: 'campaign' });
  });
  it('new-members-only campaigns skip regular members', () => {
    expect(hasOffer(quoteOf(2, prices, { isNew: false, campaign: { ...sale, audience: 'new' } }))).toBe(false);
  });
  it('a price per hour never costs more than the package', () => {
    expect(quoteOf(12, prices, { isNew: false, campaign: { ...sale, kind: 'per_hour', value: 350, hours: [12] } })?.price).toBe(3599);
  });
  it('time left and form checks', () => {
    const now = new Date('2026-11-20T10:00:00Z');
    expect(timeLeft('2026-11-23T10:00:00Z', now)).toBe('3 days left');
    expect(timeLeft('2026-11-20T20:00:00Z', now)).toBe('Ends today');
    const ok = { label: 'Diwali offer', headline: '25% off every booking', kind: 'percent' as const, value: '25', hours: [1, 2], endsAt: '2026-11-23T00:00:00Z' };
    expect(campaignError(ok, 399, now)).toBeNull();
    expect(campaignError({ ...ok, value: '95' }, 399, now)).toMatch(/1 and 90/);
    expect(campaignError({ ...ok, kind: 'per_hour', value: '450' }, 399, now)).toMatch(/below/);
    expect(campaignError({ ...ok, hours: [] }, 399, now)).toMatch(/length/);
  });
});
