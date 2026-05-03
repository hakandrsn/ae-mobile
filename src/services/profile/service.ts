import { apiClient } from '@/services/api/api-client';

import type { Profile, CreateProfileDto, UpdateProfileDto, NearbyParams } from './types';

export const profileService = {
  getProfile: async () => {
    const response = await apiClient.get<Profile>('/profile');
    return response.data;
  },

  createProfile: async (data: CreateProfileDto) => {
    const response = await apiClient.post<Profile>('/profile', data);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileDto) => {
    const response = await apiClient.put<Profile>('/profile', data);
    return response.data;
  },

  findNearby: async (params: NearbyParams) => {
    const response = await apiClient.get<Profile[]>('/profile/nearby', { params });
    return response.data;
  },
};
