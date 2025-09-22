import { ApiResponse, ValidationError } from '@/lib/validation';

// User types
export type User = {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt?: string;
};

// Auth API types
export type SignUpResponse = ApiResponse<User>;
export type SignInResponse = ApiResponse<User>;

// Heartbeat types
export type Heartbeat = {
  time: number;
  entity: string;
  is_write: boolean;
  lineno: number;
  cursorpos: number;
  lines_in_file: number;
  alternate_project?: string;
  git_branch?: string;
  project_folder?: string;
  project_root_count?: number;
  language?: string;
  category?: 'debugging' | 'ai coding' | 'building' | 'code reviewing';
  ai_line_changes?: number;
  human_line_changes?: number;
  is_unsaved_entity?: boolean;
};

export type HeartbeatsResponse = ApiResponse<{
  processed: number;
  heartbeats: Heartbeat[];
}>;

// Summary types
export type Summary = {
  totalTime: number;
};

export type SummariesResponse = ApiResponse<Summary>;

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
