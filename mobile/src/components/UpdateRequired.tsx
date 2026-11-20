import { useEffect, useState } from 'react';
import { BackHandler, Linking, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space } from '@/theme/tokens';
import { Text } from './ui/Text';
import { Button } from './ui/Button';
import { Logo } from './ui/layout';
import type { UpdateCheck } from '@/lib/appUpdate';

/**
 * Shown instead of the whole app when the installed version is too old. There is no way past it: the only actions
 * are updating and checking again. Android's back button closes the app.
 */
export function UpdateRequired({ check, onRecheck }: { check: UpdateCheck; onRecheck: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    return () => sub.remove();
  }, []);

  const v = check.installed;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.body} accessibilityViewIsModal>
        <Logo size={40} color={colors.porcelain} />
        <View style={{ gap: space.sm, alignItems: 'center' }}>
          <Text variant="title1" color={colors.white} center accessibilityRole="header">
            Update required
          </Text>
          <Text variant="callout" color={colors.gray200} center>
            {check.message || 'A new version of prsnn is out. Please update to keep booking and chatting safely.'}
          </Text>
        </View>
        <View style={styles.versions}>
          <Text variant="footnote" color={colors.gray300} center>
            You have {v.version}
            {v.build != null ? ` (build ${v.build})` : ''}
            {check.required ? ` · needed: ${check.required}` : ''}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          label="Update now"
          iconRight="arrowRight"
          backgroundColor={colors.champagne}
          textColor={colors.midnight}
          disabled={!check.url}
          onPress={() => {
            if (!check.url) return;
            setOpened(true);
            void Linking.openURL(check.url);
          }}
        />
        <Button
          label={opened ? 'I’ve updated · check again' : 'Check again'}
          variant="ghost"
          textColor={colors.porcelain}
          loading={busy}
          onPress={async () => {
            setBusy(true);
            await onRecheck();
            setBusy(false);
          }}
        />
        {!check.url ? (
          <Text variant="caption" color={colors.gray300} center>
            Open the {'Play Store or App Store'} and update prsnn.
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.midnight, paddingHorizontal: space.xl },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.xxl },
  versions: { paddingHorizontal: space.lg, paddingVertical: space.sm, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)' },
  footer: { gap: space.sm, paddingBottom: space.lg },
});
