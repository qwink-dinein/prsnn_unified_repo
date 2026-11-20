import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { colors, radius, space } from '@/theme/tokens';
import { fonts } from '@/theme/fonts';
import { svc, qk } from '@/services';
import { formatINR } from '@/domain/booking';
import { campaignDiscountText, hasOffer, quoteFor, timeLeft, type Campaign, type PriceOffers } from '@/domain/offers';
import { Text } from './ui/Text';
import { Button } from './ui/Button';

/**
 * Today's prices for this person (first-hour offer for new members, a running campaign). Shared by Home,
 * the companion page and checkout. If it can't load, everything falls back to the normal prices and the
 * server still charges the right amount, so failures are quiet.
 */
export function useOffers() {
  return useQuery<PriceOffers>({ queryKey: qk.offers, queryFn: () => svc.priceOffers(), staleTime: 60_000, retry: 1 });
}

const EXAMPLES = [1, 2, 4];

function Example({ hours, was, now, dark }: { hours: number; was: number; now: number; dark?: boolean }) {
  return (
    <View style={[styles.ex, { backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)' }]}>
      <Text variant="caption" color={dark ? colors.gray200 : colors.midnight} style={{ fontFamily: fonts.semibold }}>
        {hours} {hours === 1 ? 'hour' : 'hours'}
      </Text>
      <Text variant="caption" color={dark ? colors.gray400 : colors.gray500} style={styles.strike}>
        {formatINR(was)}
      </Text>
      <Text style={[styles.exNow, { color: dark ? colors.white : colors.midnight }]}>{formatINR(now)}</Text>
    </View>
  );
}

/** Home, members with no booking yet: "Your first hour for just ₹99", extra hours at the normal price. */
export function FirstHourCard({ style }: { style?: object }) {
  const q = useOffers();
  const fh = q.data?.firstHour;
  if (!fh) return null;
  const one = fh.price + fh.saving;
  const examples = EXAMPLES.map((h) => quoteFor(q.data, h)).filter((x) => x && x.kind === 'first_hour');
  return (
    <View
      style={[styles.first, style]}
      accessible
      accessibilityLabel={`First booking offer. Your first hour is ${formatINR(fh.price)} instead of ${formatINR(one)}. Extra hours are at the normal price.`}
    >
      <View style={styles.pill}>
        <Text variant="caption" color={colors.midnight} style={styles.pillText}>
          FIRST BOOKING OFFER
        </Text>
      </View>
      <Text variant="title2" color={colors.white} style={{ marginTop: space.sm }}>
        Your first hour for just {formatINR(fh.price)}
      </Text>
      <View style={styles.priceRow}>
        <Text variant="headline" color={colors.gray400} style={styles.strike}>
          {formatINR(one)}
        </Text>
        <Text style={styles.big}>{formatINR(fh.price)}</Text>
        <Text variant="subhead" color={colors.gray200}>
          for the first hour
        </Text>
      </View>
      <Text variant="footnote" color={colors.gray200}>
        On your first booking. Extra hours are at the normal price.
      </Text>
      {examples.length ? (
        <View style={styles.exRow}>
          {examples.map((x) => (
            <Example key={x!.hours} hours={x!.hours} was={x!.normal} now={x!.price} dark />
          ))}
        </View>
      ) : null}
      <Button label="Find a companion" iconRight="arrowRight" onPress={() => router.push('/search')} style={{ marginTop: space.md }} backgroundColor={colors.champagne} textColor={colors.midnight} />
    </View>
  );
}

/** Home, while an admin campaign runs: label, headline, days left, crossed-out prices. */
export function CampaignBanner({ style }: { style?: object }) {
  const q = useOffers();
  const c = q.data?.campaign;
  if (!c) return null;
  const examples = c.hours
    .filter((h) => EXAMPLES.includes(h))
    .map((h) => quoteFor(q.data, h))
    .filter((x): x is NonNullable<typeof x> => hasOffer(x) && x.kind === 'campaign')
    .map((x) => ({ hours: x.hours, was: x.normal, now: x.price }));
  return <CampaignBannerView campaign={c} examples={examples} style={style} onPress={() => router.push('/search')} />;
}

/** The banner itself, also used by Admin → New campaign as a live preview. */
export function CampaignBannerView({ campaign: c, examples, style, onPress }: { campaign: Campaign; examples: { hours: number; was: number; now: number }[]; style?: object; onPress?: () => void }) {
  return (
    <View style={[styles.camp, style]} accessible={!onPress} accessibilityLabel={`${c.label}. ${c.headline}. ${timeLeft(c.endsAt)}.`}>
      <View style={styles.campTop}>
        <View style={[styles.pill, { backgroundColor: colors.midnight }]}>
          <Text variant="caption" color={colors.champagne} style={styles.pillText}>
            {c.label.toUpperCase()}
          </Text>
        </View>
        <Text variant="caption" color={colors.midnight} style={{ fontFamily: fonts.bold }}>
          {timeLeft(c.endsAt)}
        </Text>
      </View>
      <Text variant="title2" color={colors.midnight} style={{ marginTop: space.sm }}>
        {c.headline}
      </Text>
      <Text variant="footnote" color={colors.midnight} style={{ marginTop: 2 }}>
        {campaignDiscountText(c)}
        {c.audience === 'new' ? ' · new members' : ''} · ends {new Date(c.endsAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · price locked when you book
      </Text>
      {examples.length ? (
        <View style={styles.exRow}>
          {examples.map((x) => (
            <Example key={x.hours} hours={x.hours} was={x.was} now={x.now} />
          ))}
        </View>
      ) : null}
      <Button label="Book with the offer" iconRight="arrowRight" onPress={onPress} disabled={!onPress} style={{ marginTop: space.md }} />
    </View>
  );
}

const styles = StyleSheet.create({
  first: { backgroundColor: colors.midnight, borderRadius: radius.xl, padding: space.lg },
  camp: { backgroundColor: colors.champagne, borderRadius: radius.xl, padding: space.lg },
  campTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pill: { alignSelf: 'flex-start', paddingHorizontal: space.sm, height: 24, borderRadius: 12, backgroundColor: colors.champagne, justifyContent: 'center' },
  pillText: { fontFamily: fonts.bold, letterSpacing: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: space.sm, marginTop: space.sm, flexWrap: 'wrap' },
  big: { fontFamily: fonts.number, fontSize: 32, color: colors.champagne, letterSpacing: -0.5 },
  strike: { textDecorationLine: 'line-through' },
  exRow: { flexDirection: 'row', gap: space.xs, marginTop: space.md },
  ex: { flex: 1, borderRadius: radius.md, paddingVertical: space.xs + 2, paddingHorizontal: space.sm },
  exNow: { fontFamily: fonts.number, fontSize: 17 },
});
