'use client';

import { SquarePen } from 'lucide-react';
import { use } from 'react';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ProjectDetails } from '@/features/projects/components/ProjectDetails';
import { useProjectDetails, useProjectActivities } from '@/features/projects';

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectDetailsPage({ params }: Props) {
  const resolvedParams = use(params);
  const routeId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const { project, isLoading, items } = useProjectDetails(routeId);
  const activity = useProjectActivities(routeId);

  return (
    <>
      <Header
        breadcrumb={{
          current: project?.name ?? 'Project Details',
          links: [{ label: 'Projects', href: '/dashboard/projects' }],
        }}
        extra={
          <Button size="sm">
            <SquarePen size={14} />
            Edit
          </Button>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <ProjectDetails project={project} isLoading={isLoading} activity={activity} items={items} />
      </div>
    </>
  );
}
