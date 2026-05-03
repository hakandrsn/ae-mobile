import type { GetJobsParams, PaginationParams } from '@/services/jobs/types';
import type { NearbyParams } from '@/services/profile/types';

export const queryKeys = {
  app: {
    root: ['app'] as const,
  },
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    verifyEmail: (token: string | null) => [...queryKeys.auth.all, 'verify-email', token] as const,
  },
  jobs: {
    all: ['jobs'] as const,
    list: (params?: GetJobsParams) => [...queryKeys.jobs.all, 'list', params] as const,
    infinite: (params?: Omit<GetJobsParams, 'page' | 'limit'> & { initialLimit?: number }) =>
      [...queryKeys.jobs.all, 'infinite', params] as const,
    detail: (id: string) => [...queryKeys.jobs.all, 'detail', id] as const,
    my: (params?: PaginationParams) => [...queryKeys.jobs.all, 'my', params] as const,
    applications: (jobId: string) => [...queryKeys.jobs.all, jobId, 'applications'] as const,
    myApplications: (params?: PaginationParams) =>
      [...queryKeys.jobs.all, 'my-applications', params] as const,
  },
  payment: {
    all: ['payment'] as const,
    creditPlans: () => [...queryKeys.payment.all, 'credit-plans'] as const,
  },
  profile: {
    all: ['profile'] as const,
    detail: () => [...queryKeys.profile.all, 'detail'] as const,
    nearby: (params: NearbyParams) => [...queryKeys.profile.all, 'nearby', params] as const,
  },
} as const;
