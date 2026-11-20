import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { space } from '@/theme/tokens';
import { Chip, ErrorState, Header, Loading, Screen, Segmented } from '@/components/ui/layout';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/forms';
import { Notice } from '@/components/ui/states';
import { AdminGate } from '@/components/admin';
import { CampaignBannerView } from '@/components/OfferBanners';
import { ALL_HOURS, pricing } from '@/domain/pricing';
import { campaignError, quoteOf, type Campaign } from '@/domain/offers';
import { svc, qk } from '@/services';
import { errorMessage } from '@/lib/api';

/** Admin · New / edit campaign (superadmin), with a live preview of the Home banner. */
export default function AdminCampaign() {
  return (
    <AdminGate superOnly>
      <Form />
    </AdminGate>
  );
}

const DAY = 86_400_000;
const ENDS = [
  { label: '3 days', days: 3 },
  { label: '1 week', days: 7 },
  { label: '2 weeks', days: 14 },
  { label: '1 month', days: 30 },
];
const isoDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
/** "2026-11-23" → the end of that day, local time. */
const endOfDay = (s: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 23, 59, 0).toISOString() : '';
};

function Form() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const qc = useQueryClient();
  const list = useQuery({ queryKey: qk.admin.campaigns, queryFn: () => svc.admin.campaigns(), enabled: !!id });
  const existing = id ? list.data?.campaigns.find((c) => c.id === id) : undefined;

  if (id && list.isLoading) return <Loading />;
  if (id && (list.isError || !existing))
    return (
      <Screen>
        <Header title="Edit campaign" />
        <ErrorState message={list.isError ? errorMessage(list.error) : 'Campaign not found.'} onRetry={() => list.refetch()} />
      </Screen>
    );
  return <Editor key={existing?.id ?? 'new'} existing={existing} onDone={() => {
    qc.invalidateQueries({ queryKey: qk.admin.campaigns });
    qc.invalidateQueries({ queryKey: qk.offers });
    router.back();
  }} />;
}

function Editor({ existing, onDone }: { existing?: Campaign & { startsAt: string }; onDone: () => void }) {
  const [label, setLabel] = useState(existing?.label ?? '');
  const [headline, setHeadline] = useState(existing?.headline ?? '');
  const [kind, setKind] = useState<'percent' | 'per_hour'>(existing?.kind ?? 'percent');
  const [value, setValue] = useState(existing ? String(existing.value) : '');
  const [audience, setAudience] = useState<'everyone' | 'new'>(existing?.audience ?? 'everyone');
  const [hours, setHours] = useState<number[]>(existing?.hours ?? [...ALL_HOURS]);
  // Captured once, so quick end choices don't shift while the form is open.
  const [today] = useState(() => Date.now());
  const [ends, setEnds] = useState(() => (existing ? isoDate(new Date(existing.endsAt)) : isoDate(new Date(today + 7 * DAY))));
  const [tried, setTried] = useState(false);

  const endsAt = endOfDay(ends);
  const one = pricing().packagePrices[1];
  const problem = campaignError({ label, headline, kind, value, hours, endsAt: endsAt || 'x' }, one);
  const save = useMutation({
    mutationFn: () =>
      svc.admin.saveCampaign({ id: existing?.id, label: label.trim(), headline: headline.trim(), kind, value: Number(value), audience, hours, startsAt: existing?.startsAt, endsAt }),
    onSuccess: onDone,
  });

  const preview: Campaign | null = !problem ? { id: 'preview', label: label.trim(), headline: headline.trim(), kind, value: Number(value), audience, hours, endsAt } : null;
  const examples = preview
    ? [1, 2, 4]
        .filter((h) => hours.includes(h))
        .map((h) => quoteOf(h, pricing().packagePrices, { isNew: true, campaign: preview }))
        .filter((x): x is NonNullable<typeof x> => !!x && x.kind === 'campaign')
        .map((x) => ({ hours: x.hours, was: x.normal, now: x.price }))
    : [];

  return (
    <Screen
      footer={
        <Button
          label={existing ? 'Save changes' : 'Start campaign'}
          loading={save.isPending}
          haptic
          onPress={() => {
            setTried(true);
            if (!problem) save.mutate();
          }}
        />
      }
    >
      <Header title={existing ? 'Edit campaign' : 'New campaign'} />
      <View style={{ gap: space.md }}>
        <TextField label="Label on Home" value={label} onChangeText={setLabel} maxLength={30} placeholder="Diwali offer" />
        <TextField label="Headline" value={headline} onChangeText={setHeadline} maxLength={80} placeholder="25% off every booking" />

        <Text variant="footnote" muted style={styles.cap}>
          DISCOUNT
        </Text>
        <Segmented options={[{ value: 'percent', label: '% off' }, { value: 'per_hour', label: 'Price per hour' }]} value={kind} onChange={setKind} />
        <TextField
          label={kind === 'percent' ? 'Percent off' : 'Price per hour (₹)'}
          value={value}
          onChangeText={(v) => setValue(v.replace(/\D/g, ''))}
          keyboardType="number-pad"
          maxLength={kind === 'percent' ? 2 : 4}
          hint={kind === 'per_hour' ? `Below the normal 1-hour price (₹${one}). Longer packages never cost more than normal.` : undefined}
        />

        <Text variant="footnote" muted style={styles.cap}>
          WHO AND WHICH LENGTHS
        </Text>
        <Segmented options={[{ value: 'everyone', label: 'Everyone' }, { value: 'new', label: 'New members only' }]} value={audience} onChange={setAudience} />
        <View style={styles.wrap}>
          {ALL_HOURS.map((h) => (
            <Chip key={h} label={`${h}h`} selected={hours.includes(h)} onPress={() => setHours(hours.includes(h) ? hours.filter((x) => x !== h) : [...hours, h].sort((a, b) => a - b))} />
          ))}
        </View>

        <Text variant="footnote" muted style={styles.cap}>
          ENDS
        </Text>
        <View style={styles.wrap}>
          {ENDS.map((e) => (
            <Chip key={e.label} label={e.label} selected={ends === isoDate(new Date(today + e.days * DAY))} onPress={() => setEnds(isoDate(new Date(today + e.days * DAY)))} />
          ))}
        </View>
        <TextField label="End date (YYYY-MM-DD, ends at 11:59 pm)" value={ends} onChangeText={setEnds} maxLength={10} autoCapitalize="none" />
        <Text variant="footnote" muted>
          {existing ? 'Start date stays as it is.' : 'Starts now.'} Only one campaign runs at a time. Members always get the lowest price (never this and the first-hour offer together), and the price is locked when they book.
        </Text>

        <Notice tone="info" text="Companions are paid their usual share of the full price. prsnn pays the discount." />
        {tried && problem ? <Notice tone="warning" text={problem} /> : null}
        {save.isError ? <Notice tone="danger" text={errorMessage(save.error)} /> : null}

        <Text variant="footnote" muted style={styles.cap}>
          PREVIEW ON HOME
        </Text>
        {preview ? <CampaignBannerView campaign={preview} examples={examples} /> : <Text variant="footnote" muted>Fill in the label, headline, discount and end date to see the banner.</Text>}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cap: { letterSpacing: 1, marginTop: space.sm },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
});
