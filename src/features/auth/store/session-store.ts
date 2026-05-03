import { createStore, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  clearAuthTokens,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/services/storage/secure-storage';
import { mmkvStateStorage } from '@/store/storage';

type SessionStatus = 'checking' | 'authenticated' | 'guest';

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
  /** API’den dönen gerçek token çifti */
  setSessionTokens: (accessToken: string, refreshToken: string) => Promise<void>;
};

type SessionStore = SessionState & SessionActions;

export const sessionStore = createStore<SessionStore>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      status: 'checking',
      sessionToken: null,
      bootstrap: async () => {
        const token = await getAccessToken();

        set({
          sessionToken: token,
          status: token ? 'authenticated' : 'guest',
        });
      },
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
        }),
      register: async () => {
        const sessionToken = 'demo-session-new-user';
        await setAccessToken(sessionToken);

        set({
          hasCompletedOnboarding: false,
          status: 'authenticated',
          sessionToken,
        });
      },
      signIn: async () => {
        const sessionToken = 'demo-session-existing-user';
        await setAccessToken(sessionToken);

        set({
          hasCompletedOnboarding: true,
          status: 'authenticated',
          sessionToken,
        });
      },
      signOut: async () => {
        await clearAuthTokens();

        set({
          status: 'guest',
          sessionToken: null,
        });
      },
      setSessionTokens: async (accessToken, refreshToken) => {
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);
        set({
          status: 'authenticated',
          sessionToken: accessToken,
        });
      },
    }),
    {
      name: 'session-store',
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
