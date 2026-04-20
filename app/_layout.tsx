import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { AppProviders } from "@/core/providers/app-providers";
import { ThemeScope } from "@/core/providers/theme-scope";
import { useSession } from "@/features/auth";
import "@/theme/unistyles";

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
  const {
    bootstrap,
    hasCompletedOnboarding,
    isAuthenticated,
    isLoading,
  } = useSession();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (!isLoading) {
      void SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated && !hasCompletedOnboarding}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated && hasCompletedOnboarding}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Screen
        name="modal"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
