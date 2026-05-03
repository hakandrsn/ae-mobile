import { apiClient } from '@/services/api/api-client';

import type { CreditPlan } from './types';

export const paymentService = {
  getCreditPlans: async () => {
    const response = await apiClient.get<CreditPlan[]>('/payment/credit-plans');
    return response.data;
  },
};
