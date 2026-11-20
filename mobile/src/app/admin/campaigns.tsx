import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { colors, space } from '@/theme/tokens';
import { Card, EmptyState, ErrorState, Header, Loading, Pill, Screen, Segmented } from '@/components/ui/layout';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/forms';
import { Notice } from '@/components/ui/states';
import { useConfirm } from '@/components/ui/confirm';
import { AdminGate } from '@/components/admin';
import { formatINR } from '@/domain/booking';
import { priceFor } from '@/domain/pricing';
import { campaignDiscountText, type AdminCampaign } from '@/domain/offers';
import { svc, qk } from '@/services';
import { errorMessage } from '@/lib/api';

/** Admin · Campaigns (superadmin): the first-hour offer and time-limited campaigns shown on Home. */
export default function AdminCampaigns() {
  return (
    <AdminGate superOnly>
      <Campaigns />
    </AdminGate>
  );
}

const dateOf = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
const lengths = (h: number[]) => (h.length === 12 ? 'all lengths' : h.map((x) => `${x}h`).join(', '));
const STATUS: Record<AdminCampaign['status'], { label: string; tone: 'success' | 'warning' | 'neutral' }> = {
  running: { label: 'Running', tone: 'success' },
  scheduled: { label: 'Scheduled', tone: 'warning' },
  ended: { label: 'Ended', tone: 'neutral' },
};

function Campaigns() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const q = useQuery({ queryKey: qk.admin.campaigns, queryFn: () => svc.admin.campaigns() });
  const [price, setPrice] = useState<string | null>(null);
  const refresh = () => {
    qc.invalidateQueries({ queryKey: qk.admin.campaigns });
    qc.invalidateQueries({ queryKey: qk.offers });
  };
  const end = useMutation({ mutationFn: (id: string) => svc.admin.endCampaign(id), onSuccess: refresh, onError: (e) => void confirm({ title: 'Couldn’t end it', message: errorMessage(e) }) });
  const first = useMutation({
    mutationFn: (v: { on: boolean; price: number }) => svc.admin.setFirstHourOffer(v.on, v.price),
    onSuccess: () => {
      setPrice(null);
      refresh();
    },
  });

  const tabs = <Segmented options={[{ value: 'prices', label: 'Prices' }, { value: 'campaigns', label: 'Campaigns' }]} value="campaigns" onChange={(v) => v === 'prices' && router.replace('/admin/prices')} />;

  if (q.isLoading) return <Loading />;
  if (q.isError || !q.data)
    return (
      <Screen>
        <Header title="Campaigns" />
        <ErrorState message={errorMessage(q.error)} onRetry={() => q.refetch()} />
      </Screen>
    );
  const { firstHour: fh, campaigns } = q.data;
  const live = campaigns.filter((c) => c.status !== 'ended');
  const ended = campaigns.filter((c) => c.status === 'ended');
  const one = priceFor(1) ?? 399;
  const draft = price ?? String(fh.price);

  return (
    <Screen footer={<Button label="New campaign" icon="plus" onPress={() => router.push('/admin/campaign')} />}>
      <Header title="Prices" />
      {tabs}

      <Text variant="headline" style={styles.h}>
        First-hour offer
      </Text>
      <Card style={{ gap: space.sm }}>
        <View style={styles.row}>
          <Text variant="headline">{fh.on ? `On · first hour ${formatINR(fh.price)}` : 'Off'}</Text>
          <Pill label={fh.on ? 'Always on' : 'Off'} tone={fh.on ? 'success' : 'neutral'} />
        </View>
        <Text variant="footnote" muted>
          New members only: their first hour costs {formatINR(fh.price)}, the rest is at the normal price ({formatINR(one - fh.price)} off the first booking). Companions keep their usual share.
        </Text>
        <Text variant="footnote" muted>
          {fh.bookings} paid first bookings · {formatINR(fh.discount)} discount given
        </Text>
        <TextField label="First-hour price (₹)" value={draft} onChangeText={(v) => setPrice(v.replace(/\D/g, ''))} keyboardType="number-pad" maxLength={4} />
        {first.isError ? <Notice tone="danger" text={errorMessage(first.error)} /> : null}
        <View style={styles.row}>
          <Button
            label={fh.on ? 'Turn off' : 'Turn on'}
            variant="secondary"
            compact
            loading={first.isPending && first.variables?.on !== fh.on}
            onPress={() => first.mutate({ on: !fh.on, price: Number(draft) || fh.price })}
          />
          {price !== null && Number(price) !== fh.price ? <Button label="Save price" compact loading={first.isPending} onPress={() => first.mutate({ on: fh.on, price: Number(price) })} /> : null}
        </View>
      </Card>

      <Text variant="headline" style={styles.h}>
        Campaigns
      </Text>
      {!live.length ? (
        <EmptyState icon="sparkle" title="No campaign running" body="Start one to show a banner on Home and lower prices for a few days. One campaign runs at a time." />
      ) : (
        live.map((c) => (
          <CampaignCard
            key={c.id}
            c={c}
            onEdit={() => router.push({ pathname: '/admin/campaign', params: { id: c.id } })}
            onEnd={async () => {
              if (await confirm({ title: `End “${c.label}” now?`, message: 'The Home banner disappears and new bookings go back to normal prices. Bookings already made keep their price.', confirmLabel: 'End now', destructive: true })) end.mutate(c.id);
            }}
            ending={end.isPending && end.variables === c.id}
          />
        ))
      )}

      {ended.length ? (
        <>
          <Text variant="footnote" muted style={[styles.h, { letterSpacing: 1 }]}>
            ENDED
          </Text>
          {ended.map((c) => (
            <CampaignCard key={c.id} c={c} />
          ))}
        </>
      ) : null}
    </Screen>
  );
}

function CampaignCard({ c, onEdit, onEnd, ending }: { c: AdminCampaign; onEdit?: () => void; onEnd?: () => void; ending?: boolean }) {
  const s = STATUS[c.status];
  return (
    <Card style={{ gap: 4, marginBottom: space.sm, opacity: c.status === 'ended' ? 0.75 : 1, borderWidth: c.status === 'running' ? 1.5 : 0, borderColor: colors.champagne }}>
      <View style={styles.row}>
        <Text variant="headline" style={{ flex: 1 }} numberOfLines={1}>
          {c.label}
        </Text>
        <Pill label={s.label} tone={s.tone} />
      </View>
      <Text variant="footnote" muted>
        {c.headline}
      </Text>
      <Text variant="footnote" muted>
        {campaignDiscountText(c)} · {c.audience === 'new' ? 'new members' : 'everyone'} · {lengths(c.hours)}
      </Text>
      <Text variant="footnote" muted>
        {dateOf(c.startsAt)} – {dateOf(c.endedAt ?? c.endsAt)} · {c.bookings} bookings · {formatINR(c.discount)} discount
      </Text>
      {onEdit && onEnd ? (
        <View style={[styles.row, { marginTop: space.sm }]}>
          <Button label="Edit" variant="secondary" compact onPress={onEdit} />
          <Button label="End now" variant="secondary" compact textColor={colors.danger} loading={ending} onPress={onEnd} />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  h: { marginTop: space.xl, marginBottom: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
});
