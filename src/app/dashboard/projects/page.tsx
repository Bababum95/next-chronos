'use client';

import { Plus } from 'lucide-react';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectsTable } from '@/components/ProjectsTable';
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
        <Card>
          <CardHeader className="flex items-center border-b py-4">
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isError ? (
              <div className="text-destructive p-4" role="alert">
                {error instanceof Error ? error.message : 'Failed to load projects'}
              </div>
            ) : (
              <ProjectsTable items={projects} isLoading={isLoading} />)
            }
          </CardContent>
        </Card>
      </div>
    </>
  );
}
