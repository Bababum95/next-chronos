import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authenticatedFetch } from '@/lib/utils/fetcher';
import { useUser } from '@/lib/hooks/useUser';

type AvatarUploadState = {
  isUploading: boolean;
  error: string | null;
};

const initialState: AvatarUploadState = {
  isUploading: false,
  error: null,
};

export const useAvatarUpload = () => {
  const { refreshUser } = useUser();
  const [state, setState] = useState<AvatarUploadState>(initialState);

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await authenticatedFetch('/api/v1/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to upload avatar');
      }

      return result;
    },
    onSuccess: async () => {
      // Refresh user data from server
      await refreshUser();

      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: null,
      }));

      toast.success('Avatar uploaded successfully');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to upload avatar';

      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: errorMessage,
      }));

      toast.error(errorMessage);
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: async () => {
      const response = await authenticatedFetch('/api/v1/upload/avatar/delete', {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete avatar');
      }

      return result.data;
    },
    onSuccess: async () => {
      // Refresh user data from server
      await refreshUser();

      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: null,
      }));

      toast.success('Avatar deleted successfully');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to delete avatar';

      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: errorMessage,
      }));

      toast.error(errorMessage);
    },
  });

  const uploadAvatar = useCallback(
    async (file: File) => {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        const errorMessage = 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
        }));
        toast.error(errorMessage);
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        const errorMessage = 'File too large. Maximum size is 5MB.';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
        }));
        toast.error(errorMessage);
        return;
      }

      setState((prev) => ({
        ...prev,
        isUploading: true,
        error: null,
      }));

      uploadAvatarMutation.mutate(file);
    },
    [uploadAvatarMutation]
  );

  const deleteAvatar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isUploading: true,
      error: null,
    }));

    deleteAvatarMutation.mutate();
  }, [deleteAvatarMutation]);

  return {
    isUploading: state.isUploading,
    error: state.error,
    uploadAvatar,
    deleteAvatar,
  };
};
