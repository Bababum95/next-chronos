'use client';

import { toast } from 'sonner';

import { SignUpResponse } from '@/lib/api/types';
import { useForm } from '@/lib/hooks/useForm';
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

export const useSignUp = () => {
  const initialData: SignUpFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const validators: Record<keyof SignUpFormData, (value: unknown) => FieldError | null> = {
    name: (value: unknown) => validateName(value as string),
    email: (value: unknown) => validateEmail(value as string),
    password: (value: unknown) => validatePassword(value as string),
    confirmPassword: (value: unknown) => {
      if (!formData?.password) {
        return { field: 'confirmPassword', message: 'Confirm password is required' };
      }
      return validatePasswordMatch(formData.password, value as string);
    },
    terms: (value: unknown) => validateTerms(value as boolean),
  };

  const onSubmit = async (data: SignUpFormData): Promise<SignUpResponse> => {
    const signUpData: SignUpInput = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      terms: data.terms,
    };

    const response = await fetch('/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpData),
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
    redirectOnSuccess: '/login?message=Account created successfully. Please sign in.',
  });

  // Override the updateField to handle confirmPassword validation
  const updateFieldWithValidation = (field: keyof SignUpFormData, value: string | boolean) => {
    updateField(field, value);

    // If password is updated, re-validate confirmPassword
    if (field === 'password' && formData.confirmPassword) {
      const confirmError = validatePasswordMatch(value as string, formData.confirmPassword);
      if (confirmError) {
        toast.error(confirmError.message);
        setFieldError('confirmPassword', confirmError.message);
      } else {
        clearFieldError('confirmPassword');
      }
    }
  };

  return {
    formData,
    state: {
      isLoading,
      error,
      fieldErrors,
      hasError: Object.keys(fieldErrors).length > 0 || !!error,
      success,
    },
    updateField: updateFieldWithValidation,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError,
  };
};
