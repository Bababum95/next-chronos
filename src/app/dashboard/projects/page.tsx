'use client';

import { FolderOpen } from 'lucide-react';

import { Header } from '@/components/layouts/Header';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { ProjectLoadingCard, ProjectsTable, useProjectsTable } from '@/features/projects';

export default function Projects() {
  const { table, isLoading, hasData, page, totalPages, nextPage, prevPage, canNext, canPrev } =
    useProjectsTable();

  return (
    <>
      <Header breadcrumb={{ current: 'Projects' }} />
      <div className="px-4 py-4 grid gap-4">
        {isLoading ? (
          <ProjectLoadingCard />
        ) : hasData ? (
          <ProjectsTable
            table={table}
            page={page}
            totalPages={totalPages}
            canPrev={canPrev}
            canNext={canNext}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : (
          <Empty className="rounded-md border">
            <EmptyContent>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle>No Projects Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any projects yet. Get started by creating your first
                project.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </>
  );
}
