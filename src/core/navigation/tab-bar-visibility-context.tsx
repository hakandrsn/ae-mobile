import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import type { SharedValue } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import { useAppStore } from "@/store";

type TabBarVisibilityContextValue = {
  isInTabs: true;
  isScrollHideLocked: boolean;
  lockScrollHide: () => void;
  unlockScrollHide: () => void;
  tabBarHeight: number;
  translateY: SharedValue<number>;
  previousScrollY: SharedValue<number>;
};

const TAB_BAR_HEIGHT = 72;

const TabBarVisibilityContext =
  createContext<TabBarVisibilityContextValue | null>(null);

export function TabBarVisibilityProvider({ children }: PropsWithChildren) {
  const isScrollHideLocked = useAppStore((state) => state.isTabBarScrollLocked);
  const lockScrollHide = useAppStore((state) => state.lockTabBarScrollHide);
  const translateY = useSharedValue(0);
  const unlockScrollHide = useAppStore((state) => state.unlockTabBarScrollHide);
  const previousScrollY = useSharedValue(0);

  const value = useMemo<TabBarVisibilityContextValue>(
    () => ({
      isInTabs: true,
      isScrollHideLocked,
      lockScrollHide,
      unlockScrollHide,
      previousScrollY,
      tabBarHeight: TAB_BAR_HEIGHT,
      translateY,
    }),
    [
      isScrollHideLocked,
      lockScrollHide,
      previousScrollY,
      translateY,
      unlockScrollHide,
    ],
  );

  return (
    <TabBarVisibilityContext.Provider value={value}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
}

export function useOptionalTabBarVisibility() {
  return useContext(TabBarVisibilityContext);
}
