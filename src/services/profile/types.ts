export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type WeekDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate?: string | null;
  gender?: Gender | null;
  capabilities: string[];
  availability: string[];
  availableDays: WeekDay[];
  isAvailable: boolean;
  longitude: number | null;
  latitude: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileDto {
  firstName: string;
  lastName: string;
  address: string;
  birthDate?: string;
  gender?: Gender;
  capabilities?: string[];
  availability?: string[];
  availableDays?: WeekDay[];
  isAvailable?: boolean;
  longitude?: number;
  latitude?: number;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  address?: string;
  birthDate?: string;
  gender?: Gender;
  capabilities?: string[];
  availability?: string[];
  availableDays?: WeekDay[];
  isAvailable?: boolean;
  longitude?: number;
  latitude?: number;
}

export interface NearbyParams {
  lng: string;
  lat: string;
  radius?: string;
  day?: WeekDay;
}
