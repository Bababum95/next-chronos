import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUser } from '@/lib/hooks/useUser';
import { createAuthenticatedMutation } from '@/lib/utils/fetcher';
import { UpdateProfileInput, validateEmail, validateName } from '@/lib/validation';

type EditProfileFormData = {
  name: string;
  email: string;
};

type EditProfileState = {
  data: EditProfileFormData;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  success: boolean;
};

const initialFormData: EditProfileFormData = {
  name: '',
  email: '',
};

const initialState: EditProfileState = {
  data: initialFormData,
  isLoading: false,
  error: null,
  fieldErrors: {},
  success: false,
};

export const useEditProfileForm = () => {
  const { user, refreshUser } = useUser();

  const [state, setState] = useState<EditProfileState>(() => ({
    ...initialState,
    data: {
      name: user?.name || '',
      email: user?.email || '',
    },
  }));

  const updateProfileMutation = useMutation({
    mutationFn: createAuthenticatedMutation('/users/me', { method: 'PUT' }),
    onSuccess: async () => {
      // Refresh user data from server
      await refreshUser();

      setState((prev) => ({
        ...prev,
        isLoading: false,
        success: true,
        error: null,
        fieldErrors: {},
      }));

      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to update profile';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        success: false,
      }));

      toast.error(errorMessage);
    },
  });

  const updateField = useCallback((field: keyof EditProfileFormData, value: string) => {
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
    const { name, email } = state.data;

    // Validate name using existing validation function
    const nameError = validateName(name);
    if (nameError) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          name: nameError.message,
        },
      }));
      return nameError.message;
    }

    // Validate email using existing validation function
    const emailError = validateEmail(email);
    if (emailError) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          email: emailError.message,
        },
      }));
      return emailError.message;
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

    const updateData: UpdateProfileInput = {};

    if (state.data.name !== user?.name) {
      updateData.name = state.data.name.trim();
    }

    if (state.data.email !== user?.email) {
      updateData.email = state.data.email.trim();
    }

    // If no changes, show message and return
    if (Object.keys(updateData).length === 0) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      return true;
    }

    try {
      await updateProfileMutation.mutateAsync(updateData);

      return true;
    } catch {
      return false;
    }
  }, [state.data, user, validateForm, updateProfileMutation]);

  const resetForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      data: {
        name: user?.name || '',
        email: user?.email || '',
      },
      error: null,
      fieldErrors: {},
      success: false,
    }));
  }, [user]);

  return {
    // Form data
    name: state.data.name,
    email: state.data.email,
    avatarUrl: user?.avatarUrl,

    // Form state
    isLoading: state.isLoading,
    error: state.error,
    fieldErrors: state.fieldErrors,
    success: state.success,

    // Actions
    updateField,
    submitForm,
    resetForm,
  };
};
