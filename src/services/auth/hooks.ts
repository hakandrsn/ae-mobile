import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { sessionStore, useSessionStore } from '@/features/auth/store/session-store';
import { queryKeys } from '@/services/api/query-keys';

import { authService } from './service';
import type { LoginDto } from './types';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),
    onSuccess: async (data) => {
      await sessionStore.getState().setSessionTokens(data.accessToken, data.refreshToken);
      try {
        const me = await authService.getMe();
        queryClient.setQueryData(queryKeys.auth.me(), me);
      } catch {
        await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      }
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authService.register,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: async () => {
      await sessionStore.getState().signOut();
      queryClient.clear();
    },
  });
}

export function useMe(options?: { enabled?: boolean }) {
  const isAuthed = useSessionStore((s) => s.status === 'authenticated' && !!s.sessionToken);
  const enabled = (options?.enabled ?? true) && isAuthed;

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => authService.getMe(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
  });
}

export function useVerifyEmail(token: string | null) {
  return useQuery({
    queryKey: queryKeys.auth.verifyEmail(token),
    queryFn: () => authService.verifyEmail(token!),
    enabled: !!token,
    retry: false,
  });
}
