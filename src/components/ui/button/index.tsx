import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useAppTheme } from '@/core/providers/theme-provider';

import { Typography } from '../typography';
import { InteractivePressable, renderButtonIcon } from './button.shared';
import type { ButtonHaptic, ButtonIcon } from './button.types';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'surface'
  | 'ghost'
  | 'destructive'
  | 'positive';
export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  haptic?: ButtonHaptic;
  label: string;
  leadingIcon?: ButtonIcon;
  loading?: boolean;
  onPress?: () => void;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  trailingIcon?: ButtonIcon;
  variant?: ButtonVariant;
};

export function Button({
  disabled = false,
  fullWidth = false,
  haptic,
  label,
  leadingIcon,
  loading = false,
  onPress,
  size = 'md',
  style,
  trailingIcon,
  variant = 'primary',
}: ButtonProps) {
  const { theme } = useAppTheme();
  const isDisabled = disabled || loading;
  const sizeTokens = theme.button.cta.sizes[size];
  const variantTokens = theme.button.cta.variants[variant];
  const disabledTokens = theme.button.disabled;
  const visualTokens = isDisabled ? disabledTokens : variantTokens;

  return (
    <InteractivePressable
      accessibilityRole="button"
      disabled={isDisabled}
      disabledStyle={styles.disabled}
      haptic={haptic}
      onPress={onPress}
      pressedStyle={styles.pressed}
      style={[
        styles.base,
        styles[fullWidth ? 'fullWidth' : 'intrinsicWidth'],
        {
          backgroundColor: visualTokens.backgroundColor,
          borderColor: visualTokens.borderColor,
          borderWidth: visualTokens.borderWidth,
          minHeight: sizeTokens.minHeight,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          paddingVertical: sizeTokens.paddingVertical,
        },
        style,
      ]}>
      <View style={[styles.content, { gap: sizeTokens.gap }]}>
        {loading ? (
          <ActivityIndicator color={visualTokens.textColor} size="small" />
        ) : (
          renderButtonIcon(leadingIcon, visualTokens.iconColor, sizeTokens.iconSize)
        )}
        <Typography
          color="default"
          style={[styles.label, { color: visualTokens.textColor }]}
          variant={getTypographyVariant(size)}>
          {label}
        </Typography>
        {!loading
          ? renderButtonIcon(trailingIcon, visualTokens.iconColor, sizeTokens.iconSize)
          : null}
      </View>
    </InteractivePressable>
  );
}

function getTypographyVariant(size: ButtonSize) {
  switch (size) {
    case 'sm':
      return 'buttonSmall';
    case 'lg':
      return 'buttonLarge';
    case 'md':
    default:
      return 'button';
  }
}

const styles = StyleSheet.create((theme) => ({
  base: {
    alignItems: 'center',
    borderRadius: theme.button.cta.radius,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabled: {
    opacity: theme.button.common.disabledOpacity,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  intrinsicWidth: {
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '500',
  },
  pressed: {
    opacity: theme.button.common.pressedOpacity,
  },
}));

export { ChipButton } from './chip-button';
export { IconButton } from './icon-button';
export { TabButton } from './tab-button';
export type { ChipButtonVariant, ChipButtonSize } from './chip-button';
export type { IconButtonVariant, IconButtonSize } from './icon-button';
export type { TabButtonSize } from './tab-button';
export type { ButtonHaptic, ButtonIcon } from './button.types';
