import { PropsWithChildren, useEffect } from 'react';
import { StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { clamp, useAnimatedScrollHandler, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { useOptionalTabBarVisibility } from '@/core/navigation/tab-bar-visibility-context';
import { useAppTheme } from '@/core/providers/theme-provider';

type AppScreenProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  tabBarScrollBehavior?: 'auto' | 'locked';
}>;

export function AppScreen({
  children,
  contentStyle,
  scrollable = true,
  style,
  tabBarScrollBehavior = 'auto',
}: AppScreenProps) {
  const { colorScheme } = useAppTheme();
  const tabBarVisibility = useOptionalTabBarVisibility();
  const isScrollHideEnabled = !!tabBarVisibility && !tabBarVisibility.isScrollHideLocked;

  useEffect(() => {
    if (!tabBarVisibility) {
      return;
    }

    if (tabBarScrollBehavior === 'locked') {
      tabBarVisibility.lockScrollHide();
      tabBarVisibility.translateY.value = withTiming(0, { duration: 120 });

      return () => {
        tabBarVisibility.unlockScrollHide();
      };
    }
  }, [tabBarScrollBehavior, tabBarVisibility]);

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: (event) => {
      if (!tabBarVisibility || tabBarVisibility.isScrollHideLocked) {
        return;
      }

      tabBarVisibility.previousScrollY.value = event.contentOffset.y;
    },
    onEndDrag: () => {
      if (!tabBarVisibility || tabBarVisibility.isScrollHideLocked) {
        return;
      }

      const shouldHide = tabBarVisibility.translateY.value > tabBarVisibility.tabBarHeight / 2;

      tabBarVisibility.translateY.value = withTiming(
        shouldHide ? tabBarVisibility.tabBarHeight : 0,
        { duration: 180 },
      );
    },
    onMomentumEnd: () => {
      if (!tabBarVisibility || tabBarVisibility.isScrollHideLocked) {
        return;
      }

      const shouldHide = tabBarVisibility.translateY.value > tabBarVisibility.tabBarHeight / 2;

      tabBarVisibility.translateY.value = withTiming(
        shouldHide ? tabBarVisibility.tabBarHeight : 0,
        { duration: 180 },
      );
    },
    onScroll: (event) => {
      if (!tabBarVisibility || tabBarVisibility.isScrollHideLocked) {
        return;
      }

      const currentY = Math.max(event.contentOffset.y, 0);
      const delta = currentY - tabBarVisibility.previousScrollY.value;

      tabBarVisibility.previousScrollY.value = currentY;

      if (currentY <= 0) {
        tabBarVisibility.translateY.value = withTiming(0, { duration: 120 });
        return;
      }

      tabBarVisibility.translateY.value = clamp(
        tabBarVisibility.translateY.value + delta,
        0,
        tabBarVisibility.tabBarHeight,
      );
    },
  });

  const content = (
    <View style={[styles.content, tabBarVisibility && styles.contentWithTabBar, contentStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {scrollable ? (
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          onScroll={isScrollHideEnabled ? onScroll : undefined}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={[styles.container, style]}>
          {content}
        </Animated.ScrollView>
      ) : (
        <View style={[styles.container, style]}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
  },
  contentWithTabBar: {
    paddingBottom: 96,
  },
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
}));
