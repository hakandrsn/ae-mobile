import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "@/i18n";

import { useAppStore } from "@/store";

import { AppQueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: PropsWithChildren) {
  const syncDeviceLocale = useAppStore((state) => state.syncDeviceLocale);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        syncDeviceLocale();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [syncDeviceLocale]);

  return (
    <SafeAreaProvider>
      <AppQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppQueryProvider>
    </SafeAreaProvider>
  );
}
