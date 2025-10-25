import { useQuery } from '@tanstack/react-query';

import { env } from '@/config';

import { ProjectsApiResponse } from '../lib/types';

export type GetProjectsParams = {
  page?: number;
  limit?: number;
  root?: boolean | string;
  parent?: string;
  includeArchived?: boolean;
};

export const useProjectsQuery = (params: GetProjectsParams = {}) => {
  const searchParams = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );

  const queryString = searchParams.toString();
  const url = `/projects${queryString ? `?${queryString}` : ''}`;

  return useQuery<ProjectsApiResponse>({
    queryKey: [url],
    placeholderData: (prev) => prev,
    staleTime: env.intervalSec * 1000,
  });
};
