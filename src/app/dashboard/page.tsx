'use client';

import { TrendingUp } from 'lucide-react';

import { useChartData } from './useChartData';
import { useSummaries } from './useSummaries';

import { ChartArea } from '@/components/ChartArea';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const chartData = [
  { date: '2024-04-01', current: 222, average: 150 },
  { date: '2024-04-02', current: 97, average: 180 },
  { date: '2024-04-03', current: 167, average: 120 },
  { date: '2024-04-04', current: 242, average: 260 },
  { date: '2024-04-05', current: 373, average: 290 },
  { date: '2024-04-06', current: 301, average: 340 },
  { date: '2024-04-07', current: 245, average: 180 },
  { date: '2024-04-08', current: 409, average: 320 },
  { date: '2024-04-09', current: 59, average: 110 },
  { date: '2024-04-10', current: 261, average: 190 },
  { date: '2024-04-11', current: 327, average: 350 },
  { date: '2024-04-12', current: 292, average: 210 },
  { date: '2024-04-13', current: 342, average: 380 },
  { date: '2024-04-14', current: 137, average: 220 },
  { date: '2024-04-15', current: 120, average: 170 },
  { date: '2024-04-16', current: 138, average: 190 },
  { date: '2024-04-17', current: 446, average: 360 },
  { date: '2024-04-18', current: 364, average: 410 },
  { date: '2024-04-19', current: 243, average: 180 },
  { date: '2024-04-20', current: 89, average: 150 },
  { date: '2024-04-21', current: 137, average: 200 },
  { date: '2024-04-22', current: 224, average: 170 },
  { date: '2024-04-23', current: 138, average: 230 },
  { date: '2024-04-24', current: 387, average: 290 },
  { date: '2024-04-25', current: 215, average: 250 },
  { date: '2024-04-26', current: 75, average: 130 },
  { date: '2024-04-27', current: 383, average: 420 },
  { date: '2024-04-28', current: 122, average: 180 },
  { date: '2024-04-29', current: 315, average: 240 },
  { date: '2024-04-30', current: 454, average: 380 },
  { date: '2024-05-01', current: 165, average: 220 },
  { date: '2024-05-02', current: 293, average: 310 },
  { date: '2024-05-03', current: 247, average: 190 },
  { date: '2024-05-04', current: 385, average: 420 },
  { date: '2024-05-05', current: 481, average: 390 },
  { date: '2024-05-06', current: 498, average: 520 },
  { date: '2024-05-07', current: 388, average: 300 },
  { date: '2024-05-08', current: 149, average: 210 },
  { date: '2024-05-09', current: 227, average: 180 },
  { date: '2024-05-10', current: 293, average: 330 },
  { date: '2024-05-11', current: 335, average: 270 },
  { date: '2024-05-12', current: 197, average: 240 },
  { date: '2024-05-13', current: 197, average: 160 },
  { date: '2024-05-14', current: 448, average: 490 },
  { date: '2024-05-15', current: 473, average: 380 },
  { date: '2024-05-16', current: 338, average: 400 },
  { date: '2024-05-17', current: 499, average: 420 },
  { date: '2024-05-18', current: 315, average: 350 },
  { date: '2024-05-19', current: 235, average: 180 },
  { date: '2024-05-20', current: 177, average: 230 },
  { date: '2024-05-21', current: 82, average: 140 },
  { date: '2024-05-22', current: 81, average: 120 },
  { date: '2024-05-23', current: 252, average: 290 },
  { date: '2024-05-24', current: 294, average: 220 },
  { date: '2024-05-25', current: 201, average: 250 },
  { date: '2024-05-26', current: 213, average: 170 },
  { date: '2024-05-27', current: 420, average: 460 },
  { date: '2024-05-28', current: 233, average: 190 },
  { date: '2024-05-29', current: 78, average: 130 },
  { date: '2024-05-30', current: 340, average: 280 },
  { date: '2024-05-31', current: 178, average: 230 },
  { date: '2024-06-01', current: 178, average: 200 },
  { date: '2024-06-02', current: 470, average: 410 },
  { date: '2024-06-03', current: 103, average: 160 },
  { date: '2024-06-04', current: 439, average: 380 },
  { date: '2024-06-05', current: 88, average: 140 },
  { date: '2024-06-06', current: 294, average: 250 },
  { date: '2024-06-07', current: 323, average: 370 },
  { date: '2024-06-08', current: 385, average: 320 },
  { date: '2024-06-09', current: 438, average: 480 },
  { date: '2024-06-10', current: 155, average: 200 },
  { date: '2024-06-11', current: 92, average: 150 },
  { date: '2024-06-12', current: 492, average: 420 },
  { date: '2024-06-13', current: 81, average: 130 },
  { date: '2024-06-14', current: 426, average: 380 },
  { date: '2024-06-15', current: 307, average: 350 },
  { date: '2024-06-16', current: 371, average: 310 },
  { date: '2024-06-17', current: 475, average: 520 },
  { date: '2024-06-18', current: 107, average: 170 },
  { date: '2024-06-19', current: 341, average: 290 },
  { date: '2024-06-20', current: 408, average: 450 },
  { date: '2024-06-21', current: 169, average: 210 },
  { date: '2024-06-22', current: 317, average: 270 },
  { date: '2024-06-23', current: 480, average: 530 },
  { date: '2024-06-24', current: 132, average: 180 },
  { date: '2024-06-25', current: 141, average: 190 },
  { date: '2024-06-26', current: 434, average: 380 },
  { date: '2024-06-27', current: 448, average: 490 },
  { date: '2024-06-28', current: 149, average: 200 },
  { date: '2024-06-29', current: 103, average: 160 },
  { date: '2024-06-30', current: 446, average: 400 },
];

export default function Dashboard() {
  const { timeRange, onChangeTimeRange, timeRanges, chartConfig } = useChartData();
  const { totalTime, isLoading: summariesLoading } = useSummaries();

  return (
    <div className="px-4 py-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Time</CardDescription>
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
      </div>
      <ChartArea
        title="Work Activity"
        description="Tracked time across selected period"
        chartData={chartData}
        chartConfig={chartConfig}
        extra={
          <ToggleGroup
            size="sm"
            variant="outline"
            type="single"
            value={timeRange}
            onValueChange={onChangeTimeRange}
          >
            {timeRanges.map((timeRange) => (
              <ToggleGroupItem
                value={timeRange.value}
                aria-label={timeRange.label}
                key={timeRange.value}
              >
                {timeRange.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        }
      />
    </div>
  );
}
