import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/services/api/query-keys';

import { jobsService } from './service';
import type {
  ApplicationStatus,
  CreateJobDto,
  GetJobsParams,
  PaginationParams,
  UpdateJobDto,
  UpdateMyApplicationNoteDto,
} from './types';

export function useJobs(params?: GetJobsParams) {
  return useQuery({
    queryKey: queryKeys.jobs.list(params),
    queryFn: () => jobsService.getAll(params),
  });
}

type InfiniteJobsParams = Omit<GetJobsParams, 'page' | 'limit'> & {
  initialLimit?: number;
};

export function useInfiniteJobs(params?: InfiniteJobsParams) {
  const { initialLimit: initialLimitParam, ...apiParams } = params ?? {};
  const initialLimit = initialLimitParam ?? 20;

  return useInfiniteQuery({
    queryKey: queryKeys.jobs.infinite(params),
    initialPageParam: { page: 1 },
    queryFn: ({ pageParam }) =>
      jobsService.getAll({
        ...apiParams,
        page: pageParam.page,
        limit: initialLimit,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) {
        return undefined;
      }

      return {
        page: lastPage.page + 1,
      };
    },
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => jobsService.getById(id),
    enabled: !!id,
  });
}

export function useMyJobs(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.jobs.my(params),
    queryFn: () => jobsService.getMyJobs(params),
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateJobDto) => jobsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobDto }) => jobsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.my() });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => jobsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

export function useApplyToJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => jobsService.applyToJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

export function useJobApplications(jobId: string) {
  return useQuery({
    queryKey: queryKeys.jobs.applications(jobId),
    queryFn: () => jobsService.getJobApplications(jobId),
    enabled: !!jobId,
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, id, status }: { jobId: string; id: string; status: ApplicationStatus }) =>
      jobsService.updateApplicationStatus(id, { status }),
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.applications(jobId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

export function useMyApplications(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.jobs.myApplications(params),
    queryFn: () => jobsService.getMyApplications(params),
  });
}

export function useUpdateMyApplicationNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMyApplicationNoteDto }) =>
      jobsService.updateMyApplicationNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.jobs.all, 'my-applications'] });
    },
  });
}
