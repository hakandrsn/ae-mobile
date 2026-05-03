import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useAppTheme } from '@/core/providers/theme-provider';

import { Typography } from '../typography';
import { InteractivePressable, renderButtonIcon } from './button.shared';
import type { ButtonHaptic, ButtonIcon } from './button.types';

export type TabButtonSize = 'sm' | 'md';

type TabButtonProps = {
  badge?: number | string;
  disabled?: boolean;
  haptic?: ButtonHaptic;
  icon?: ButtonIcon;
  label: string;
  onPress?: () => void;
  selected?: boolean;
  size?: TabButtonSize;
  style?: StyleProp<ViewStyle>;
};

export function TabButton({
  badge,
  disabled = false,
  haptic,
  icon,
  label,
  onPress,
  selected = false,
  size = 'md',
  style,
}: TabButtonProps) {
  const { theme } = useAppTheme();
  const visualTokens = theme.button.tab.variants[selected ? 'selected' : 'default'];
  const sizeTokens = theme.button.tab.sizes[size];

  return (
    <InteractivePressable
      accessibilityRole="tab"
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
          minHeight: sizeTokens.minHeight,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          paddingVertical: sizeTokens.paddingVertical,
        },
        style,
      ]}>
      <View style={styles.content}>
        {renderButtonIcon(icon, visualTokens.iconColor, sizeTokens.iconSize)}
        <Typography style={[styles.label, { color: visualTokens.textColor }]} variant="buttonSmall">
          {label}
        </Typography>
        {badge !== undefined ? (
          <View style={styles.badge}>
            <Typography color="dangerForeground" variant="caption">
              {badge}
            </Typography>
          </View>
        ) : null}
      </View>
    </InteractivePressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  badge: {
    alignItems: 'center',
    backgroundColor: theme.button.tab.badge.backgroundColor,
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: theme.spacing.xxs,
  },
  base: {
    alignItems: 'center',
    borderRadius: theme.button.tab.radius,
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
