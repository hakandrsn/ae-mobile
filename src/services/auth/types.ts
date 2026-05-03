export interface RegisterDto {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface User {
  id: string;
  email: string;
  type: 'user' | 'business';
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  jobPostCredits: number;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
