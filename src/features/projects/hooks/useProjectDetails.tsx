import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Folder, Timer, CalendarDays } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { formatDuration } from '@/lib/utils/time';
import { env } from '@/config';

import type { ProjectApiResponse, ProjectDetailItem } from '../lib/types';

export const useProjectDetails = (id?: string) => {
  const { data, isLoading, refetch } = useQuery<ProjectApiResponse>({
    queryKey: id ? [`/projects/${id}`] : ['projects', 'detail'],
    enabled: !!id,
    staleTime: env.intervalSec * 1000,
  });

  const items = useMemo(() => {
    const project = data?.data;

    const itemsList: ProjectDetailItem[] = [
      {
        icon: <Folder />,
        description: 'Alternate project',
        value: project?.alternate_project,
      },
      {
        icon: <Timer />,
        description: 'Total time spent',
        value: formatDuration(project?.total_time_spent ?? 0),
      },
      {
        icon: <CalendarDays />,
        description: 'Created',
        value: project?.createdAt ? dayjs(project.createdAt).format('DD MMM YYYY') : '',
      },
      {
        icon: <Folder />,
        description: 'Project folder',
        value: project?.project_folder,
      },
    ];

    const parent = data?.data?.parent;

    if (parent) {
      itemsList.push({
        icon: <Folder />,
        description: 'Root project',
        value: parent.name,
        url: `/dashboard/projects/show/${parent._id}`,
      });
    }

    return itemsList;
  }, [data]);

  return { project: data?.data, isLoading, items, refetch };
};
