'use client';

import { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import type { ProjectType } from '../lib/types';
import { ProjectFormSchema, type ProjectFormValues } from '../hooks/useProjectForm';

// Schema and type imported from hook to keep a single source of truth

export interface ProjectFormProps {
  defaultValues?: Partial<ProjectType>;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectForm: FC<ProjectFormProps> = ({ defaultValues, onSubmit, isLoading }) => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      project_folder: defaultValues?.project_folder ?? '',
      description: defaultValues?.description ?? '',
      git_branches: defaultValues?.git_branches ?? [],
      is_favorite: defaultValues?.is_favorite ?? false,
      is_archived: defaultValues?.is_archived ?? false,
    },
  });

  const errors = form.formState.errors;

  // Keep form values in sync when defaultValues change (e.g., after data loads)
  useEffect(() => {
    form.reset({
      name: defaultValues?.name ?? '',
      project_folder: defaultValues?.project_folder ?? '',
      description: defaultValues?.description ?? '',
      git_branches: defaultValues?.git_branches ?? [],
      is_favorite: defaultValues?.is_favorite ?? false,
      is_archived: defaultValues?.is_archived ?? false,
    });
  }, [defaultValues, form]);

  const handleAddBranch = () => {
    const value = prompt('Enter branch name');
    if (value && value.trim()) {
      const current = form.getValues('git_branches') || [];
      form.setValue('git_branches', [...current, value.trim()], { shouldValidate: true });
    }
  };

  const handleRemoveBranch = (index: number) => {
    const current = form.getValues('git_branches') || [];
    form.setValue(
      'git_branches',
      current.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        await onSubmit(data);
      })}
      className="space-y-6"
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>
              <FieldTitle>Name</FieldTitle>
              <Input {...form.register('name')} placeholder="Project name" />
            </FieldLabel>
            <FieldError errors={errors.name ? [{ message: errors.name.message }] : []} />
          </Field>

          <Field>
            <FieldLabel>
              <FieldTitle>Project folder</FieldTitle>
              <Input {...form.register('project_folder')} placeholder="/path/to/folder" />
            </FieldLabel>
            <FieldError
              errors={errors.project_folder ? [{ message: errors.project_folder.message }] : []}
            />
          </Field>

          <Field>
            <FieldLabel>
              <FieldTitle>Description</FieldTitle>
              <Input {...form.register('description')} placeholder="Optional description" />
            </FieldLabel>
            <FieldError
              errors={errors.description ? [{ message: errors.description.message }] : []}
            />
          </Field>

          <Field>
            <FieldLabel>
              <FieldTitle>Git branches</FieldTitle>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {(form.watch('git_branches') || []).map((branch, index) => (
                    <div key={`${branch}-${index}`} className="flex items-center gap-2">
                      <Input
                        value={branch}
                        onChange={(e) => {
                          const next = [...(form.getValues('git_branches') || [])];
                          next[index] = e.target.value;
                          form.setValue('git_branches', next, { shouldValidate: true });
                        }}
                        className="w-64"
                      />
                      <Button type="button" variant="secondary" onClick={() => handleRemoveBranch(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div>
                  <Button type="button" variant="outline" onClick={handleAddBranch}>
                    Add branch
                  </Button>
                </div>
              </div>
            </FieldLabel>
            <FieldError
              errors={errors.git_branches ? [{ message: errors.git_branches.message as string }] : []}
            />
          </Field>

          <Field>
            <div className="flex items-center gap-6">
              <Controller
                control={form.control}
                name="is_favorite"
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                    <span>Favorite</span>
                  </label>
                )}
              />

              <Controller
                control={form.control}
                name="is_archived"
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                    <span>Archived</span>
                  </label>
                )}
              />
            </div>
            <FieldError
              errors={errors.is_favorite ? [{ message: errors.is_favorite.message as string }] : []}
            />
            <FieldError
              errors={errors.is_archived ? [{ message: errors.is_archived.message as string }] : []}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex gap-2">
        <Button type="submit" isLoading={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  );
};
