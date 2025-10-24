import { FC } from 'react';

import { FormField } from '@/components/forms/FormField';
import { TextareaFormField } from '@/components/forms/TextareaFormField';
import { ResourceSelect } from '@/components/forms/ResourceSelect';

import { ProjectFormData } from '../lib/types';

import { ProjectLoadingCard } from './ProjectLoadingCard';

type Props = {
  isLoading?: boolean;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  values: ProjectFormData;
  updateField: (field: keyof ProjectFormData, value: string | null) => void;
  projectId: string;
};

export const ProjectForm: FC<Props> = ({ isLoading, onSubmit, values, updateField, projectId }) => {
  if (isLoading) return <ProjectLoadingCard border={false} />;

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
      <FormField
        id="name"
        label="Project Name"
        type="text"
        placeholder="Enter project name"
        value={values.name ?? ''}
        onChange={(e) => updateField('name', e.target.value)}
        // error={fieldErrors.name}
        required
      />
      <ResourceSelect
        resource="projects"
        placeholder="Root project"
        value={values.parent ?? ''}
        onChange={(value) => updateField('parent', value)}
        filter={[projectId]}
        label="Parent project"
      />
      <TextareaFormField
        wrapperClassName="col-span-2"
        id="description"
        label="Description"
        placeholder="Enter project description"
        value={values.description ?? ''}
        onChange={(e) => updateField('description', e.target.value)}
        // error={fieldErrors.description}
        required
      />
    </form>
  );
};
