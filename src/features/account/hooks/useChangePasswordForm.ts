import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAuthenticatedMutation } from '@/lib/utils/fetcher';
import {
  ChangePasswordInput,
  validateCurrentPassword,
  validateNewPassword,
  validatePasswordMatch,
} from '@/lib/validation';

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordState = {
  data: ChangePasswordFormData;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  success: boolean;
};

const initialFormData: ChangePasswordFormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const initialState: ChangePasswordState = {
  data: initialFormData,
  isLoading: false,
  error: null,
  fieldErrors: {},
  success: false,
};

export const useChangePasswordForm = () => {
  const [state, setState] = useState<ChangePasswordState>(initialState);

  const changePasswordMutation = useMutation({
    mutationFn: createAuthenticatedMutation('/users/me/password', { method: 'PUT' }),
    onSuccess: () => {
      setState((prev) => ({
        ...prev,
        data: initialFormData, // Clear password fields
        isLoading: false,
        success: true,
        error: null,
        fieldErrors: {},
      }));

      toast.success('Password changed successfully');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to change password';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        success: false,
      }));

      toast.error(errorMessage);
    },
  });

  const updateField = useCallback((field: keyof ChangePasswordFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      fieldErrors: {
        ...prev.fieldErrors,
        [field]: '', // Clear field error when user starts typing
      },
      error: null,
    }));
  }, []);

  const validateForm = useCallback((): null | string => {
    const { currentPassword, newPassword, confirmPassword } = state.data;

    // Validate current password
    const currentPasswordError = validateCurrentPassword(currentPassword);
    if (currentPasswordError) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          currentPassword: currentPasswordError.message,
        },
      }));
      return currentPasswordError.message;
    }

    // Validate new password
    const newPasswordError = validateNewPassword(newPassword);
    if (newPasswordError) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          newPassword: newPasswordError.message,
        },
      }));
      return newPasswordError.message;
    }

    // Validate password match
    const passwordMatchError = validatePasswordMatch(newPassword, confirmPassword);
    if (passwordMatchError) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          confirmPassword: passwordMatchError.message,
        },
      }));
      return passwordMatchError.message;
    }

    return null;
  }, [state.data]);

  const submitForm = useCallback(async (): Promise<boolean> => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return false;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      success: false,
    }));

    const changePasswordData: ChangePasswordInput = {
      currentPassword: state.data.currentPassword.trim(),
      newPassword: state.data.newPassword.trim(),
      confirmPassword: state.data.confirmPassword.trim(),
    };

    try {
      await changePasswordMutation.mutateAsync(changePasswordData);
      return true;
    } catch {
      return false;
    }
  }, [state.data, validateForm, changePasswordMutation]);

  const resetForm = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    currentPassword: state.data.currentPassword,
    newPassword: state.data.newPassword,
    confirmPassword: state.data.confirmPassword,
    isLoading: state.isLoading,
    error: state.error,
    fieldErrors: state.fieldErrors,
    success: state.success,
    updateField,
    submitForm,
    resetForm,
  };
};
