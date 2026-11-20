'use client';
import StoreButtons from './StoreButtons';
import { campaignPrice, discountText, endsOn, quoteFor, timeLeft, useOffers } from '../_lib/offers';

const EXAMPLES = [1, 2, 4];
const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const hrs = (h) => `${h} ${h === 1 ? 'hour' : 'hours'}`;

function Examples({ items, dark }) {
  if (!items.length) return null;
  return (
    <div className="s-offer-ex">
      {items.map((x) => (
        <div key={x.h} className={dark ? 's-offer-ex-dark' : ''}>
          <small>{hrs(x.h)}</small>
          <s>{inr(x.was)}</s>
          <b>{inr(x.now)}</b>
          {x.hint ? <em>{x.hint}</em> : null}
        </div>
      ))}
    </div>
  );
}

/**
 * Home, right under the hero: the running campaign (if any) and the first-hour offer (while it's on).
 * Renders nothing when neither is active, so the page looks exactly as before.
 */
export default function OfferCards() {
  const o = useOffers();
  const c = o?.campaign;
  const fh = o?.firstHour;
  if (!c && !fh) return null;

  const normal = (h) => quoteFor(o, h)?.normal;
  const campaignItems = c
    ? EXAMPLES.map((h) => ({ h, was: normal(h), now: campaignPrice(c, h, normal(h)) })).filter((x) => x.was && x.now)
    : [];
  const firstItems = fh
    ? EXAMPLES.map((h) => ({ h, was: normal(h), now: normal(h) - fh.saving, hint: h === 1 ? 'first hour' : `${inr(fh.price)} + ${inr(normal(h) - fh.saving - fh.price)}` })).filter((x) => x.was)
    : [];

  return (
    <section id="offers" className="s-offers" aria-label="Offers">
      <div className="s-wrap s-offers-grid">
        {c ? (
          <article className="s-offer s-offer-camp">
            <div className="s-offer-top">
              <span className="s-offer-pill s-offer-pill-dark">{c.label}</span>
              <span className="s-offer-left">⏳ {timeLeft(c.endsAt)}</span>
            </div>
            <h2>{c.headline}</h2>
            <p>
              {discountText(c)}
              {c.audience === 'new' ? ' for new members' : ''} · ends {endsOn(c.endsAt)} · the price is locked when you book
            </p>
            <Examples items={campaignItems} />
            <StoreButtons />
          </article>
        ) : null}
        {fh ? (
          <article className="s-offer s-offer-first">
            <span className="s-offer-pill">First booking offer</span>
            <h2>Your first hour for just {inr(fh.price)}</h2>
            <p className="s-offer-price">
              <s>{inr(fh.price + fh.saving)}</s> <b>{inr(fh.price)}</b> for the first hour
            </p>
            <p>On your first booking in the app. Extra hours are at the normal price.</p>
            <Examples items={firstItems} dark />
            <StoreButtons light />
          </article>
        ) : null}
      </div>
    </section>
  );
}
