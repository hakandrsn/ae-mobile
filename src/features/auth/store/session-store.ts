import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { mmkvStateStorage } from "@/store/storage";

type SessionStatus = "checking" | "authenticated" | "guest";

type SessionState = {
  hasCompletedOnboarding: boolean;
  status: SessionStatus;
  sessionToken: string | null;
};

type SessionActions = {
  bootstrap: () => void;
  completeOnboarding: () => void;
  register: () => void;
  signIn: () => void;
  signOut: () => void;
};

type SessionStore = SessionState & SessionActions;

export const sessionStore = createStore<SessionStore>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      status: "checking",
      sessionToken: null,
      bootstrap: () =>
        set({
          status: get().sessionToken ? "authenticated" : "guest",
        }),
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
        }),
      register: () =>
        set({
          hasCompletedOnboarding: false,
          status: "authenticated",
          sessionToken: "demo-session-new-user",
        }),
      signIn: () =>
        set({
          hasCompletedOnboarding: true,
          status: "authenticated",
          sessionToken: "demo-session-existing-user",
        }),
      signOut: () =>
        set({
          hasCompletedOnboarding: false,
          status: "guest",
          sessionToken: null,
        }),
    }),
    {
      name: "session-store",
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        sessionToken: state.sessionToken,
      }),
      storage: createJSONStorage(() => mmkvStateStorage),
    },
  ),
);

export function useSessionStore<T>(selector: (state: SessionStore) => T) {
  return useStore(sessionStore, selector);
}
