import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

import {
  darkTheme,
  lightTheme,
  type AppTheme,
  type ThemePreference,
} from "@/theme";
import { useAppStore } from "@/store/app-store";

type ThemeContextValue = {
  theme: AppTheme;
  colorScheme: ThemePreference;
  setColorScheme: (scheme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const themePreference = useAppStore((state) => state.themePreference);
  const setThemePreference = useAppStore((state) => state.setThemePreference);
  const theme = themePreference === "dark" ? darkTheme : lightTheme;
  const colorScheme = themePreference;

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorScheme,
      setColorScheme: setThemePreference,
    }),
    [colorScheme, setThemePreference, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within ThemeProvider.");
  }

  return context;
}
