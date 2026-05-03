export type PromotionLevel = 'NONE' | 'BASIC' | 'PREMIUM';
export type JobStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';
export type FollowUpStatus = 'WENT' | 'DID_NOT_GO' | 'NO_RESPONSE';
export type WeekDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface Job {
  id: string;
  title: string;
  description: string;
  city: string;
  district: string;
  detailedAddress?: string;
  jobCategory: string;
  promotionLevel: PromotionLevel;
  dailyWage: number;
  neededWorkers?: number;
  hasOvertime?: boolean;
  overtimeWage?: number;
  providedBenefits?: string[];
  shiftStartTime: string;
  shiftEndTime: string;
  startDate: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
  location?: {
    lat: number;
    lng: number;
  } | null;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    firstName: string;
    lastName: string;
  };
  applicationsCount?: number;
}

export interface CreateJobDto {
  title: string;
  description?: string;
  city: string;
  district: string;
  detailedAddress?: string;
  jobCategory: string;
  promotionLevel?: PromotionLevel;
  dailyWage: number;
  neededWorkers?: number;
  hasOvertime?: boolean;
  overtimeWage?: number;
  providedBenefits?: string[];
  shiftStartTime: string;
  shiftEndTime: string;
  startDate: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateJobDto {
  title?: string;
  description?: string;
  city?: string;
  district?: string;
  detailedAddress?: string;
  jobCategory?: string;
  promotionLevel?: PromotionLevel;
  dailyWage?: number;
  neededWorkers?: number;
  hasOvertime?: boolean;
  overtimeWage?: number;
  providedBenefits?: string[];
  shiftStartTime?: string;
  shiftEndTime?: string;
  startDate?: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
  status?: JobStatus;
}

export interface UpdateApplicationStatusDto {
  status: ApplicationStatus;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  applicantFollowUpStatus?: FollowUpStatus | null;
  applicantNote?: string | null;
  applicantNotedAt?: string | null;
  appliedAt: string;
  job?: {
    id: string;
    title: string;
    city?: string;
    district?: string;
    shiftStartTime?: string;
    shiftEndTime?: string;
    startDate?: string;
    dailyWage?: number;
  };
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      birthDate?: string;
      gender?: 'MALE' | 'FEMALE' | 'OTHER';
      availableDays?: WeekDay[];
      capabilities?: string[];
    };
  };
}

export interface UpdateMyApplicationNoteDto {
  followUpStatus?: FollowUpStatus;
  note?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface GetJobsParams {
  page?: number;
  limit?: number;
  category?: string;
  jobCategory?: string;
  latitude?: number;
  longitude?: number;
  radiusInMeters?: number;
}

export type GetJobsResponse = PaginatedResponse<Job>;
export type MyJobsResponse = PaginatedResponse<Job>;
export type MyApplicationsResponse = PaginatedResponse<JobApplication>;
