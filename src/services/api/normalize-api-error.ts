import { isAxiosError } from "axios";

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};

export function normalizeApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    return {
      message: error.response?.data?.message ?? error.message ?? "Request failed.",
      status: error.response?.status,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unknown error.",
  };
}
