import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/services/api/query-keys';

import { paymentService } from './service';

export function useCreditPlans() {
  return useQuery({
    queryKey: queryKeys.payment.creditPlans(),
    queryFn: paymentService.getCreditPlans,
  });
}
