'use client';
import { hasOffer, quoteFor, useOffers } from '../_lib/offers';

const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/**
 * A price that shows the live offer when one applies: the normal price crossed out, the offer price, and a short
 * "how it adds up" ("first booking · ₹99 + ₹300", or the campaign label). Without an offer: just the normal price.
 */
export default function OfferPrice({ hours, normal, hint = true }) {
  const o = useOffers();
  const q = quoteFor(o, hours);
  if (!hasOffer(q)) return <>{inr(normal)}</>;
  const how = q.kind === 'first_hour' ? `first booking · ${q.rest ? `${inr(q.firstHour)} + ${inr(q.rest)}` : 'first hour'}` : q.label;
  return (
    <span className="s-offerprice">
      <s>{inr(q.normal)}</s> {inr(q.price)}
      {hint && how ? <small>{how}</small> : null}
    </span>
  );
}
