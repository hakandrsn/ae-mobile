import { ReactNode } from "react";
import { Platform, StyleProp, Text, TextStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useLocaleSettings } from "@/i18n";

type AppTextVariant = "body" | "bodyMuted" | "title" | "headline" | "label";
type AppTextColor =
  | "default"
  | "muted"
  | "primary"
  | "primaryForeground"
  | "success"
  | "warning"
  | "danger"
  | "info";

type AppTextProps = {
  children: ReactNode;
  color?: AppTextColor;
  style?: StyleProp<TextStyle>;
  variant?: AppTextVariant;
};

export function AppText({
  children,
  color = "default",
  style,
  variant = "body",
}: AppTextProps) {
  const { direction, isRTL, locale } = useLocaleSettings();
  const webDirectionProps =
    Platform.OS === "web" ? { dir: direction, lang: locale } : undefined;

  return (
    <Text
      style={[
        styles[variant],
        styles[color],
        isRTL ? styles.alignRight : styles.alignLeft,
        style,
      ]}
      {...webDirectionProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  alignLeft: {
    textAlign: "left",
  },
  alignRight: {
    textAlign: "right",
  },
  body: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.lineHeight.md,
  },
  bodyMuted: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.lineHeight.md,
  },
  default: {},
  danger: {
    color: theme.colors.danger,
  },
  headline: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "600",
    lineHeight: theme.typography.lineHeight.lg,
  },
  info: {
    color: theme.colors.info,
  },
  label: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "600",
    letterSpacing: 0.4,
    lineHeight: theme.typography.lineHeight.sm,
    textTransform: "uppercase",
  },
  muted: {
    color: theme.colors.textMuted,
  },
  primary: {
    color: theme.colors.primary,
  },
  primaryForeground: {
    color: theme.colors.primaryForeground,
  },
  success: {
    color: theme.colors.success,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "700",
    lineHeight: theme.typography.lineHeight.xxl,
  },
  warning: {
    color: theme.colors.warning,
  },
}));
