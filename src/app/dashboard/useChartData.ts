import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { env } from '@/config';
import { fetcher } from '@/lib/utils/fetcher';

const chartConfig = {
  current: {
    label: 'Time',
    color: 'hsl(var(--chart-1))',
  },
  // average: {
  //   label: 'Average',
  //   color: 'hsl(var(--chart-2))',
  // },
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/v1/summaries/range', timeRange],
    queryFn: async () => {
      const start = dayjs().startOf(timeRange).unix();
      const end = dayjs().unix();
      const res = await fetcher({
        queryKey: [`/api/v1/summaries/range?start=${start}&end=${end}&full=true`],
      });
      return res;
    },
    staleTime: env.intervalSec * 1000,
    refetchOnWindowFocus: false,
  });

  const onChangeTimeRange = useCallback((value: string) => {
    if (isTimeRange(value)) {
      setTimeRange(value);
    }
  }, []);

  return {
    chartConfig,
    timeRanges,
    timeRange,
    onChangeTimeRange,
  };
};
