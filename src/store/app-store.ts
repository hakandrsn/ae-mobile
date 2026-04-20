import { createStore, useStore } from "zustand";

import { detectDeviceLocale, type Locale } from "@/i18n/locale";
import type { ThemePreference } from "@/theme";

type AppState = {
  isTabBarScrollLocked: boolean;
  localeOverride: Locale | null;
  resolvedLocale: Locale;
  themePreference: ThemePreference;
};

type AppActions = {
  setLocaleOverride: (locale: Locale) => void;
  clearLocaleOverride: () => void;
  lockTabBarScrollHide: () => void;
  setThemePreference: (theme: ThemePreference) => void;
  toggleThemePreference: () => void;
  unlockTabBarScrollHide: () => void;
  syncDeviceLocale: () => void;
};

type AppStore = AppState & AppActions;

export const appI18nStore = createStore<AppStore>()((set) => ({
  isTabBarScrollLocked: false,
  localeOverride: null,
  resolvedLocale: detectDeviceLocale(),
  themePreference: "light",
  setLocaleOverride: (locale) =>
    set({
      localeOverride: locale,
      resolvedLocale: locale,
    }),
  clearLocaleOverride: () =>
    set({
      localeOverride: null,
      resolvedLocale: detectDeviceLocale(),
    }),
  lockTabBarScrollHide: () =>
    set({
      isTabBarScrollLocked: true,
    }),
  setThemePreference: (themePreference) =>
    set({
      themePreference,
    }),
  toggleThemePreference: () =>
    set((state) => ({
      themePreference: state.themePreference === "light" ? "dark" : "light",
    })),
  syncDeviceLocale: () =>
    set((state) => {
      if (state.localeOverride) {
        return state;
      }

        return {
          resolvedLocale: detectDeviceLocale(),
        };
    }),
  unlockTabBarScrollHide: () =>
    set({
      isTabBarScrollLocked: false,
    }),
}));

export function useAppStore<T>(selector: (state: AppStore) => T) {
  return useStore(appI18nStore, selector);
}
