import { Pressable, StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppText } from "./app-text";

type AppButtonTone = "foreground" | "primary" | "surface";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  tone?: AppButtonTone;
};

export function AppButton({
  label,
  onPress,
  style,
  tone = "foreground",
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        styles[tone],
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <AppText color={toneTextColors[tone]} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const toneTextColors: Record<AppButtonTone, "default" | "primaryForeground"> = {
  foreground: "primaryForeground",
  primary: "primaryForeground",
  surface: "default",
};

const styles = StyleSheet.create((theme) => ({
  base: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: theme.radius.full,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: theme.spacing.sm,
  },
  foreground: {
    backgroundColor: theme.colors.text,
  },
  label: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.9,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  surface: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
}));
