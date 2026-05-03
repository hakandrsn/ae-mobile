import { ReactNode } from 'react';
import {
  GestureResponderEvent,
  Insets,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import type { ButtonHaptic } from './button.types';

type InteractivePressableProps = Omit<PressableProps, 'children' | 'onPress' | 'style'> & {
  children: ReactNode;
  disabledStyle?: StyleProp<ViewStyle>;
  haptic?: ButtonHaptic;
  onPress?: (event: GestureResponderEvent) => void;
  pressedStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

export const DEFAULT_HIT_SLOP: Insets = {
  bottom: 6,
  left: 6,
  right: 6,
  top: 6,
};

export function InteractivePressable({
  children,
  disabled,
  disabledStyle,
  haptic,
  hitSlop = DEFAULT_HIT_SLOP,
  onPress,
  pressedStyle,
  style,
  ...props
}: InteractivePressableProps) {
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) {
      return;
    }

    triggerHaptic(haptic);
    onPress?.(event);
  };

  return (
    <Pressable
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={handlePress}
      style={({ pressed }) => [
        style,
        pressed && !disabled ? pressedStyle : undefined,
        disabled ? disabledStyle : undefined,
      ]}
      {...props}>
      {children}
    </Pressable>
  );
}

function triggerHaptic(haptic?: ButtonHaptic) {
  if (!haptic) {
    return;
  }

  switch (haptic) {
    case 'light':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'heavy':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case 'selection':
      void Haptics.selectionAsync();
      break;
    case 'success':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'warning':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
  }
}

export function renderButtonIcon(
  icon: ((props: { color: string; size: number }) => ReactNode) | undefined,
  color: string,
  size: number,
) {
  if (!icon) {
    return null;
  }

  return icon({ color, size });
}
