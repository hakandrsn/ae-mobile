import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useAppTheme } from '@/core/providers/theme-provider';

import { InteractivePressable, renderButtonIcon } from './button.shared';
import { Typography } from '../typography';
import type { ButtonHaptic, ButtonIcon } from './button.types';

export type ChipButtonVariant = 'filter' | 'category' | 'tag';
export type ChipButtonSize = 'sm' | 'md';

type ChipButtonBaseProps = {
  disabled?: boolean;
  haptic?: ButtonHaptic;
  onPress?: () => void;
  selected?: boolean;
  size?: ChipButtonSize;
  style?: StyleProp<ViewStyle>;
  trailingIcon?: ButtonIcon;
  variant?: ChipButtonVariant;
};

type ChipButtonProps =
  | (ChipButtonBaseProps & {
      label: string;
      leadingIcon?: ButtonIcon;
    })
  | (ChipButtonBaseProps & {
      label?: string;
      leadingIcon: ButtonIcon;
    });

export function ChipButton({
  disabled = false,
  haptic,
  label,
  leadingIcon,
  onPress,
  selected = false,
  size = 'md',
  style,
  trailingIcon,
  variant = 'filter',
}: ChipButtonProps) {
  const { theme } = useAppTheme();
  const visualTokens = theme.button.chip.variants[variant][selected ? 'selected' : 'default'];
  const iconSize = theme.button.chip.iconSize[size];

  return (
    <InteractivePressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      disabledStyle={styles.disabled}
      haptic={haptic}
      onPress={onPress}
      pressedStyle={styles.pressed}
      style={[
        styles.base,
        {
          backgroundColor: visualTokens.backgroundColor,
          borderColor: visualTokens.borderColor,
          borderWidth: visualTokens.borderWidth,
          minHeight: size === 'md' ? 36 : 30,
          paddingHorizontal: size === 'md' ? theme.spacing.md : theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
        },
        style,
      ]}>
      <View style={styles.content}>
        {renderButtonIcon(leadingIcon, visualTokens.iconColor, iconSize)}
        {label ? (
          <Typography
            style={[styles.label, { color: visualTokens.textColor }]}
            variant={size === 'md' ? 'buttonSmall' : 'caption'}>
            {label}
          </Typography>
        ) : null}
        {renderButtonIcon(trailingIcon, visualTokens.iconColor, iconSize)}
      </View>
    </InteractivePressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: {
    alignItems: 'center',
    borderRadius: theme.button.chip.radius,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
    justifyContent: 'center',
  },
  disabled: {
    opacity: theme.button.common.disabledOpacity,
  },
  label: {
    fontWeight: '500',
  },
  pressed: {
    opacity: theme.button.common.pressedOpacity,
  },
}));
