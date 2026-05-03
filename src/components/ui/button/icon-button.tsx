import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useAppTheme } from '@/core/providers/theme-provider';

import { InteractivePressable, renderButtonIcon } from './button.shared';
import type { ButtonHaptic, ButtonIcon } from './button.types';

export type IconButtonVariant = 'ghost' | 'surface' | 'primary' | 'destructive';
export type IconButtonSize = 'sm' | 'md' | 'lg';

type IconButtonProps = {
  accessibilityLabel: string;
  disabled?: boolean;
  haptic?: ButtonHaptic;
  icon: ButtonIcon;
  onPress?: () => void;
  selected?: boolean;
  size?: IconButtonSize;
  style?: StyleProp<ViewStyle>;
  variant?: IconButtonVariant;
};

export function IconButton({
  accessibilityLabel,
  disabled = false,
  haptic,
  icon,
  onPress,
  selected = false,
  size = 'md',
  style,
  variant = 'ghost',
}: IconButtonProps) {
  const { theme } = useAppTheme();
  const sizeTokens = theme.button.icon.sizes[size];
  const variantTokens = selected ? theme.button.icon.selected : theme.button.icon.variants[variant];
  const iconColor = disabled ? theme.button.disabled.iconColor : variantTokens.iconColor;

  return (
    <InteractivePressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      disabledStyle={styles.disabled}
      haptic={haptic}
      onPress={onPress}
      pressedStyle={styles.pressed}
      style={[
        styles.base,
        {
          backgroundColor: variantTokens.backgroundColor,
          borderColor: variantTokens.borderColor,
          borderWidth: variantTokens.borderWidth,
          height: sizeTokens.size,
          width: sizeTokens.size,
        },
        style,
      ]}>
      {renderButtonIcon(icon, iconColor, sizeTokens.iconSize)}
    </InteractivePressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: {
    alignItems: 'center',
    borderRadius: theme.button.icon.radius,
    justifyContent: 'center',
  },
  disabled: {
    opacity: theme.button.common.disabledOpacity,
  },
  pressed: {
    opacity: theme.button.common.pressedOpacity,
  },
}));
