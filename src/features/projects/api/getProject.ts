import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/lib/utils/fetcher';
import type { ApiResponse } from '@/lib/validation';

import type { ProjectType } from './getProjects';

export type ProjectApiResponse = ApiResponse<ProjectType>;

export const getProject = async (id: string): Promise<ProjectApiResponse> => {
  const url = `/projects/${id}`;
  const res = await fetcher({ queryKey: [url] });
  return res as ProjectApiResponse;
};

export const useProjectQuery = (id?: string) => {
  const url = id ? `/projects/${id}` : undefined;
  return useQuery<ProjectApiResponse>({
    queryKey: url ? [url] : ['projects', 'detail', id],
    queryFn: () => getProject(id as string),
    enabled: !!id,
    staleTime: 30_000,
  });
};
