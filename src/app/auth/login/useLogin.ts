'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { UserResponse } from '@/lib/api/types';
import { tokenStorage } from '@/lib/utils/auth';
import { createAuthenticatedMutation } from '@/lib/utils/fetcher';
import { FieldError, SignInInput, validateEmail, validatePassword } from '@/lib/validation';

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const INITIAL_STATE = {
  email: '',
  password: '',
  remember: false,
};

// Login mutation function
const loginUser = createAuthenticatedMutation<UserResponse, SignInInput>('/api/v1/auth/signin');

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<LoginFormData>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validators: Record<keyof LoginFormData, (value: unknown) => FieldError | null> = {
    email: (value: unknown) => validateEmail(value as string),
    password: (value: unknown) => validatePassword(value as string),
    remember: () => null,
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response: UserResponse) => {
      if (response.success && response.data?.apiKey) {
        // Save token to cookies
        tokenStorage.setToken(response.data.apiKey, formData.remember ? 30 : 7);

        // Redirect to dashboard or the originally requested page
        const redirectTo = searchParams.get('redirect') || '/dashboard';
        router.push(redirectTo);
      } else {
        toast.error(response.message || 'Login failed');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const updateField = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    for (const [field, validator] of Object.entries(validators)) {
      const error = validator(formData[field as keyof LoginFormData]);
      if (error) {
        errors[error.field] = error.message;
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    setFieldErrors({});

    const loginData: SignInInput = {
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
    };

    loginMutation.mutate(loginData);
  };

  const resetForm = () => {
    setFormData(INITIAL_STATE);
    setFieldErrors({});
  };

  const setFieldError = (field: string, error: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    formData,
    state: {
      isLoading: loginMutation.isPending,
      error: loginMutation.error?.message || null,
      fieldErrors,
      hasError: Object.keys(fieldErrors).length > 0 || !!loginMutation.error,
      success: loginMutation.isSuccess,
    },
    updateField,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError,
  };
};
