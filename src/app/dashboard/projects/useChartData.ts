import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { ChartConfig } from '@/components/ui/chart';
import { env } from '@/config';
import { fetcher } from '@/lib/utils/fetcher';
import { DASHBOARD_CONSTANTS } from '@/features/dashboard';
import type { Activity, SummariesRangeResponse } from '@/lib/api/types';
import type {
  ProjectActivityData,
  ProjectChartDataPoint,
  TimeRange,
  WorkActivityData,
} from '@/features/dashboard/types';

dayjs.extend(isoWeek);

const isTimeRange = (value: string): value is TimeRange => {
  return DASHBOARD_CONSTANTS.TIME_RANGES.some((range) => range.value === value);
};

const formatDate = (timeRange: TimeRange, date?: number) => {
  if (typeof date !== 'number') return '';

  return dayjs.unix(date).format(timeRange === 'day' ? 'HH:mm' : 'DD MMM');
};

export const useChartData = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(DASHBOARD_CONSTANTS.DEFAULT_TIME_RANGE);

  const { data, isLoading } = useQuery<SummariesRangeResponse>({
    queryKey: ['/summaries/range', timeRange],
    staleTime: env.intervalSec * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const start = dayjs().startOf(timeRange).unix();
      const end = dayjs().unix();
      const res = await fetcher({
        queryKey: [`/summaries/range?start=${start}&end=${end}&full=true`],
      });
      return res;
    },
  });

  const onChangeTimeRange = useCallback((value: string) => {
    if (isTimeRange(value)) {
      setTimeRange(value);
    }
  }, []);

  const workActivity = useMemo((): WorkActivityData => {
    if (!data?.data?.activities) {
      return {
        chartData: [],
        totalTimeStr: null,
        chartConfig: DASHBOARD_CONSTANTS.CHART_CONFIG.WORK_ACTIVITY,
      };
    }

    const chartData = data.data.activities.map((slot: Activity[]) => {
      const totalTime = slot.reduce((sum, item) => sum + (item.time_spent || 0), 0);

      return {
        date: formatDate(timeRange, slot[0]?.timestamp),
        current: totalTime,
      };
    });

    return {
      chartData,
      totalTimeStr: data.data.totalTimeStr || '',
      chartConfig: DASHBOARD_CONSTANTS.CHART_CONFIG.WORK_ACTIVITY,
    };
  }, [data, timeRange]);

  const projectActivity = useMemo((): ProjectActivityData => {
    if (!data?.data?.activities) {
      return { chartData: [], chartConfig: {} };
    }

    const projectTotals: Record<
      string,
      { label: string; color: string; values: { date: string; time: number }[] }
    > = {};

    for (const slot of data.data.activities) {
      const timestamp = slot[0]?.timestamp;

      for (const item of slot) {
        const project = item.alternate_project || item.project_folder || 'unknown';
        if (!projectTotals[project]) {
          if (item.time_spent === 0) continue;
          projectTotals[project] = {
            label: project,
            color: `hsl(var(--chart-${Object.keys(projectTotals).length + 1}))`,
            values: [],
          };
        }
        projectTotals[project].values.push({
          date: formatDate(timeRange, timestamp),
          time: item.time_spent || 0,
        });
      }
    }

    const dates = Array.from(
      new Set(
        data.data.activities.map((slot: Activity[]) => formatDate(timeRange, slot[0]?.timestamp))
      )
    );

    const chartData: ProjectChartDataPoint[] = dates.map((date) => {
      const entry: ProjectChartDataPoint = { date };
      for (const [project, { values }] of Object.entries(projectTotals)) {
        const v = values.find((x) => x.date === date);
        entry[project] = v ? v.time : 0;
      }
      return entry;
    });

    const chartConfig = Object.fromEntries(
      Object.entries(projectTotals).map(([key, { label, color }]) => [key, { label, color }])
    ) satisfies ChartConfig;

    return {
      chartData,
      chartConfig,
    };
  }, [data, timeRange]);

  return {
    timeRanges: DASHBOARD_CONSTANTS.TIME_RANGES,
    timeRange,
    onChangeTimeRange,
    isLoading,
    projectActivity,
    totalTimeStr: data?.data?.totalTimeStr,
    workActivity,
  };
};
