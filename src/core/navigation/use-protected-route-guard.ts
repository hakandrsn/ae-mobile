import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';

import { useLoginSheet } from '@/core/providers/login-sheet-provider';
import { useSession } from '@/features/auth';

import { paths } from './paths';

/**
 * Tek ekranlik (klasorsuz) korumali tab rotalari icin — or. `href: null` internal sekme.
 */
export function useProtectedRouteGuard() {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const { presentLoginSheet } = useLoginSheet();
  const wasAuthenticatedRef = useRef(isAuthenticated);

  useEffect(() => {
    if (wasAuthenticatedRef.current && !isAuthenticated) {
      router.replace(paths.appHome);
      presentLoginSheet();
    }
    wasAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated, presentLoginSheet, router]);

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        router.replace(paths.appHome);
        presentLoginSheet();
      }
    }, [isAuthenticated, presentLoginSheet, router]),
  );

  return isAuthenticated;
}
