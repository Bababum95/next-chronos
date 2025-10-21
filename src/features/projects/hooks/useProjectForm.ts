'use client';

import { useCallback, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { ProjectType } from '../lib/types';
import { updateProject, type ProjectUpdateInput } from '../api/updateProject';

export const ProjectFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  project_folder: z.string().min(1, 'Project folder is required').max(255),
  description: z.string().max(1000).optional().nullable(),
  git_branches: z.array(z.string().min(1)).optional().default([]),
  is_favorite: z.boolean().optional().default(false),
  is_archived: z.boolean().optional().default(false),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

export const useProjectForm = (project?: ProjectType) => {
  const router = useRouter();

  const defaultValues: ProjectFormValues = useMemo(
    () => ({
      name: project?.name ?? '',
      project_folder: project?.project_folder ?? '',
      description: project?.description ?? '',
      git_branches: project?.git_branches ?? [],
      is_favorite: project?.is_favorite ?? false,
      is_archived: project?.is_archived ?? false,
    }),
    [project]
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      if (!project?._id) throw new Error('Missing project id');
      // Only send fields present in the schema
      const payload: ProjectUpdateInput = {
        name: values.name,
        project_folder: values.project_folder,
        description: values.description ?? undefined,
        git_branches: values.git_branches ?? [],
        is_favorite: values.is_favorite ?? false,
        is_archived: values.is_archived ?? false,
      };
      return updateProject(project._id, payload);
    },
    onSuccess: (res) => {
      toast.success('Project updated successfully');
      const id = project?._id || res.data?._id;
      if (id) router.push(`/dashboard/projects/show/${id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });

  const onSubmit = useCallback(async (values: ProjectFormValues) => {
    await mutateAsync(values);
  }, [mutateAsync]);

  return { form: { defaultValues }, onSubmit, isSubmitting: isPending } as const;
};
