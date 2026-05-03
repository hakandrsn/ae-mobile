import { Stack } from 'expo-router';

import { ProtectedTabLayout } from '@/core/navigation/protected-tab-layout';

/** Bu sekme ve alt stack misafirlere kapali; layout duzeyinde sabit. */
const routeAccess = 'protected' as const;

export default function ProfileTabLayout() {
  return (
    <ProtectedTabLayout access={routeAccess}>
      <Stack screenOptions={{ headerShown: false }} />
    </ProtectedTabLayout>
  );
}
