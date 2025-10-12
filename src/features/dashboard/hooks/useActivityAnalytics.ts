import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { env } from '@/config';
import { fetcher } from '@/lib/utils/fetcher';
import { ChartConfig } from '@/components/ui/chart';
import type { Activity, SummariesRangeResponse } from '@/lib/api/types';

import { DASHBOARD_CONSTANTS } from '../model/constants';
import type { TimeRange, WorkActivityData } from '../types';

dayjs.extend(isoWeek);

const isTimeRange = (value: string): value is TimeRange => {
  return DASHBOARD_CONSTANTS.TIME_RANGES.some((range) => range.value === value);
};

const formatDate = (timeRange: TimeRange, date?: number) => {
  if (typeof date !== 'number') return '';

  return dayjs.unix(date).format(timeRange === 'day' ? 'HH:mm' : 'DD MMM');
};

export const useActivityAnalytics = () => {
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
    if (isTimeRange(value)) setTimeRange(value);
  }, []);

  const period = useMemo(() => {
    const { start, end } = data?.data || {};

    if (!start || !end) return null;

    const startDate = dayjs.unix(start);
    const endDate = dayjs.unix(end);

    return {
      formatted: `${startDate.format('MMM D HH:mm')} - ${endDate.format('MMM D HH:mm')}`,
      range: DASHBOARD_CONSTANTS.TIME_RANGES.find((range) => range.value === timeRange)?.label,
    };
  }, [data]);

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

  const projectActivity = useMemo(() => {
    if (!data?.data?.activities) {
      return { chartData: [], chartConfig: {} };
    }

    const projectTotals: Record<string, { label: string; value: number }> = {};

    for (const slot of data.data.activities) {
      for (const item of slot) {
        if (item.time_spent === 0) continue;
        const project = item.alternate_project || item.project_folder || 'unknown';
        if (!projectTotals[project]) {
          projectTotals[project] = {
            label: project,
            value: item.time_spent,
          };
        } else {
          projectTotals[project].value += item.time_spent;
        }
      }
    }

    // Convert to array and sort by total time
    const sortedProjects = Object.values(projectTotals).sort((a, b) => b.value - a.value);

    // Take top 4 projects and combine the rest
    const topProjects = sortedProjects.slice(0, 4);
    const others = sortedProjects.slice(4);

    const othersValue = others.reduce((sum, p) => sum + p.value, 0);
    if (othersValue > 0) {
      topProjects.push({
        label: 'Others',
        value: othersValue,
      });
    }

    // Calculate total time
    const totalTime = topProjects.reduce((sum, p) => sum + p.value, 0);

    // Prepare chart data with percentage
    const chartData = topProjects.map((p, index) => ({
      project: p.label,
      time: p.value,
      percentage: totalTime > 0 ? Math.round((p.value / totalTime) * 100) : 0,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));

    // Prepare chart configuration (labels + colors)
    const chartConfig: ChartConfig = topProjects.reduce((acc, p, index) => {
      acc[p.label] = {
        label: p.label,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as ChartConfig) satisfies ChartConfig;

    return {
      chartData,
      chartConfig,
    };
  }, [data, timeRange]);

  return {
    timeRange,
    onChangeTimeRange,
    isLoading,
    workActivity,
    projectActivity,
    period,
    timeRanges: DASHBOARD_CONSTANTS.TIME_RANGES,
    totalTimeStr: data?.data?.totalTimeStr,
  };
};
