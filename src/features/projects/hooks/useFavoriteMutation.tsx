import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { createAuthenticatedMutation } from '@/lib/utils/fetcher';

type Variables = {
  id: string;
  isFavorite?: boolean;
};

type Options<T> = {
  onSuccess?: (data: T, variables: Variables) => Promise<unknown> | void;
};

export const useFavoriteMutation = <T = unknown,>({
  onSuccess,
}: Options<T>): {
  toggleFavorite: (variables: Variables) => Promise<void>;
  pendingFavoriteId: string | null;
} => {
  const [pendingFavoriteId, setPendingFavoriteId] = useState<string | null>(null);

  const { mutateAsync } = useMutation<T, Error, Variables>({
    mutationFn: async ({ id, isFavorite }: Variables) => {
      setPendingFavoriteId(id);
      const endpoint = isFavorite
        ? `/projects/remove-from-favorite/${id}`
        : `/projects/add-to-favorite/${id}`;

      return createAuthenticatedMutation<T>(endpoint, { method: 'PATCH' })();
    },
    onSuccess: async (data, variables) => {
      await onSuccess?.(data, variables);
      toast.success(
        variables.isFavorite ? 'Project removed from favorites' : 'Project added to favorites'
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update favorite status');
    },
    onSettled: () => {
      setPendingFavoriteId(null);
    },
  });

  const toggleFavorite = async (variables: Variables) => {
    await mutateAsync(variables);
  };

  return {
    toggleFavorite,
    pendingFavoriteId,
  };
};
