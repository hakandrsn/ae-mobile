import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { useLoginSheet } from '@/core/providers/login-sheet-provider';
import { useSession } from '@/features/auth';

import { paths } from './paths';
import type { TabAccess } from './tab-access';

type ProtectedTabLayoutProps = PropsWithChildren<{
  readonly access: TabAccess;
}>;

/**
 * Korumali sekme alt agacinda misafir + deep link / cikis senaryolarini yonetir.
 * `access: "public"` ise sadece children render edilir.
 */
export function ProtectedTabLayout({ access, children }: ProtectedTabLayoutProps) {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const { presentLoginSheet } = useLoginSheet();
  const wasAuthenticatedRef = useRef(isAuthenticated);

  useEffect(() => {
    if (access !== 'protected') {
      return;
    }
    if (wasAuthenticatedRef.current && !isAuthenticated) {
      router.replace(paths.appHome);
      presentLoginSheet();
    }
    wasAuthenticatedRef.current = isAuthenticated;
  }, [access, isAuthenticated, presentLoginSheet, router]);

  useFocusEffect(
    useCallback(() => {
      if (access !== 'protected') {
        return;
      }
      if (!isAuthenticated) {
        router.replace(paths.appHome);
        presentLoginSheet();
      }
    }, [access, isAuthenticated, presentLoginSheet, router]),
  );

  if (access === 'protected' && !isAuthenticated) {
    return null;
  }

  return children;
}
