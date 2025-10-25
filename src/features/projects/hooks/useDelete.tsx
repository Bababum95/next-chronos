import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { createAuthenticatedMutation } from '@/lib/utils/fetcher';

type Variables = {
  id: string;
};

type Options<T> = {
  onSuccess?: (data: T, variables: Variables) => Promise<unknown> | void;
};

export const useDelete = <T = unknown,>({
  onSuccess,
}: Options<T>): {
  onDelete: (variables: Variables) => Promise<void>;
  deletingId: string | null;
} => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutateAsync } = useMutation<T, Error, Variables>({
    mutationFn: async ({ id }: Variables) => {
      setDeletingId(id);
      return createAuthenticatedMutation<T>(`/projects/${id}`, { method: 'DELETE' })();
    },
    onSuccess: async (data, variables) => {
      await onSuccess?.(data, variables);
      toast.success('Item successfully deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Could not delete this item');
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const onDelete = async (variables: Variables) => {
    await mutateAsync(variables);
  };

  return {
    onDelete,
    deletingId,
  };
};
