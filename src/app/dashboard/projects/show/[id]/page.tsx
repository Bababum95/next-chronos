'use client';

import { useRouter } from 'next/navigation';
import { ArchiveIcon, ClockIcon, MoreHorizontalIcon, SquarePen, Trash2Icon } from 'lucide-react';
import { use } from 'react';

import { Header } from '@/components/layouts/Header';
import { Button } from '@/components/ui/button';
import { useProjectDetails, useProjectActivities, ProjectDetails } from '@/features/projects';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProjectDetailsPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const routeId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  const { project, isLoading, items, refetch } = useProjectDetails(routeId);
  const activity = useProjectActivities(routeId);

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
                <DropdownMenuItem>
                  <ArchiveIcon />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ClockIcon />
                  Snooze
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon className="text-destructive" />
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
      </div>
    </>
  );
}
