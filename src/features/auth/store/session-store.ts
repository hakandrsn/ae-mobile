import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/services/storage/secure-storage";
import { mmkvStateStorage } from "@/store/storage";

type SessionStatus = "checking" | "authenticated" | "guest";

type SessionState = {
  hasCompletedOnboarding: boolean;
  status: SessionStatus;
  sessionToken: string | null;
};

type SessionActions = {
  bootstrap: () => Promise<void>;
  completeOnboarding: () => void;
  register: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type SessionStore = SessionState & SessionActions;

export const sessionStore = createStore<SessionStore>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      status: "checking",
      sessionToken: null,
      bootstrap: async () => {
        const token = await getAccessToken();

        set({
          sessionToken: token,
          status: token ? "authenticated" : "guest",
        });
      },
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
        }),
      register: async () => {
        const sessionToken = "demo-session-new-user";
        await setAccessToken(sessionToken);

        set({
          hasCompletedOnboarding: false,
          status: "authenticated",
          sessionToken,
        });
      },
      signIn: async () => {
        const sessionToken = "demo-session-existing-user";
        await setAccessToken(sessionToken);

        set({
          hasCompletedOnboarding: true,
          status: "authenticated",
          sessionToken,
        });
      },
      signOut: async () => {
        await removeAccessToken();

        set({
          hasCompletedOnboarding: false,
          status: "guest",
          sessionToken: null,
        });
      },
    }),
    {
      name: "session-store",
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
      storage: createJSONStorage(() => mmkvStateStorage),
    },
  ),
);

export function useSessionStore<T>(selector: (state: SessionStore) => T) {
  return useStore(sessionStore, selector);
}
