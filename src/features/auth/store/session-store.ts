import { createStore, useStore } from "zustand";

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

export const sessionStore = createStore<SessionStore>()((set) => ({
  hasCompletedOnboarding: false,
  status: "checking",
  sessionToken: null,
  bootstrap: () =>
    set({
      hasCompletedOnboarding: false,
      status: "guest",
      sessionToken: null,
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
}));

export function useSessionStore<T>(selector: (state: SessionStore) => T) {
  return useStore(sessionStore, selector);
}
