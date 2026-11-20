import { Platform } from 'react-native';
import * as Application from 'expo-application';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { svc } from '@/services';
import { compareVersions, playStoreUrl, updateNeeded, type Installed } from '@/domain/appUpdate';

export interface UpdateCheck {
  blocked: boolean;
  url: string | null;
  installed: Installed;
  required: string | null;
  message: string | null;
}

const OPEN: UpdateCheck = { blocked: false, url: null, installed: { version: null, build: null }, required: null, message: null };

/** The installed app's version and build. Unknown on the web and in Expo Go, where nobody is ever blocked. */
export function installedApp(): Installed {
  if (Platform.OS === 'web' || Constants.executionEnvironment === ExecutionEnvironment.StoreClient) return { version: null, build: null };
  const build = Number(Application.nativeBuildVersion);
  return { version: Application.nativeApplicationVersion ?? null, build: Number.isFinite(build) ? build : null };
}

const withTimeout = <T,>(p: Promise<T>, ms: number) => Promise.race([p, new Promise<T>((_, j) => setTimeout(() => j(new Error('timeout')), ms))]);

/**
 * Runs on every launch (and when the app comes back to the front): is this install too old?
 * Any failure (offline, slow network, Apple not answering) lets the person in rather than locking them out.
 */
export async function checkForUpdate(timeoutMs = 4000): Promise<UpdateCheck> {
  const installed = installedApp();
  if (!installed.version || (Platform.OS !== 'android' && Platform.OS !== 'ios')) return OPEN;
  const os = Platform.OS;
  try {
    const [settings, store] = await withTimeout(
      Promise.all([
        svc.appUpdate().catch(() => null),
        os === 'ios' && Application.applicationId ? svc.appStoreVersion(Application.applicationId).catch(() => null) : Promise.resolve(null),
      ]),
      timeoutMs,
    );
    const rule = settings?.[os];
    const blocked = updateNeeded(installed, rule, store?.version);
    if (!blocked) return { ...OPEN, installed };
    const url = rule?.url || (os === 'ios' ? store?.url || null : Application.applicationId ? playStoreUrl(Application.applicationId) : null);
    const versions = [rule?.minVersion, store?.version].filter((x): x is string => !!x).sort(compareVersions);
    const required = versions.pop() ?? (rule?.minBuild ? `build ${rule.minBuild}` : null);
    return { blocked: true, url, installed, required, message: settings?.message ?? null };
  } catch {
    return { ...OPEN, installed };
  }
}
