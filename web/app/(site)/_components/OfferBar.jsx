'use client';
import Link from 'next/link';
import { useOffers, timeLeft } from '../_lib/offers';

/** Across the top of every page, only while the admin is running a campaign. Nothing otherwise. */
export default function OfferBar() {
  const c = useOffers()?.campaign;
  if (!c) return null;
  return (
    <div className="s-offerbar" role="region" aria-label="Current offer">
      <div className="s-wrap s-offerbar-in">
        <span className="s-offerbar-tag">{c.label}</span>
        <span className="s-offerbar-text">{c.headline}</span>
        <span className="s-offerbar-left">{timeLeft(c.endsAt)}</span>
        <Link href="/#offers" className="s-offerbar-cta">See the offer →</Link>
      </div>
    </div>
  );
}
