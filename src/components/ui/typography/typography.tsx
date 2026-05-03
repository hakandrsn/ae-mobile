import { ReactNode } from 'react';
import { Platform, StyleProp, Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useLocaleSettings } from '@/i18n';

type TypographyVariant =
  | 'body'
  | 'bodyMuted'
  | 'button'
  | 'buttonLarge'
  | 'buttonSmall'
  | 'caption'
  | 'headline'
  | 'label'
  | 'title';

type TypographyColor =
  | 'danger'
  | 'default'
  | 'dangerForeground'
  | 'info'
  | 'muted'
  | 'positive'
  | 'primary'
  | 'primaryForeground'
  | 'success'
  | 'warning';

type TypographyProps = {
  children: ReactNode;
  color?: TypographyColor;
  style?: StyleProp<TextStyle>;
  variant?: TypographyVariant;
};

export function Typography({
  children,
  color = 'default',
  style,
  variant = 'body',
}: TypographyProps) {
  const { direction, isRTL, locale } = useLocaleSettings();
  const webDirectionProps = Platform.OS === 'web' ? { dir: direction, lang: locale } : undefined;

  return (
    <Text
      style={[styles[variant], styles[color], isRTL ? styles.alignRight : styles.alignLeft, style]}
      {...webDirectionProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
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
  button: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
    fontWeight: '500',
    lineHeight: theme.typography.lineHeight.md,
  },
  buttonLarge: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '500',
    lineHeight: theme.typography.lineHeight.lg,
  },
  buttonSmall: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    lineHeight: theme.typography.lineHeight.sm,
  },
  caption: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.lineHeight.xs,
  },
  danger: {
    color: theme.colors.danger,
  },
  dangerForeground: {
    color: theme.colors.dangerForeground,
  },
  default: {},
  headline: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    lineHeight: theme.typography.lineHeight.lg,
  },
  info: {
    color: theme.colors.info,
  },
  label: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.4,
    lineHeight: theme.typography.lineHeight.sm,
    textTransform: 'uppercase',
  },
  muted: {
    color: theme.colors.textMuted,
  },
  positive: {
    color: theme.colors.positive,
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
    fontWeight: '700',
    lineHeight: theme.typography.lineHeight.xxl,
  },
  warning: {
    color: theme.colors.warning,
  },
}));
