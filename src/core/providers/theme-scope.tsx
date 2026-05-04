import { PropsWithChildren, useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';

import { useAppTheme } from './theme-provider';

export function ThemeScope({ children }: PropsWithChildren) {
  const { theme } = useAppTheme();

  useEffect(() => {
    UnistylesRuntime.setTheme(theme.id);
    UnistylesRuntime.setRootViewBackgroundColor(theme.colors.background);
  }, [theme]);

  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
