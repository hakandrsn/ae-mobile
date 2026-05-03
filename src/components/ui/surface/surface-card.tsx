import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type SurfaceProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Surface({ children, style }: SurfaceProps) {
  return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
}));
