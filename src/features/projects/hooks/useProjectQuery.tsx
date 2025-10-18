import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import type { ISOUnitType } from '@/features/time-range';

import type { ProjectApiResponse } from '../lib/types';

export const useProjectQuery = (range: ISOUnitType, id?: string) => {
  const start = dayjs().startOf(range).unix();
  const end = dayjs().unix();

  return useQuery<ProjectApiResponse>({
    queryKey: id ? [`/projects/${id}?start=${start}&end=${end}`] : ['projects', 'detail'],
    enabled: !!id,
    staleTime: 30_000,
  });
};
