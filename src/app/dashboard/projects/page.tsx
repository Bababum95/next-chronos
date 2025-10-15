'use client';

import { Plus } from 'lucide-react';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ProjectsTableContainer } from '@/features/projects';
import { useProjects } from '@/hooks/useProjects';

export default function Projects() {
  const { projects, isLoading, isError, error } = useProjects();

  return (
    <>
      <Header
        breadcrumb={{ current: 'Projects' }}
        extra={
          <Button size="sm">
            <Plus />
            Create
          </Button>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <ProjectsTableContainer
          items={projects}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error instanceof Error ? error.message : undefined}
        />
      </div>
    </>
  );
}
