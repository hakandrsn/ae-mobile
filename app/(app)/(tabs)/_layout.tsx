import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { AnimatedTabBar } from "@/core/navigation/animated-tab-bar";
import { TabBarVisibilityProvider } from "@/core/navigation/tab-bar-visibility-context";

export default function AppTabsLayout() {
  return (
    <TabBarVisibilityProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            borderTopWidth: 1,
            height: 72,
            paddingBottom: 10,
            paddingTop: 8,
            position: "absolute",
          },
        }}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons color={color} name="home-outline" size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons color={color} name="search-outline" size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons color={color} name="person-outline" size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="internal"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </TabBarVisibilityProvider>
  );
}
