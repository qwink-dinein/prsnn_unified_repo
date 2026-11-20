'use client';
// Live offers from the database (public.price_offers, callable without signing in). A visitor sees the new-member
// view: the first-hour offer while it's switched on, and a campaign only while the admin is running one. If the call
// fails, nothing is shown and the normal prices stay. Same rules as the app (mobile/src/domain/offers.ts).
import { useEffect, useState } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mhovyhapzhxcmcuelbol.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_EjvwHde8WRvzboJF3JE6LQ_1L5FJdIT';

let pending = null;
/** One request per page load, shared by every component on the page. */
export function fetchOffers() {
  if (!pending) {
    pending = fetch(`${SUPABASE_URL}/rest/v1/rpc/price_offers`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: '{}',
    })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return pending;
}

export function useOffers() {
  const [offers, setOffers] = useState(null);
  useEffect(() => {
    let live = true;
    fetchOffers().then((o) => live && setOffers(o));
    return () => {
      live = false;
    };
  }, []);
  return offers;
}

/** The quote for `h` hours, or null. */
export const quoteFor = (o, h) => o?.prices?.[String(h)] ?? null;
export const hasOffer = (q) => !!q && q.price < q.normal;

/** What a campaign makes `h` hours cost (same as the server), or null when it doesn't cover that length. */
export function campaignPrice(c, h, normal) {
  if (!c || !normal || !c.hours?.includes(h)) return null;
  const p = c.kind === 'percent' ? Math.round((normal * (100 - c.value)) / 100) : Math.min(normal, c.value * h);
  return p < normal ? p : null;
}

export const discountText = (c) => (c.kind === 'percent' ? `${c.value}% off` : `₹${c.value} an hour`);

export function timeLeft(endsAt) {
  const ms = new Date(endsAt).getTime() - Date.now();
  if (ms <= 0) return 'Ended';
  const days = Math.floor(ms / 86_400_000);
  return days < 1 ? 'Ends today' : `${days} ${days === 1 ? 'day' : 'days'} left`;
}

export const endsOn = (endsAt) => new Date(endsAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
