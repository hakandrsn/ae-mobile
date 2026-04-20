import { useSessionStore } from "../store/session-store";

export function useSession() {
  const completeOnboarding = useSessionStore((state) => state.completeOnboarding);
  const hasCompletedOnboarding = useSessionStore(
    (state) => state.hasCompletedOnboarding,
  );
  const status = useSessionStore((state) => state.status);
  const sessionToken = useSessionStore((state) => state.sessionToken);
  const bootstrap = useSessionStore((state) => state.bootstrap);
  const register = useSessionStore((state) => state.register);
  const signIn = useSessionStore((state) => state.signIn);
  const signOut = useSessionStore((state) => state.signOut);

  return {
    bootstrap,
    completeOnboarding,
    hasCompletedOnboarding,
    isAuthenticated: status === "authenticated",
    isLoading: status === "checking",
    register,
    sessionToken,
    signIn,
    signOut,
    status,
  };
}
