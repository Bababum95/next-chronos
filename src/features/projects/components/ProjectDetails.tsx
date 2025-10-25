'use client';

import { Folder, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import type { QueryObserverResult } from '@tanstack/react-query';

import { Card, CardTitle, CardDescription, CardAction, CardHeader } from '@/components/ui/card';
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
import { ChartArea } from '@/components/ui/chart-area';
import { TimeRangeSelector } from '@/features/time-range';
import { TooltipLite } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

import { useFavoriteMutation } from '../hooks/useFavoriteMutation';
import type {
  ActivityData,
  ProjectDetailsType,
  ProjectApiResponse,
  ProjectDetailItem,
} from '../lib/types';

import { ProjectLoadingCard } from './ProjectLoadingCard';

type Props = {
  project?: ProjectDetailsType;
  isLoading?: boolean;
  activity: ActivityData;
  refetch: () => Promise<QueryObserverResult<ProjectApiResponse, Error>>;
  items: ProjectDetailItem[];
};

export const ProjectDetails: FC<Props> = ({ project, isLoading, activity, items, refetch }) => {
  const router = useRouter();
  const { toggleFavorite, pendingFavoriteId } = useFavoriteMutation({
    onSuccess: async () => await refetch(),
  });

  if (isLoading) return <ProjectLoadingCard />;

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription>
            {project.description ?? 'Project overview and metadata'}
          </CardDescription>
          <CardAction>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => toggleFavorite({ id: project._id, isFavorite: project.is_favorite })}
              disabled={pendingFavoriteId === project._id}
            >
              {pendingFavoriteId === project._id ? (
                <Spinner />
              ) : (
                <Star fill={project.is_favorite ? 'currentColor' : 'none'} />
              )}
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <ItemGroup className="flex-row flex-wrap gap-2">
        {items.map(({ icon, description, value, url }) => (
          <Item
            key={description}
            variant="outline"
            className={cn(
              'flex-1 min-w-[320px] transition-all duration-200',
              url
                ? 'cursor-pointer hover:bg-muted/50 hover:shadow-sm active:scale-[0.98] active:bg-muted'
                : 'cursor-default'
            )}
            onClick={() => url && router.push(url)}
          >
            <ItemMedia variant="icon">{icon}</ItemMedia>
            <ItemContent className="gap-0">
              <ItemDescription>{description}</ItemDescription>
              <ItemTitle>{value}</ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
      <ChartArea
        title="Work activity"
        description={
          <div>
            <span className="hidden sm:inline">Total time </span>
            <span className="text-foreground h-3 inline-block">{activity.totalTimeStr}</span>
            <span className="hidden sm:inline"> during</span>
            <TooltipLite content={activity.formattedPeriod}>
              <span className="hidden sm:inline"> {activity.range.label}</span>
            </TooltipLite>
          </div>
        }
        extra={<TimeRangeSelector />}
        chartData={activity.chartData}
        chartConfig={activity.chartConfig}
        formatValue={formatDuration}
      />
    </>
  );
};
