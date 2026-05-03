import '@/theme/unistyles';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import { appFonts } from '@/core/fonts/app-fonts';
import { AppProviders } from '@/core/providers/app-providers';
import { ThemeScope } from '@/core/providers/theme-scope';
import { useSession } from '@/features/auth';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProviders>
      <ThemeScope>
        <RootNavigator />
      </ThemeScope>
    </AppProviders>
  );
}

function RootNavigator() {
  const [fontsLoaded, fontsError] = useFonts(appFonts);
  const { bootstrap, hasCompletedOnboarding, isLoading } = useSession();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if ((fontsLoaded || fontsError) && !isLoading) {
      void SplashScreen.hideAsync();
    }
  }, [fontsError, fontsLoaded, isLoading]);

  if ((!fontsLoaded && !fontsError) || isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          animation: 'none',
        }}
      />

      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      <Stack.Protected guard={hasCompletedOnboarding}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Screen
        name="modal"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
