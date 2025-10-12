'use client';

import { ChartArea } from '@/components/ChartArea';
import { Header } from '@/components/Header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDuration } from '@/lib/utils/time';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTotalTimeSummary, useActivityAnalytics } from '@/features/dashboard';
import { TooltipLite } from '@/components/ui/tooltip';
import { ChartPieDonut } from '@/components/ChartPieDonut';

export default function Dashboard() {
  const {
    timeRange,
    onChangeTimeRange,
    timeRanges,
    totalTimeStr,
    workActivity,
    isLoading,
    period,
    projectActivity,
  } = useActivityAnalytics();
  const totalTime = useTotalTimeSummary();

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
          <div className="grid gap-2">
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
                <CardDescription>
                  Total Time
                  {period && (
                    <TooltipLite content={period.formatted}>
                      <span> ({period.range})</span>
                    </TooltipLite>
                  )}
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {isLoading ? <Skeleton className="w-full h-8" /> : totalTimeStr}
                </CardTitle>
              </CardContent>
            </Card>
          </div>
          <Card className="md:col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Time Spent by Projects</CardTitle>
              <CardDescription>{period?.formatted}</CardDescription>
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
                  formatValue={formatValue}
                  dataKey="time"
                  nameKey="project"
                />
              )}
            </CardContent>
          </Card>
        </div>
        <ChartArea
          title="Work Activity"
          description="Tracked time across selected period"
          chartData={workActivity.chartData}
          chartConfig={workActivity.chartConfig}
          formatValue={formatValue}
        />
      </div>
    </>
  );
}
