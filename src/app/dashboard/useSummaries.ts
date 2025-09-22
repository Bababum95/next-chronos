import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { env } from '@/config';
import { SummariesResponse } from '@/lib/api/types';
import { formatDuration } from '@/lib/utils/time';

export const useSummaries = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data, isLoading, error } = useQuery<SummariesResponse>({
    queryKey: ['/api/v1/summaries'],
    enabled: mounted,
    staleTime: env.intervalSec * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    totalTime: data?.data?.totalTime ? formatDuration(data.data.totalTime) : '0m',
    isLoading: isLoading && mounted,
    error: error?.message,
  };
};
