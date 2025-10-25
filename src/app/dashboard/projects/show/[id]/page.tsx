'use client';

import { useRouter } from 'next/navigation';
import { Archive, ClockIcon, MoreHorizontalIcon, SquarePen, Trash2Icon } from 'lucide-react';
import { use } from 'react';

import { Header } from '@/components/layouts/Header';
import { Button } from '@/components/ui/button';
import {
  useProjectDetails,
  useProjectActivities,
  ProjectDetails,
  useProjectsTable,
  ProjectsTable,
  useDelete,
  useArchive,
} from '@/features/projects';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectDetailsPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const routeId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const { project, isLoading, items, refetch } = useProjectDetails(routeId);
  const { onDelete, deletingId } = useDelete({
    onSuccess: async () => router.push('/dashboard/projects'),
  });
  const { toggleArchive, pendingArchiveId } = useArchive({
    onSuccess: async () => await refetch(),
  });
  const activity = useProjectActivities(routeId);
  const { table, hasData, page, totalPages, nextPage, prevPage, canNext, canPrev } =
    useProjectsTable({
      root: false,
      parent: routeId,
    });

  return (
    <>
      <Header
        breadcrumb={{
          current: project?.name ?? 'Project Details',
          links: [{ label: 'Projects', href: '/dashboard/projects' }],
        }}
        extra={
          <ButtonGroup>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/dashboard/projects/edit/${routeId}`)}
            >
              <SquarePen size={14} />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" aria-label="More Options" variant="outline">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => toggleArchive({ id: routeId, isArchived: project?.is_archived })}
                  disabled={pendingArchiveId === routeId}
                >
                  {pendingArchiveId === routeId ? <Spinner /> : <Archive />}
                  {project?.is_archived ? 'Unarchive' : 'Archive'}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <ClockIcon />
                  Snooze
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete({ id: routeId })}>
                  {deletingId === routeId ? (
                    <Spinner className="text-destructive" />
                  ) : (
                    <Trash2Icon className="text-destructive" />
                  )}
                  Trash
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <ProjectDetails
          project={project}
          isLoading={isLoading}
          activity={activity}
          items={items}
          refetch={refetch}
        />

        {hasData && (
          <>
            <p>Packages</p>
            <ProjectsTable
              table={table}
              page={page}
              totalPages={totalPages}
              canPrev={canPrev}
              canNext={canNext}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </>
        )}
      </div>
    </>
  );
}
