/**
 * First-hour offer and admin campaigns (owner, 20 Nov). The server decides the price (private.quote and
 * price_offers); this file mirrors the same rule for sample mode and tests, and turns a quote into the
 * lines members see. Rule: the member pays the lowest of the normal price, the first-hour offer (first hour
 * at the offer price, every other hour at the normal price) and a running campaign, never both discounts.
 */
export type OfferKind = 'first_hour' | 'campaign';

export interface PriceQuote {
  hours: number;
  normal: number;
  price: number;
  saving: number;
  kind: OfferKind | null;
  label: string | null;
  /** First-hour offer only: the first hour's price and what the other hours cost at the normal price. */
  firstHour?: number | null;
  rest?: number | null;
}

export interface Campaign {
  id: string;
  label: string;
  headline: string;
  kind: 'percent' | 'per_hour';
  value: number;
  audience: 'everyone' | 'new';
  hours: number[];
  endsAt: string;
}

export interface PriceOffers {
  firstHour: { price: number; saving: number } | null;
  campaign: Campaign | null;
  prices: Record<string, PriceQuote | null>;
}

export interface AdminCampaign extends Campaign {
  startsAt: string;
  endedAt: string | null;
  status: 'running' | 'scheduled' | 'ended';
  bookings: number;
  discount: number;
}

export interface AdminCampaigns {
  firstHour: { on: boolean; price: number; bookings: number; discount: number };
  campaigns: AdminCampaign[];
}

/** Same as the server's private.quote. `prices` are the package prices (hours → rupees). */
export function quoteOf(
  hours: number,
  prices: Record<number, number>,
  opts: { firstHourPrice?: number | null; isNew: boolean; campaign?: Campaign | null },
): PriceQuote | null {
  const normal = prices[hours];
  const one = prices[1];
  if (!normal || !one) return null;
  let best = normal;
  let kind: OfferKind | null = null;
  let label: string | null = null;
  const fhp = opts.firstHourPrice;
  if (opts.isNew && fhp != null && fhp > 0 && fhp < one) {
    const p = normal - (one - fhp);
    if (p < best) {
      best = p;
      kind = 'first_hour';
      label = 'First hour offer';
    }
  }
  const c = opts.campaign;
  if (c && c.hours.includes(hours) && (c.audience === 'everyone' || opts.isNew)) {
    const p = c.kind === 'percent' ? Math.round((normal * (100 - c.value)) / 100) : Math.min(normal, c.value * hours);
    if (p < best) {
      best = p;
      kind = 'campaign';
      label = c.label;
    }
  }
  return {
    hours,
    normal,
    price: best,
    saving: normal - best,
    kind,
    label,
    firstHour: kind === 'first_hour' ? fhp : null,
    rest: kind === 'first_hour' && fhp != null ? best - fhp : null,
  };
}

export const quoteFor = (offers: PriceOffers | null | undefined, hours: number): PriceQuote | null => offers?.prices?.[String(hours)] ?? null;

export const hasOffer = (q: PriceQuote | null | undefined): q is PriceQuote => !!q && q.price < q.normal;

const rs = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const hrs = (n: number) => `${n} ${n === 1 ? 'hour' : 'hours'}`;

/** The short "how it adds up" under a price card: "₹99 + ₹300", "1st hour ₹99", "25% off". */
export function offerHint(q: PriceQuote, campaign?: Campaign | null): string | null {
  if (!hasOffer(q)) return null;
  if (q.kind === 'first_hour') return q.rest ? `${rs(q.firstHour ?? 0)} + ${rs(q.rest)}` : `1st hour ${rs(q.firstHour ?? 0)}`;
  if (campaign) return campaignDiscountText(campaign);
  return `${rs(q.saving)} off`;
}

/** Checkout lines, so nobody expects ₹99 for two hours. */
export function bill(q: PriceQuote): { label: string; amount: string; was?: string; accent?: boolean }[] {
  if (q.kind === 'first_hour' && q.firstHour != null) {
    const lines: { label: string; amount: string; was?: string; accent?: boolean }[] = [
      { label: 'First hour (offer)', amount: rs(q.firstHour), was: rs(q.firstHour + q.saving), accent: true },
    ];
    const more = q.hours - 1;
    if (more > 0) lines.push({ label: `${more} more ${more === 1 ? 'hour' : 'hours'} (normal price)`, amount: rs(q.rest ?? 0) });
    return lines;
  }
  if (q.kind === 'campaign' && hasOffer(q)) {
    return [
      { label: `${hrs(q.hours)} (normal price)`, amount: rs(q.normal) },
      { label: q.label ?? 'Offer', amount: `− ${rs(q.saving)}`, accent: true },
    ];
  }
  return [{ label: hrs(q.hours), amount: rs(q.price) }];
}

export const campaignDiscountText = (c: Pick<Campaign, 'kind' | 'value'>) => (c.kind === 'percent' ? `${c.value}% off` : `${rs(c.value)} an hour`);

/** "Ends today", "1 day left", "3 days left". */
export function timeLeft(endsAt: string, now = new Date()): string {
  const ms = new Date(endsAt).getTime() - now.getTime();
  if (ms <= 0) return 'Ended';
  const days = Math.floor(ms / 86_400_000);
  if (days < 1) return 'Ends today';
  return `${days} ${days === 1 ? 'day' : 'days'} left`;
}

/** Admin form checks (the server checks again). */
export function campaignError(f: { label: string; headline: string; kind: 'percent' | 'per_hour'; value: string; hours: number[]; endsAt: string }, oneHourPrice: number, now = new Date()): string | null {
  if (f.label.trim().length < 2 || f.label.trim().length > 30) return 'Add a short label (2 to 30 characters).';
  if (f.headline.trim().length < 4 || f.headline.trim().length > 80) return 'Add a headline (4 to 80 characters).';
  if (!/^\d+$/.test(f.value)) return 'Enter the discount as a whole number.';
  const v = Number(f.value);
  if (f.kind === 'percent' && (v < 1 || v > 90)) return 'Percent off must be between 1 and 90.';
  if (f.kind === 'per_hour' && (v < 1 || v >= oneHourPrice)) return `The price per hour must be below the normal 1-hour price (${rs(oneHourPrice)}).`;
  if (!f.hours.length) return 'Choose at least one length.';
  const end = new Date(f.endsAt);
  if (Number.isNaN(end.getTime()) || end <= now) return 'Choose an end date in the future.';
  return null;
}
