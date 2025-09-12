'use client';

import { SignInResponse } from '@/lib/api/types';
import { useForm } from '@/lib/hooks/useForm';
import { FieldError, SignInInput, validateEmail, validatePassword } from '@/lib/validation';

type LoginFormData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const initialData: LoginFormData = {
    email: '',
    password: '',
  };

  const validators: Record<keyof LoginFormData, (value: unknown) => FieldError | null> = {
    email: (value: unknown) => validateEmail(value as string),
    password: (value: unknown) => validatePassword(value as string),
  };

  const onSubmit = async (data: LoginFormData): Promise<SignInResponse> => {
    const loginData: SignInInput = {
      email: data.email.toLowerCase().trim(),
      password: data.password,
    };

    const response = await fetch('/api/v1/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    return response.json();
  };

  const {
    formData,
    isLoading,
    error,
    fieldErrors,
    success,
    updateField,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError,
  } = useForm({
    initialData,
    validators,
    onSubmit,
    redirectOnSuccess: '/?message=Welcome back!',
  });

  return {
    formData,
    state: {
      isLoading,
      error,
      fieldErrors,
      hasError: Object.keys(fieldErrors).length > 0 || !!error,
      success,
    },
    updateField,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError,
  };
};
