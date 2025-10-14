import { useQuery } from '@tanstack/react-query';

import type { ProjectListResponse } from '@/models/project';

const PROJECTS_QUERY_KEY = ['/projects'] as const;

export const useProjects = () => {
  const query = useQuery<ProjectListResponse>({ queryKey: PROJECTS_QUERY_KEY });

  return {
    ...query,
    projects: query.data?.items ?? [],
    total: query.data?.total ?? 0,
  } as const;
};
