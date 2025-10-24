'use client';

import { use } from 'react';

import { Header } from '@/components/layouts/Header';
import { ProjectForm, useEditProject } from '@/features/projects';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectEditPage({ params }: Props) {
  const resolvedParams = use(params);
  const routeId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const { initialState, isLoading, onSubmit, values, updateField, isPending, onSave } =
    useEditProject(routeId);

  return (
    <>
      <Header
        breadcrumb={{
          current: `Edit`,
          links: [
            { label: 'Projects', href: '/dashboard/projects' },
            {
              label: initialState?.name ?? 'Project',
              href: `/dashboard/projects/show/${routeId}`,
            },
          ],
        }}
      />
      <div className="px-4 py-4">
        <Card className="pt-0 gap-4 pb-4">
          <CardContent className="space-y-0 border-b py-5">
            <ProjectForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              values={values}
              updateField={updateField}
              projectId={routeId}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button isLoading={isPending} onClick={onSave}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
