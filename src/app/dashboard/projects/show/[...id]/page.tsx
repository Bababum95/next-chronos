"use client";

import { SquarePen } from 'lucide-react';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ProjectDetails } from '@/features/projects/components/ProjectDetails';
import { useProjectQuery } from '@/features/projects/api/getProject';

type PageProps = {
  params: { id: string[] };
};

export default function ProjectDetailsPage({ params }: PageProps) {
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isLoading } = useProjectQuery(routeId);
  const project = data?.data;

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
        <ProjectDetails project={project} isLoading={isLoading} />
      </div>
    </>
  );
}
