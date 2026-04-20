import { BottomTabBar, type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useOptionalTabBarVisibility } from "./tab-bar-visibility-context";

export function AnimatedTabBar(props: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabBarVisibility = useOptionalTabBarVisibility();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      tabBarVisibility?.isScrollHideLocked ? 0 : tabBarVisibility?.translateY.value ?? 0,
      [0, (tabBarVisibility?.tabBarHeight ?? 72) + insets.bottom + 12],
      [1, 0.9],
    ),
    transform: [
      {
        translateY:
          tabBarVisibility?.isScrollHideLocked
            ? 0
            : tabBarVisibility?.translateY.value ?? 0,
      },
    ],
  }));

  if (!tabBarVisibility) {
    return <BottomTabBar {...props} />;
  }

  return (
    <Animated.View
      style={[
        {
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
        },
        animatedStyle,
      ]}
    >
      <BottomTabBar {...props} />
    </Animated.View>
  );
}
