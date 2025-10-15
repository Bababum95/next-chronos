import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/lib/utils/fetcher';

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

export type ProjectsApiResponse = {
  items: ProjectType[];
  total: number;
  page: number;
  limit: number;
};

export const getProjects = async (): Promise<ProjectsApiResponse> => {
  const res = await fetcher({ queryKey: ['/projects'] });
  return res as ProjectsApiResponse;
};

export const useProjectsQuery = () => {
  return useQuery<ProjectsApiResponse>({
    queryKey: ['/projects'],
    queryFn: () => getProjects(),
  });
};
