'use client';

import dayjs from 'dayjs';
import { Loader2, GitBranch, Folder, Timer, CalendarDays, User as UserIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { formatDuration } from '@/lib/utils/time';

import type { ProjectType } from '../api/getProjects';

export function ProjectDetails({ project, isLoading }: { project?: ProjectType; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="rounded-md border min-h-40 flex items-center justify-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  if (!project) {
    return (
      <Empty className="rounded-md border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>No Project Found</EmptyTitle>
          <EmptyDescription>We couldn't find the project you were looking for.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const created = project.createdAt ? dayjs(project.createdAt).format('DD MMM YYYY HH:mm') : '';
  const updated = project.updatedAt ? dayjs(project.updatedAt).format('DD MMM YYYY HH:mm') : '';

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription>Project overview and metadata</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Folder className="text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Project folder</div>
                <div className="font-medium break-all">{project.project_folder}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Timer className="text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Total time</div>
                <Badge variant="secondary">{formatDuration(project.total_time_spent ?? 0)}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className="text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Owner</div>
                <div className="font-medium break-all">{project.user}</div>
              </div>
            </div>
            {project.alternate_project && (
              <div className="flex items-center gap-3">
                <Folder className="text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Alternate project</div>
                  <div className="font-medium break-all">{project.alternate_project}</div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Created</div>
                <div className="font-medium">{created}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Updated</div>
                <div className="font-medium">{updated}</div>
              </div>
            </div>
          </div>

          {project.git_branches && project.git_branches.length > 0 && (
            <div className="grid gap-2">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <GitBranch className="text-muted-foreground" /> Git branches
              </div>
              <div className="flex flex-wrap gap-2">
                {project.git_branches.map((branch) => (
                  <Badge key={branch} variant="outline">{branch}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
