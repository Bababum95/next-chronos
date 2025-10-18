import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { env } from '@/config';
import { fetcher } from '@/lib/utils/fetcher';
import { formatPeriod, formatDate } from '@/lib/utils';
import { ChartConfig } from '@/components/ui/chart';
import { useTimeRange } from '@/features/time-range';
import type { Activity, SummariesRangeResponse } from '@/lib/api/types';

import { WORK_ACTIVITY } from '../model/constants';
import type { WorkActivityData } from '../types';

export const useActivityAnalytics = () => {
  const { range } = useTimeRange();

  const { data, isLoading } = useQuery<SummariesRangeResponse>({
    queryKey: ['/summaries/range', range.value],
    staleTime: env.intervalSec * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const start = dayjs().startOf(range.value).unix();
      const end = dayjs().unix();
      const res = await fetcher({
        queryKey: [`/summaries/range?start=${start}&end=${end}&full=true`],
      });
      return res;
    },
  });

  const workActivity = useMemo((): WorkActivityData => {
    if (!data?.data?.activities) {
      return {
        chartData: [],
        totalTimeStr: null,
        chartConfig: WORK_ACTIVITY,
      };
    }

    const chartData = data.data.activities.map((slot: Activity[]) => {
      const totalTime = slot.reduce((sum, item) => sum + (item.time_spent || 0), 0);

      return {
        date: formatDate(range.value, slot[0]?.timestamp),
        current: totalTime,
      };
    });

    return {
      chartData,
      totalTimeStr: data.data.totalTimeStr || '',
      chartConfig: WORK_ACTIVITY,
    };
  }, [data, range.value]);

  const projectActivity = useMemo(() => {
    if (!data?.data?.activities) {
      return { chartData: [], chartConfig: {} };
    }

    const projectTotals: Record<string, { label: string; value: number }> = {};

    for (const slot of data.data.activities) {
      for (const item of slot) {
        if (item.time_spent === 0) continue;
        const project = item.root_project?.name || 'unknown';
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

    // Convert to array, sort by total time
    const sortedProjectsAll = Object.values(projectTotals).sort((a, b) => b.value - a.value);

    // Find top 4 projects (excluding 'unknown')
    const knownProjects = sortedProjectsAll.filter((p) => p.label !== 'unknown');
    const topProjects = knownProjects.slice(0, 4);

    // 'others' includes both remaining known projects and all 'unknown'
    const remainingKnown = knownProjects.slice(4);
    const unknownProjects = sortedProjectsAll.filter((p) => p.label === 'unknown');
    const others = [...remainingKnown, ...unknownProjects];

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
  }, [data, range.value]);

  return {
    isLoading,
    workActivity,
    projectActivity,
    timeRange: range,
    formatedPeriod: formatPeriod({ start: data?.data?.start, end: data?.data?.end }),
    totalTimeStr: data?.data?.totalTimeStr,
  };
};
