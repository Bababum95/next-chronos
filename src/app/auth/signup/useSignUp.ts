'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { SignUpResponse } from '@/lib/api/types';
import { tokenStorage } from '@/lib/utils/auth';
import { createAuthenticatedMutation } from '@/lib/utils/fetcher';
import {
  FieldError,
  SignUpInput,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordMatch,
  validateTerms,
} from '@/lib/validation';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

// Sign up mutation function
const signUpUser = createAuthenticatedMutation<SignUpResponse, SignUpInput>('/api/v1/auth/signup');

export const useSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validators: Record<keyof SignUpFormData, (value: unknown) => FieldError | null> = {
    name: (value: unknown) => validateName(value as string),
    email: (value: unknown) => validateEmail(value as string),
    password: (value: unknown) => validatePassword(value as string),
    confirmPassword: (value: unknown) => {
      if (!formData.password) {
        return { field: 'confirmPassword', message: 'Confirm password is required' };
      }
      return validatePasswordMatch(formData.password, value as string);
    },
    terms: (value: unknown) => validateTerms(value as boolean),
  };

  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (response: SignUpResponse) => {
      if (response.success && response.data?.apiKey) {
        // Save token to cookies and redirect to dashboard
        tokenStorage.setToken(response.data.apiKey, 7);

        toast.success('Account created successfully!');
        router.push('/dashboard');
      } else {
        toast.error(response.message || 'Sign up failed');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Sign up failed');
    },
  });

  const updateField = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // If password is updated, re-validate confirmPassword
    if (field === 'password' && formData.confirmPassword) {
      const confirmError = validatePasswordMatch(value as string, formData.confirmPassword);
      if (confirmError) {
        setFieldErrors((prev) => ({ ...prev, confirmPassword: confirmError.message }));
      } else {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    for (const [field, validator] of Object.entries(validators)) {
      const error = validator(formData[field as keyof SignUpFormData]);
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

    const signUpData: SignUpInput = {
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      terms: formData.terms,
    };

    signUpMutation.mutate(signUpData);
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
      isLoading: signUpMutation.isPending,
      error: signUpMutation.error?.message || null,
      fieldErrors,
      hasError: Object.keys(fieldErrors).length > 0 || !!signUpMutation.error,
      success: signUpMutation.isSuccess,
    },
    updateField,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError,
  };
};
