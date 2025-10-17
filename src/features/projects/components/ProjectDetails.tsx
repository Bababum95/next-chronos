'use client';

import dayjs from 'dayjs';
import { Loader2, GitBranch, Folder, Timer, CalendarDays } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { formatDuration } from '@/lib/utils/time';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import type { ProjectType } from '../api/getProjects';

export function ProjectDetails({
  project,
  isLoading,
}: {
  project?: ProjectType;
  isLoading?: boolean;
}) {
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

  const created = project.createdAt ? dayjs(project.createdAt).format('DD MMM YYYY') : '';

  return (
    <>
      <Card>
        <CardContent>
          <CardTitle className="text-xl mb-1">{project.name}</CardTitle>
          <CardDescription>Project overview and metadata</CardDescription>
        </CardContent>
      </Card>
      <ItemGroup className="flex-row flex-wrap gap-2">
        <Item variant="outline" className="flex-1 min-w-[320px]">
          <ItemMedia variant="icon">
            <Folder />
          </ItemMedia>
          <ItemContent>
            <ItemDescription>Project folder</ItemDescription>
            <ItemTitle>{project.project_folder}</ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="flex-1 min-w-[320px]">
          <ItemMedia variant="icon">
            <Folder />
          </ItemMedia>
          <ItemContent>
            <ItemDescription>Alternate project</ItemDescription>
            <ItemTitle>{project.alternate_project}</ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="flex-1 min-w-[320px]">
          <ItemMedia variant="icon">
            <CalendarDays />
          </ItemMedia>
          <ItemContent>
            <ItemDescription>Created</ItemDescription>
            <ItemTitle>{created}</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </>
  );
}
