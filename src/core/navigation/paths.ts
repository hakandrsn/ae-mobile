import type { Href } from "expo-router";

export const paths = {
  publicHome: "/",
  signIn: "/sign-in",
  register: "/register",
  onboardingWelcome: "/welcome",
  appHome: "/home",
  search: "/search",
  profile: "/profile",
  settings: "/settings",
  modal: "/modal",
  details: (id: string) =>
    ({
      params: { id },
      pathname: "/details/[id]",
    }) satisfies Href,
  internalTab: "/internal",
} as const;
