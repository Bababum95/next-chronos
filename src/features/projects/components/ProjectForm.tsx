'use client';

import { FC, useEffect, useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';

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

export interface ProjectFormProps {
  defaultValues?: Partial<ProjectType>;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectForm: FC<ProjectFormProps> = ({ defaultValues, onSubmit, isLoading }) => {
  const initialValues = useMemo<ProjectFormValues>(
    () => ({
      name: defaultValues?.name ?? '',
      project_folder: defaultValues?.project_folder ?? '',
      description: defaultValues?.description ?? '',
      git_branches: defaultValues?.git_branches ?? [],
      is_favorite: defaultValues?.is_favorite ?? false,
      is_archived: defaultValues?.is_archived ?? false,
    }),
    [defaultValues]
  );

  const form = useForm<ProjectFormValues>({
    defaultValues: initialValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  // Keep values in sync when defaults change
  useEffect(() => {
    form.reset(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const errors = form.state.errors;

  const handleAddBranch = () => {
    const value = prompt('Enter branch name');
    if (value && value.trim()) {
      const current = form.state.values.git_branches ?? [];
      form.setFieldValue('git_branches', [...current, value.trim()]);
    }
  };

  const handleRemoveBranch = (index: number) => {
    const current = form.state.values.git_branches ?? [];
    form.setFieldValue(
      'git_branches',
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>
              <FieldTitle>Name</FieldTitle>
              <Input
                value={form.state.values.name}
                onChange={(e) => form.setFieldValue('name', e.target.value)}
                onBlur={() => form.validateField('name', ProjectFormSchema.shape.name)}
                placeholder="Project name"
              />
            </FieldLabel>
            <FieldError errors={errors.name ? [{ message: errors.name as unknown as string }] : []} />
          </Field>

          <Field>
            <FieldLabel>
              <FieldTitle>Project folder</FieldTitle>
              <Input
                value={form.state.values.project_folder}
                onChange={(e) => form.setFieldValue('project_folder', e.target.value)}
                onBlur={() => form.validateField('project_folder', ProjectFormSchema.shape.project_folder)}
                placeholder="/path/to/folder"
              />
            </FieldLabel>
            <FieldError
              errors={
                errors.project_folder ? [{ message: errors.project_folder as unknown as string }] : []
              }
            />
          </Field>

          <Field>
            <FieldLabel>
              <FieldTitle>Description</FieldTitle>
              <Input
                value={form.state.values.description ?? ''}
                onChange={(e) => form.setFieldValue('description', e.target.value)}
                onBlur={() => form.validateField('description', ProjectFormSchema.shape.description)}
                placeholder="Optional description"
              />
            </FieldLabel>
            <FieldError
              errors={errors.description ? [{ message: errors.description as unknown as string }] : []}
            />
          </Field>

          <Field>
            <FieldLabel>
              <FieldTitle>Git branches</FieldTitle>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {(form.state.values.git_branches || []).map((branch, index) => (
                    <div key={`${branch}-${index}`} className="flex items-center gap-2">
                      <Input
                        value={branch}
                        onChange={(e) => {
                          const next = [...(form.state.values.git_branches || [])];
                          next[index] = e.target.value;
                          form.setFieldValue('git_branches', next);
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
              errors={errors.git_branches ? [{ message: errors.git_branches as unknown as string }] : []}
            />
          </Field>

          <Field>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={Boolean(form.state.values.is_favorite)}
                  onCheckedChange={(v) => form.setFieldValue('is_favorite', Boolean(v))}
                />
                <span>Favorite</span>
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={Boolean(form.state.values.is_archived)}
                  onCheckedChange={(v) => form.setFieldValue('is_archived', Boolean(v))}
                />
                <span>Archived</span>
              </label>
            </div>
            <FieldError
              errors={errors.is_favorite ? [{ message: errors.is_favorite as unknown as string }] : []}
            />
            <FieldError
              errors={errors.is_archived ? [{ message: errors.is_archived as unknown as string }] : []}
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
