'use client';

import { TrendingUp } from 'lucide-react';

import { ChartArea } from '@/components/ChartArea';
import { ChartLineMultiple } from '@/components/ChartLineMultiple';
import { Header } from '@/components/Header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDuration } from '@/lib/utils/time';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useSummaries } from './useSummaries';
import { useChartData } from './useChartData';

export default function Dashboard() {
  const {
    timeRange,
    onChangeTimeRange,
    timeRanges,
    totalTimeStr,
    workActivity,
    isLoading: chartDataLoading,
    projectActivity,
  } = useChartData();
  const { totalTimeAllTime, isLoading: summariesLoading } = useSummaries();

  const formatValue = (value: number | string) => {
    return formatDuration(value as number);
  };

  return (
    <>
      <Header
        breadcrumb={{ current: 'Dashboard' }}
        extra={
          <Tabs value={timeRange} onValueChange={onChangeTimeRange}>
            <TabsList>
              {timeRanges.map((item) => (
                <TabsTrigger value={item.value} key={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Time (All Time)</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {summariesLoading ? <Skeleton className="w-full h-8" /> : totalTimeAllTime}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +8.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                More time logged this week <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Compared to the previous 4 weeks</div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Time ({timeRange})</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {chartDataLoading ? <Skeleton className="w-full h-8" /> : totalTimeStr}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +8.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                More time logged this week <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Compared to the previous 4 weeks</div>
            </CardFooter>
          </Card>
        </div>
        <ChartArea
          title="Work Activity"
          description="Tracked time across selected period"
          chartData={workActivity.chartData}
          chartConfig={workActivity.chartConfig}
          formatValue={formatValue}
        />
        <ChartLineMultiple
          title="Project Activity"
          description="Time spent per project"
          chartConfig={projectActivity.chartConfig}
          chartData={projectActivity.chartData}
          formatValue={formatValue}
        />
      </div>
    </>
  );
}
