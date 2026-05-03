import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/i18n';

import { useAppStore } from '@/store';

import { LoginSheetProvider } from './login-sheet-provider';
import { AppQueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: PropsWithChildren) {
  const syncDeviceLocale = useAppStore((state) => state.syncDeviceLocale);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        syncDeviceLocale();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [syncDeviceLocale]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppQueryProvider>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <LoginSheetProvider>{children}</LoginSheetProvider>
            </BottomSheetModalProvider>
          </ThemeProvider>
        </AppQueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
