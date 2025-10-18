import { useQuery } from '@tanstack/react-query';

import { env } from '@/config';

import { ProjectsApiResponse } from '../lib/types';

export type GetProjectsParams = {
  page?: number;
  limit?: number;
  root?: boolean | string;
};

export const useProjectsQuery = (params: GetProjectsParams = {}) => {
  const searchParams = new URLSearchParams();
  if (typeof params.page !== 'undefined') searchParams.set('page', String(params.page));
  if (typeof params.limit !== 'undefined') searchParams.set('limit', String(params.limit));
  if (typeof params.root !== 'undefined') searchParams.set('root', String(params.root));

  const url = `/projects${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  return useQuery<ProjectsApiResponse>({
    queryKey: [url],
    // Preserve previous data while fetching the next page for better UX
    placeholderData: (previousData) => previousData,
    staleTime: env.intervalSec * 1000,
  });
};
