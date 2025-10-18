import { HeartbeatDoc } from '@/lib/mongoose/models/heartbeat';
import { ApiResponse, ValidationError } from '@/lib/validation';
import type { UserDoc } from '@/lib/mongoose/models/user';

export type UserResponse = ApiResponse<UserDoc>;
export type HeartbeatsResponse = ApiResponse<{
  processed: number;
  heartbeats: HeartbeatDoc[];
}>;

// Summary types
export type Summary = {
  totalTime: number;
};

export type Activity = {
  time_spent: number;
  timestamp: number;
};

export type SummariesResponse = ApiResponse<Summary>;
export type SummariesRangeResponse = ApiResponse<{
  totalTime: number;
  totalTimeStr: string;
  activities?: (Activity & {
    root_project?: {
      _id: string;
      name: string;
    } | null;
  })[][];
  start: number;
  end: number;
}>;

// API Error types
export type ApiError = {
  success: false;
  message: string;
  errors?: ValidationError[];
  code?: string;
};

// Generic API response helper
export function createApiResponse<T>(
  success: boolean,
  message: string,
  data?: T,
  errors?: ValidationError[]
): ApiResponse<T> {
  return {
    success,
    message,
    data,
    errors,
  };
}

// Success response helper
export function createSuccessResponse<T>(message: string, data: T): ApiResponse<T> {
  return createApiResponse(true, message, data);
}

// Error response helper
export function createErrorResponse(
  message: string,
  errors?: ValidationError[],
  code?: string
): ApiError {
  return {
    success: false,
    message,
    errors,
    code,
  };
}
