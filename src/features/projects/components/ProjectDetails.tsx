'use client';

import { Loader2, Folder } from 'lucide-react';
import type { FC } from 'react';

import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
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

import type { ActivityData, ProjectType } from '../lib/types';

type Props = {
  project?: ProjectType;
  isLoading?: boolean;
  activity: ActivityData;
  items: {
    icon: React.ReactNode;
    description: string;
    value?: string;
  }[];
};

export const ProjectDetails: FC<Props> = ({ project, isLoading, activity, items }) => {
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

  return (
    <>
      <Card>
        <CardContent>
          <CardTitle className="text-xl mb-1">{project.name}</CardTitle>
          <CardDescription>Project overview and metadata</CardDescription>
        </CardContent>
      </Card>
      <ItemGroup className="flex-row flex-wrap gap-2">
        {items.map(({ icon, description, value }) => (
          <Item key={description} variant="outline" className="flex-1 min-w-[320px]">
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
            <span className="text-foreground">{activity.totalTimeStr}</span>
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
