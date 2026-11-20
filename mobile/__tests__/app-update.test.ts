import { compareVersions, ruleError, updateNeeded } from '@/domain/appUpdate';

describe('force update', () => {
  it('compares versions number by number', () => {
    expect(compareVersions('1.0.10', '1.0.9')).toBe(1);
    expect(compareVersions('1.0', '1.0.0')).toBe(0);
    expect(compareVersions('1.2.0', '1.10.0')).toBe(-1);
  });
  it('stops installs older than the required version or build', () => {
    expect(updateNeeded({ version: '1.0.2', build: 7 }, { minVersion: '1.0.3' })).toBe(true);
    expect(updateNeeded({ version: '1.0.3', build: 7 }, { minVersion: '1.0.3' })).toBe(false);
    expect(updateNeeded({ version: '1.0.0', build: 7 }, { minBuild: 8 })).toBe(true);
    expect(updateNeeded({ version: '1.0.0', build: 8 }, { minBuild: 8 })).toBe(false);
  });
  it('on iPhone, a newer App Store version stops older installs', () => {
    expect(updateNeeded({ version: '1.0.0', build: 3 }, undefined, '1.0.1')).toBe(true);
    expect(updateNeeded({ version: '1.0.1', build: 3 }, undefined, '1.0.1')).toBe(false);
  });
  it('never blocks when nothing is known (web, Expo Go, no settings)', () => {
    expect(updateNeeded({ version: null, build: null }, { minVersion: '9.9.9' })).toBe(false);
    expect(updateNeeded({ version: '1.0.0', build: 1 }, undefined)).toBe(false);
    expect(updateNeeded({ version: '1.0.0', build: null }, { minBuild: 5 })).toBe(false);
  });
  it('checks the admin form', () => {
    expect(ruleError({ minVersion: '1.0.3', minBuild: '12', url: 'https://play.google.com/x' })).toBeNull();
    expect(ruleError({ minVersion: 'v1', minBuild: '', url: '' })).toMatch(/1\.0\.3/);
    expect(ruleError({ minVersion: '', minBuild: '1.5', url: '' })).toMatch(/whole/);
    expect(ruleError({ minVersion: '', minBuild: '', url: 'http://x' })).toMatch(/https/);
  });
});
