'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { ApiResponse, FieldError, FormState } from '@/lib/validation';

type UseFormOptions<T> = {
  initialData: T;
  validators?: Partial<Record<keyof T, (value: unknown) => FieldError | null>>;
  onSubmit: (data: T) => Promise<ApiResponse>;
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
  redirectOnSuccess?: string;
};

export function useForm<T extends Record<string, unknown>>({
  initialData,
  validators = {},
  onSubmit,
  onSuccess,
  onError,
  redirectOnSuccess,
}: UseFormOptions<T>) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
    fieldErrors: {},
    success: false,
  });

  const updateField = useCallback(
    (field: keyof T, value: unknown) => {
      setFormState((prev) => {
        const newFieldErrors = { ...prev.fieldErrors };

        if (newFieldErrors[field as string]) {
          // If validator exists for this field, run it with the new value
          const validator = validators[field];
          if (validator) {
            const error = validator(value);
            if (error) {
              // If error still exists, update the error message (in case it changed)
              newFieldErrors[field as string] = error.message;
            } else {
              // No error, remove from field errors
              delete newFieldErrors[field as string];
            }
          } else {
            // No validator, remove error as before
            delete newFieldErrors[field as string];
          }
        }

        return {
          ...prev,
          data: { ...prev.data, [field]: value },
          // Clear general error when user starts typing
          error: null,
          fieldErrors: newFieldErrors,
        };
      });
    },
    [validators]
  );

  const validateForm = useCallback((): Record<string, string> => {
    const fieldErrors: Record<string, string> = {};

    for (const [field, validator] of Object.entries(validators)) {
      if (validator) {
        const error = validator(formState.data[field]);
        if (error) {
          fieldErrors[error.field] = error.message;
        }
      }
    }

    return fieldErrors;
  }, [formState.data, validators]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const fieldErrors = validateForm();
      const hasErrors = Object.keys(fieldErrors).length > 0;

      if (hasErrors) {
        Object.values(fieldErrors).forEach((error) => {
          toast.error(error);
        });

        setFormState((prev) => ({
          ...prev,
          fieldErrors,
          error: null,
        }));
        return;
      }

      setFormState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        fieldErrors: {},
      }));

      try {
        const response = await onSubmit(formState.data);

        if (response.success) {
          setFormState((prev) => ({
            ...prev,
            isLoading: false,
            success: true,
            error: null,
            fieldErrors: {},
          }));

          if (onSuccess) {
            onSuccess(response);
          }

          if (redirectOnSuccess) {
            router.push(redirectOnSuccess);
          }
        } else {
          // Handle API validation errors
          if (response.errors && response.errors.length > 0) {
            const fieldErrors: Record<string, string> = {};
            let generalError = '';

            response.errors.forEach((error) => {
              if (error.field) {
                fieldErrors[error.field] = error.message;
              } else {
                generalError = error.message;
              }
            });

            setFormState((prev) => ({
              ...prev,
              error: generalError || 'Validation failed',
              fieldErrors,
              isLoading: false,
            }));
          } else {
            setFormState((prev) => ({
              ...prev,
              error: response.message || 'Request failed',
              fieldErrors: {},
              isLoading: false,
            }));
          }

          if (onError) {
            onError(response.message || 'Request failed');
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error);
        const errorMessage = 'Network error. Please check your connection and try again.';
        setFormState((prev) => ({
          ...prev,
          error: errorMessage,
          fieldErrors: {},
          isLoading: false,
        }));

        if (onError) {
          onError(errorMessage);
        }
      }
    },
    [formState.data, validateForm, onSubmit, onSuccess, onError, redirectOnSuccess, router]
  );

  const resetForm = useCallback(() => {
    setFormState({
      data: initialData,
      isLoading: false,
      error: null,
      fieldErrors: {},
      success: false,
    });
  }, [initialData]);

  const setError = useCallback((error: string) => {
    setFormState((prev) => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setFormState((prev) => ({ ...prev, error: null }));
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setFormState((prev) => ({
      ...prev,
      fieldErrors: { ...prev.fieldErrors, [field]: error },
    }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFormState((prev) => {
      const newFieldErrors = { ...prev.fieldErrors };
      delete newFieldErrors[field];
      return { ...prev, fieldErrors: newFieldErrors };
    });
  }, []);

  const clearAllFieldErrors = useCallback(() => {
    setFormState((prev) => ({ ...prev, fieldErrors: {} }));
  }, []);

  return {
    formData: formState.data,
    isLoading: formState.isLoading,
    error: formState.error,
    fieldErrors: formState.fieldErrors,
    success: formState.success,
    updateField,
    handleSubmit,
    resetForm,
    setError,
    clearError,
    setFieldError,
    clearFieldError,
    clearAllFieldErrors,
    validateForm,
  };
}
