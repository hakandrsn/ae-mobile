import { apiClient } from '@/services/api/api-client';

import type {
  GetJobsParams,
  GetJobsResponse,
  Job,
  CreateJobDto,
  UpdateJobDto,
  JobApplication,
  UpdateApplicationStatusDto,
  UpdateMyApplicationNoteDto,
  PaginationParams,
  MyJobsResponse,
  MyApplicationsResponse,
} from './types';

export const jobsService = {
  getAll: async (params?: GetJobsParams): Promise<GetJobsResponse> => {
    const response = await apiClient.get<GetJobsResponse>('/jobs', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Job> => {
    const response = await apiClient.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  create: async (data: CreateJobDto): Promise<Job> => {
    const response = await apiClient.post<Job>('/jobs', data);
    return response.data;
  },

  update: async (id: string, data: UpdateJobDto): Promise<Job> => {
    const response = await apiClient.patch<Job>(`/jobs/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  },

  getMyJobs: async (params?: PaginationParams): Promise<MyJobsResponse> => {
    const response = await apiClient.get<MyJobsResponse>('/jobs/my-jobs', { params });
    return response.data;
  },

  applyToJob: async (jobId: string): Promise<void> => {
    await apiClient.post(`/jobs/${jobId}/apply`);
  },

  getJobApplications: async (jobId: string): Promise<JobApplication[]> => {
    const response = await apiClient.get<JobApplication[]>(`/jobs/${jobId}/applications`);
    return response.data;
  },

  updateApplicationStatus: async (
    id: string,
    data: UpdateApplicationStatusDto,
  ): Promise<JobApplication> => {
    const response = await apiClient.patch<JobApplication>(`/jobs/applications/${id}/status`, data);
    return response.data;
  },

  getMyApplications: async (params?: PaginationParams): Promise<MyApplicationsResponse> => {
    const response = await apiClient.get<MyApplicationsResponse>(
      '/jobs/applications/my-applications',
      { params },
    );
    return response.data;
  },

  updateMyApplicationNote: async (
    id: string,
    data: UpdateMyApplicationNoteDto,
  ): Promise<JobApplication> => {
    const response = await apiClient.patch<JobApplication>(
      `/jobs/applications/${id}/my-note`,
      data,
    );
    return response.data;
  },
};
