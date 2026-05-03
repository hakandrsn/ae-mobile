import axios from 'axios';

import { getAccessToken } from '@/services/storage/secure-storage';

import { normalizeApiError } from './normalize-api-error';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
);
