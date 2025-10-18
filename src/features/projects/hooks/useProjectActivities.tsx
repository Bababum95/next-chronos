import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useTimeRange } from '@/features/time-range';
import { fetcher } from '@/lib/utils/fetcher';
import { env } from '@/config';
import { formatDate, formatPeriod } from '@/lib/utils';
import { Activity } from '@/lib/api/types';

import { WORK_ACTIVITY } from '../lib/constants';

export const useProjectActivities = (id?: string) => {
  const { range } = useTimeRange();

  const { data } = useQuery({
    queryKey: ['projects', 'activities', id, range.value],
    enabled: !!id,
    staleTime: env.intervalSec * 1000,
    queryFn: async () => {
      const start = dayjs().startOf(range.value).unix();
      const end = dayjs().unix();
      const res = await fetcher({
        queryKey: [`/projects/${id}/activities?start=${start}&end=${end}`],
      });
      return res;
    },
  });

  const activity = useMemo(() => {
    if (!data?.data?.activities) {
      return {
        range,
        chartData: [],
        totalTimeStr: null,
        chartConfig: WORK_ACTIVITY,
        formattedPeriod: '',
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
      range,
      totalTimeStr: data.data.totalTimeStr || '',
      chartConfig: WORK_ACTIVITY,
      formattedPeriod: formatPeriod({ start: data?.data?.start, end: data?.data?.end }),
    };
  }, [data, range.value]);

  return activity;
};
