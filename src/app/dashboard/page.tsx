'use client';

import { ChartArea } from '@/components/ui/chart-area';
import { Header } from '@/components/layouts/Header';
import { formatDuration } from '@/lib/utils/time';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTotalTimeSummary, useActivityAnalytics } from '@/features/dashboard';
import { TooltipLite } from '@/components/ui/tooltip';
import { ChartPieDonut } from '@/components/ChartPieDonut';
import { TimeRangeSelector } from '@/features/time-range';

export default function Dashboard() {
  const { totalTimeStr, workActivity, isLoading, formattedPeriod, projectActivity, timeRange } =
    useActivityAnalytics();
  const totalTime = useTotalTimeSummary();

  const period = formattedPeriod ? (
    <TooltipLite content={formattedPeriod}>
      <span>{timeRange.label}</span>
    </TooltipLite>
  ) : (
    timeRange.label
  );

  return (
    <>
      <Header breadcrumb={{ current: 'Dashboard' }} extra={<TimeRangeSelector />} />
      <div className="px-4 py-4 grid gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="grid gap-4">
            <Card>
              <CardContent>
                <CardDescription>Total Time (All Time)</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {totalTime.isLoading ? <Skeleton className="w-full h-8" /> : totalTime.allTime}
                </CardTitle>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardDescription>Total Time ({period})</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {isLoading ? <Skeleton className="w-full h-8" /> : totalTimeStr}
                </CardTitle>
              </CardContent>
            </Card>
          </div>
          <Card className="md:col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Time Spent by Projects</CardTitle>
              <CardDescription>
                {isLoading ? <Skeleton className="w-[180px] h-5" /> : formattedPeriod}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isLoading && projectActivity.chartData?.length < 1 ? (
                <div className="flex items-center justify-center h-48 text-muted-foreground">
                  No activity in the selected period
                </div>
              ) : (
                <ChartPieDonut
                  chartConfig={projectActivity.chartConfig}
                  chartData={projectActivity.chartData}
                  formatValue={formatDuration}
                  dataKey="time"
                  nameKey="project"
                />
              )}
            </CardContent>
          </Card>
        </div>
        <ChartArea
          title="Work Activity"
          description={<>Tracked time on {period}</>}
          chartData={workActivity.chartData}
          chartConfig={workActivity.chartConfig}
          formatValue={formatDuration}
        />
      </div>
    </>
  );
}
