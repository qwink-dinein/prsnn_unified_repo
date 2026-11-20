/**
 * Force update (owner, 20 Nov). On every launch the app compares what's installed with:
 *  • the required version/build staff set in Admin → App updates (settings.app_update), for Android and iPhone;
 *  • on iPhone, also the version live on the App Store (Apple's public lookup).
 * If the installed app is older, it stops on the "Update required" screen until it's updated.
 * Network problems never block anyone: no answer = let them in.
 */
export type Platform = 'android' | 'ios';

export interface UpdateRule {
  /** Required marketing version, e.g. "1.0.3" (empty = no requirement). */
  minVersion?: string | null;
  /** Required build number (Android versionCode / iPhone build), 0 = no requirement. */
  minBuild?: number | null;
  /** Where "Update now" goes: Play Store / App Store page, or the APK link before the Play listing. */
  url?: string | null;
}

export interface AppUpdateSettings {
  android?: UpdateRule;
  ios?: UpdateRule;
  message?: string | null;
}

export interface Installed {
  version: string | null;
  build: number | null;
}

/** "1.0.10" vs "1.0.9" → 1. Missing parts count as 0; anything that isn't a number is ignored. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map((x) => parseInt(x, 10) || 0);
  const pb = b.split('.').map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d > 0 ? 1 : -1;
  }
  return 0;
}

export const isVersion = (v: unknown): v is string => typeof v === 'string' && /^\d+(\.\d+){0,3}$/.test(v.trim());

/**
 * Should this install be stopped? `storeVersion` is the App Store's live version (iPhone only).
 * Unknown installed version (web, Expo Go) → never blocked.
 */
export function updateNeeded(installed: Installed, rule: UpdateRule | undefined, storeVersion?: string | null): boolean {
  if (!installed.version) return false;
  if (rule?.minVersion && isVersion(rule.minVersion) && compareVersions(installed.version, rule.minVersion) < 0) return true;
  if (rule?.minBuild && installed.build != null && installed.build < rule.minBuild) return true;
  if (storeVersion && isVersion(storeVersion) && compareVersions(installed.version, storeVersion) < 0) return true;
  return false;
}

/** Android store page when no link is set (iPhone uses the App Store page Apple's lookup returns). */
export const playStoreUrl = (packageId: string) => `https://play.google.com/store/apps/details?id=${packageId}`;

/** Admin form checks (the server checks again). */
export function ruleError(r: { minVersion: string; minBuild: string; url: string }): string | null {
  if (r.minVersion.trim() && !isVersion(r.minVersion)) return 'Version looks like 1.0.3 (numbers and dots).';
  if (r.minBuild.trim() && !/^\d+$/.test(r.minBuild.trim())) return 'Build number is a whole number.';
  if (r.url.trim() && !/^https:\/\/\S+$/.test(r.url.trim())) return 'The link must start with https://';
  return null;
}
