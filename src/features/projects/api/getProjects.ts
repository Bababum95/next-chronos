import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/lib/utils/fetcher';
import { ApiResponse } from '@/lib/validation';

export type ProjectType = {
  _id: string;
  user: string;
  project_folder: string;
  git_branches?: string[];
  alternate_project?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type ProjectsApiResponse = ApiResponse<{
  items: ProjectType[];
  total: number;
  page: number;
  limit: number;
}>;

export type GetProjectsParams = {
  page?: number;
  limit?: number;
  root?: boolean | string;
};

export const getProjects = async (params: GetProjectsParams = {}): Promise<ProjectsApiResponse> => {
  const searchParams = new URLSearchParams();
  if (typeof params.page !== 'undefined') searchParams.set('page', String(params.page));
  if (typeof params.limit !== 'undefined') searchParams.set('limit', String(params.limit));
  if (typeof params.root !== 'undefined') searchParams.set('root', String(params.root));

  const url = `/projects${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await fetcher({ queryKey: [url] });
  return res as ProjectsApiResponse;
};

export const useProjectsQuery = (params: GetProjectsParams = {}) => {
  const searchParams = new URLSearchParams();
  if (typeof params.page !== 'undefined') searchParams.set('page', String(params.page));
  if (typeof params.limit !== 'undefined') searchParams.set('limit', String(params.limit));
  if (typeof params.root !== 'undefined') searchParams.set('root', String(params.root));

  const url = `/projects${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  return useQuery<ProjectsApiResponse>({
    queryKey: [url],
    queryFn: () => getProjects(params),
    // Preserve previous data while fetching the next page for better UX
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
  });
};
