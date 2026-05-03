import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/services/api/query-keys';

import { profileService } from './service';
import type { CreateProfileDto, NearbyParams, UpdateProfileDto } from './types';

export function useProfile(enabled = true) {
  return useQuery({
    queryKey: queryKeys.profile.detail(),
    queryFn: profileService.getProfile,
    enabled,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProfileDto) => profileService.createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileDto) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
    },
  });
}

export function useNearbyProfiles(params: NearbyParams) {
  return useQuery({
    queryKey: queryKeys.profile.nearby(params),
    queryFn: () => profileService.findNearby(params),
    enabled: !!params.lat && !!params.lng,
  });
}
