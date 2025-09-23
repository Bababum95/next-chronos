import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

import type { SummariesRangeResponse } from '@/lib/api/types';

import { env } from '@/config';
import { fetcher } from '@/lib/utils/fetcher';

const chartConfig = {
  current: {
    label: 'Time',
    color: 'hsl(var(--chart-1))',
  },
};

type TimeRange = 'day' | 'week' | 'month';

const timeRanges = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

function isTimeRange(value: string): value is TimeRange {
  return value === 'day' || value === 'week' || value === 'month';
}

export const useChartData = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  const { data } = useQuery<SummariesRangeResponse>({
    queryKey: ['/api/v1/summaries/range', timeRange],
    staleTime: env.intervalSec * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const start = dayjs().startOf(timeRange).unix();
      const end = dayjs().unix();
      const res = await fetcher({
        queryKey: [`/api/v1/summaries/range?start=${start}&end=${end}&full=true`],
      });
      return res;
    },
  });

  const onChangeTimeRange = useCallback((value: string) => {
    if (isTimeRange(value)) {
      setTimeRange(value);
    }
  }, []);

  const workActivity = useMemo(() => {
    if (!data?.data?.activities) return { chartData: [], totalTimeStr: '' };

    return {
      ...data.data,
      chartData: data.data.activities.map((slot: any[]) => {
        const totalTime = slot.reduce((sum, item) => sum + (item.time_spent || 0), 0);

        const timestamp = slot[0]?.timestamp;
        const date = timestamp
          ? dayjs.unix(timestamp).format(timeRange === 'day' ? 'HH:mm' : 'DD MMM')
          : '';

        return {
          date,
          current: totalTime,
        };
      }),
    };
  }, [data]);

  return {
    chartConfig,
    timeRanges,
    timeRange,
    onChangeTimeRange,
    workActivity,
  };
};
