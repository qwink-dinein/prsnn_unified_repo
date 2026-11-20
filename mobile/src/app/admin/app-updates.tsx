import { useState } from 'react';
import { View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { space } from '@/theme/tokens';
import { Card, ErrorState, Header, Loading, Screen } from '@/components/ui/layout';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/forms';
import { Notice } from '@/components/ui/states';
import { useConfirm } from '@/components/ui/confirm';
import { AdminGate } from '@/components/admin';
import { ruleError, type AppUpdateSettings, type Platform } from '@/domain/appUpdate';
import { installedApp } from '@/lib/appUpdate';
import { svc, qk } from '@/services';
import { errorMessage } from '@/lib/api';

/** Admin · App updates (superadmin): the oldest version allowed to open, per platform (force update). */
export default function AdminAppUpdates() {
  return (
    <AdminGate superOnly>
      <Updates />
    </AdminGate>
  );
}

type Draft = Record<Platform, { minVersion: string; minBuild: string; url: string }> & { message: string };
const draftOf = (s: AppUpdateSettings | null): Draft => ({
  android: { minVersion: s?.android?.minVersion ?? '', minBuild: s?.android?.minBuild ? String(s.android.minBuild) : '', url: s?.android?.url ?? '' },
  ios: { minVersion: s?.ios?.minVersion ?? '', minBuild: s?.ios?.minBuild ? String(s.ios.minBuild) : '', url: s?.ios?.url ?? '' },
  message: s?.message ?? '',
});

function Updates() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const q = useQuery({ queryKey: qk.appUpdate, queryFn: () => svc.appUpdate(), staleTime: 0 });
  const [edit, setEdit] = useState<Draft | null>(null);
  const d = edit ?? (q.isSuccess ? draftOf(q.data) : null);
  const save = useMutation({
    mutationFn: (v: Draft) =>
      svc.admin.setAppUpdate({
        android: { minVersion: v.android.minVersion.trim() || null, minBuild: Number(v.android.minBuild) || 0, url: v.android.url.trim() || null },
        ios: { minVersion: v.ios.minVersion.trim() || null, minBuild: Number(v.ios.minBuild) || 0, url: v.ios.url.trim() || null },
        message: v.message.trim() || null,
      }),
    onSuccess: () => {
      setEdit(null);
      qc.invalidateQueries({ queryKey: qk.appUpdate });
    },
  });

  if (q.isLoading) return <Loading />;
  if (q.isError || !d)
    return (
      <Screen>
        <Header title="App updates" />
        <ErrorState message={errorMessage(q.error)} onRetry={() => q.refetch()} />
      </Screen>
    );

  const me = installedApp();
  const problem = ruleError(d.android) ?? ruleError(d.ios);
  const set = (os: Platform, p: Partial<Draft[Platform]>) => setEdit({ ...d, [os]: { ...d[os], ...p } });

  return (
    <Screen
      footer={
        <Button
          label="Save"
          loading={save.isPending}
          disabled={!!problem || !edit}
          onPress={async () => {
            if (
              await confirm({
                title: 'Require this version?',
                message: 'Phones with an older app will be stopped on an “Update required” screen until they update. Only do this once the new version is live in the store for everyone, or people won’t be able to update.',
                confirmLabel: 'Save',
              })
            )
              save.mutate(d);
          }}
        />
      }
    >
      <Header title="App updates" />
      <View style={{ gap: space.lg }}>
        <Text variant="footnote" muted>
          Every time the app opens, it checks these. iPhones also check the App Store by themselves, so a new App Store version is required automatically. Android: after a new version is live on the Play Store, enter it here.
        </Text>
        <Text variant="footnote" muted>
          This phone: {me.version ? `version ${me.version}${me.build != null ? ` (build ${me.build})` : ''}` : 'not an installed app (web or Expo Go), never blocked'}
        </Text>

        {(['android', 'ios'] as Platform[]).map((os) => (
          <Card key={os} style={{ gap: space.sm }}>
            <Text variant="headline">{os === 'android' ? 'Android' : 'iPhone'}</Text>
            <TextField label="Oldest version allowed (e.g. 1.0.3)" value={d[os].minVersion} onChangeText={(v) => set(os, { minVersion: v.replace(/[^\d.]/g, '') })} keyboardType="decimal-pad" maxLength={12} />
            <TextField label="Oldest build allowed (optional)" value={d[os].minBuild} onChangeText={(v) => set(os, { minBuild: v.replace(/\D/g, '') })} keyboardType="number-pad" maxLength={6} hint="The build number EAS shows for each store build. Leave empty to check the version only." />
            <TextField
              label={os === 'android' ? 'Update link (optional)' : 'Update link (optional)'}
              value={d[os].url}
              onChangeText={(v) => set(os, { url: v.trim() })}
              autoCapitalize="none"
              keyboardType="url"
              hint={os === 'android' ? 'Empty = the prsnn page on the Play Store. Before the Play listing, put the APK link here.' : 'Empty = the prsnn page on the App Store.'}
            />
          </Card>
        ))}

        <TextField label="Message on the update screen (optional)" value={d.message} onChangeText={(v) => setEdit({ ...d, message: v })} maxLength={200} multiline placeholder="A new version of prsnn is out. Please update to keep booking and chatting safely." />
        {problem ? <Notice tone="warning" text={problem} /> : null}
        {save.isError ? <Notice tone="danger" text={errorMessage(save.error)} /> : null}
        {save.isSuccess ? <Notice tone="success" text={save.data.message} /> : null}
      </View>
    </Screen>
  );
}
