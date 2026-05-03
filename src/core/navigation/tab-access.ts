export type TabAccess = 'public' | 'protected';

/**
 * Tab route adlari (Expo Router `Tabs.Screen name` ile eslesmeli).
 */
export const tabAccess: Record<string, TabAccess> = {
  home: 'public',
  search: 'public',
  profile: 'protected',
  internal: 'protected',
};

export function getTabAccess(screenName: string): TabAccess {
  return tabAccess[screenName] ?? 'protected';
}
