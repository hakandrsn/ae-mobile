import { StyleSheet } from 'react-native-unistyles';

import { darkTheme, lightTheme } from './tokens';

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  themes: appThemes,
});
