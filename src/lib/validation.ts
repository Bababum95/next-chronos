import { z } from 'zod';

// Common types for form validation
export type ValidationError = {
  path: string;
  message: string;
  field?: string; // Field name for client-side validation
};

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
};

export type FieldError = {
  field: string;
  message: string;
};

export type FormState<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>; // Field-specific errors
  success: boolean;
};

export const HeartbeatsSchema = z.object({
  heartbeats: z
    .array(
      z.object({
        time: z.number(),
        entity: z.string(),
        is_write: z.boolean(),
        lineno: z.number(),
        cursorpos: z.number(),
        lines_in_file: z.number(),
        alternate_project: z.string().optional(),
        git_branch: z.string().optional(),
        project_folder: z.string().optional(),
        project_root_count: z.number().optional(),
        language: z.string().optional(),
        category: z.enum(['debugging', 'ai coding', 'building', 'code reviewing']).optional(),
        ai_line_changes: z.number().optional(),
        human_line_changes: z.number().optional(),
        is_unsaved_entity: z.boolean().optional(),
      })
    )
    .min(1, 'At least one heartbeat is required'),
});

export const SummariesQuerySchema = z.object({
  start: z.string().min(1),
  end: z.string().min(1),
  full: z.string().optional(),
});

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name cannot exceed 50 characters')
      .trim(),
    email: z.email('Please enter a valid email address').toLowerCase().trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(100, 'Password cannot exceed 100 characters'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignInSchema = z.object({
  email: z.email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export const ApiKeySchema = z.object({
  apiKey: z
    .string()
    .min(1, 'API key is required')
    .regex(
      /^(chronos_)?[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      'Invalid API key format'
    ),
});

export type HeartbeatsInput = z.infer<typeof HeartbeatsSchema>;
export type SummariesQuery = z.infer<typeof SummariesQuerySchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type ApiKeyInput = z.infer<typeof ApiKeySchema>;

export function parseOrThrow<T>(schema: z.ZodTypeAny, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
      field: i.path[0] as string, // Add field name for client-side mapping
    }));
    const error = new Error('ValidationError');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).details = issues;
    throw error;
  }
  return result.data as T;
}

// Common validation functions
export function validateWithSchema<T>(schema: z.ZodTypeAny, data: unknown): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
      field: i.path[0] as string, // Add field name for client-side mapping
    }));
    return { success: false, errors };
  }
  return { success: true, data: result.data as T };
}

// Client-side validation helpers
export function validateEmail(email: string): FieldError | null {
  if (!email.trim()) return { field: 'email', message: 'Email is required' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { field: 'email', message: 'Please enter a valid email address' };
  return null;
}

export function validatePassword(password: string): FieldError | null {
  if (!password) return { field: 'password', message: 'Password is required' };
  if (password.length < 6)
    return { field: 'password', message: 'Password must be at least 6 characters long' };
  if (password.length > 100)
    return { field: 'password', message: 'Password cannot exceed 100 characters' };
  return null;
}

export function validateName(name: string): FieldError | null {
  if (!name.trim()) return { field: 'name', message: 'Name is required' };
  if (name.length < 2) return { field: 'name', message: 'Name must be at least 2 characters long' };
  if (name.length > 50) return { field: 'name', message: 'Name cannot exceed 50 characters' };
  return null;
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): FieldError | null {
  if (password !== confirmPassword) {
    return { field: 'confirmPassword', message: "Passwords don't match" };
  }
  return null;
}

export function validateTerms(terms: boolean): FieldError | null {
  if (!terms) return { field: 'terms', message: 'You must agree to the terms and conditions' };
  return null;
}

// Generic form validation
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  validators: Partial<Record<keyof T, (value: unknown) => FieldError | null>>
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const [field, validator] of Object.entries(validators)) {
    if (validator) {
      const error = validator(data[field]);
      if (error) {
        fieldErrors[error.field] = error.message;
      }
    }
  }

  return fieldErrors;
}
