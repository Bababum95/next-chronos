import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { createAuthenticatedMutation } from '@/lib/utils/fetcher';

type Variables = {
  id: string;
  isArchived?: boolean;
};

type Options<T> = {
  onSuccess?: (data: T, variables: Variables) => Promise<unknown> | void;
};

export const useArchive = <T = unknown,>({
  onSuccess,
}: Options<T>): {
  toggleArchive: (variables: Variables) => Promise<void>;
  pendingArchiveId: string | null;
} => {
  const [pendingArchiveId, setPendingArchiveId] = useState<string | null>(null);

  const { mutateAsync } = useMutation<T, Error, Variables>({
    mutationFn: async ({ id, isArchived }: Variables) => {
      setPendingArchiveId(id);
      const endpoint = isArchived
        ? `/projects/remove-from-archive/${id}`
        : `/projects/add-to-archive/${id}`;

      return createAuthenticatedMutation<T>(endpoint, { method: 'PATCH' })();
    },
    onSuccess: async (data, variables) => {
      await onSuccess?.(data, variables);
      toast.success(variables.isArchived ? 'Project unarchived' : 'Project archived');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to archived');
    },
    onSettled: () => {
      setPendingArchiveId(null);
    },
  });

  const toggleArchive = async (variables: Variables) => {
    await mutateAsync(variables);
  };

  return {
    toggleArchive,
    pendingArchiveId,
  };
};
