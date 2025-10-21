'use client';

import { use } from 'react';

import { Header } from '@/components/layouts/Header';
import { ProjectForm } from '@/features/projects/components/ProjectForm';
import { useProjectDetails } from '@/features/projects';
import { useProjectForm } from '@/features/projects/hooks/useProjectForm';

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectEditPage({ params }: Props) {
  const resolvedParams = use(params);
  const routeId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const { project, isLoading } = useProjectDetails(routeId);
  const { form, onSubmit, isSubmitting } = useProjectForm(project);

  return (
    <>
      <Header
        breadcrumb={{
          current: project?.name ? `Edit ${project.name}` : 'Edit Project',
          links: [
            { label: 'Projects', href: '/dashboard/projects' },
            { label: project?.name ?? 'Project Details', href: `/dashboard/projects/show/${routeId}` },
          ],
        }}
      />
      <div className="px-4 py-4 grid gap-4">
        <ProjectForm defaultValues={form.defaultValues} onSubmit={onSubmit} isLoading={isSubmitting || isLoading} />
      </div>
    </>
  );
}
