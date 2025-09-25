'use client';

import { TrendingUp } from 'lucide-react';

import { useChartData } from './useChartData';
import { useSummaries } from './useSummaries';

import { ChartArea } from '@/components/ChartArea';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDuration } from '@/lib/utils/time';

export default function Dashboard() {
  const {
    timeRange,
    onChangeTimeRange,
    timeRanges,
    chartConfig,
    workActivity,
    isLoading: timeRangeLoading,
  } = useChartData();
  const { totalTime, isLoading: summariesLoading } = useSummaries();

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
      <div className="px-4 py-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Time (All Time)</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {summariesLoading ? <Skeleton className="w-full h-8" /> : totalTime}
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
                {timeRangeLoading ? <Skeleton className="w-full h-8" /> : workActivity.totalTimeStr}
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
          chartConfig={chartConfig}
          formatValue={formatValue}
        />
      </div>
    </>
  );
}
