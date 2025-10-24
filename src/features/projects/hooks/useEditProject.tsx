'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { createAuthenticatedMutation } from '@/lib/utils/fetcher';
import { pick } from '@/lib/utils';

import type { ProjectApiResponse, ProjectFormData } from '../lib/types';

export const useEditProject = (id?: string) => {
  const [values, setValues] = useState<ProjectFormData>({});
  const { data, isLoading, refetch } = useQuery<ProjectApiResponse>({
    queryKey: id ? [`/projects/${id}`] : ['projects', 'detail'],
    enabled: !!id,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAuthenticatedMutation(`/projects/${id}`, { method: 'PATCH' }),
    onSuccess: () => {
      refetch();
      toast.success('Project updated successfully');
    },
  });

  const onSave = () => {
    if (isPending) return;
    mutateAsync(values);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSave();
  };

  useEffect(() => {
    if (data?.data) {
      const cleanData = pick(data.data, [
        'name',
        'description',
        'project_folder',
        'git_branches',
        'alternate_project',
        'is_favorite',
        'is_archived',
        'parent',
      ]);
      setValues(cleanData);
    }
  }, [data?.data]);

  const updateField = useCallback((field: keyof ProjectFormData, value: string | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    isLoading,
    values,
    updateField,
    isPending,
    onSave,
    initialState: data?.data,
    onSubmit: handleSubmit,
  };
};
