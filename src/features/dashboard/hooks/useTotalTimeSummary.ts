import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { env } from '@/config';
import { SummariesResponse } from '@/lib/api/types';
import { formatDuration } from '@/lib/utils/time';

type UseTotalTimeSummaryReturn = {
  allTime: string | null;
  isLoading: boolean;
  error?: string;
};

export const useTotalTimeSummary = (): UseTotalTimeSummaryReturn => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useQuery<SummariesResponse>({
    queryKey: ['/summaries'],
    enabled: mounted,
    staleTime: env.intervalSec * 1000,
    refetchOnWindowFocus: false,
  });

  const allTime = data?.data?.totalTime ? formatDuration(data.data.totalTime) : null;

  return {
    allTime,
    isLoading: isLoading && mounted,
    error: error?.message,
  };
};
