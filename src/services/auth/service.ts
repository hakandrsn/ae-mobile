import { apiClient } from '@/services/api/api-client';

import type {
  RegisterDto,
  LoginDto,
  AuthResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  User,
} from './types';

interface MeResponse {
  id: string;
  email: string;
  type?: 'user' | 'business';
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  jobPostCredits?: number;
  emailVerified?: boolean;
  isEmailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    address?: string;
  } | null;
}

function normalizeUser(data: MeResponse): User {
  const credits = data.jobPostCredits ?? 0;

  return {
    id: data.id,
    email: data.email,
    type: data.type ?? (credits > 0 ? 'business' : 'user'),
    firstName: data.firstName ?? data.profile?.firstName ?? '',
    lastName: data.lastName ?? data.profile?.lastName ?? '',
    phoneNumber: data.phoneNumber ?? '',
    address: data.address ?? data.profile?.address ?? '',
    jobPostCredits: credits,
    emailVerified: data.emailVerified ?? data.isEmailVerified ?? false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export const authService = {
  register: async (data: RegisterDto) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginDto) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await apiClient.get('/auth/verify-email', {
      params: { token },
    });
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get<MeResponse>('/auth/me');
    return normalizeUser(response.data);
  },

  forgotPassword: async (data: ForgotPasswordDto) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordDto) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },
};
