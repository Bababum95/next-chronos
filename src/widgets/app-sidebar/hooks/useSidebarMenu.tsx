import { useQuery } from '@tanstack/react-query';
import { Gauge, Folder } from 'lucide-react';

import type { FavoritesApiResponse } from '../lib/types';

export const useSidebarMenu = () => {
  const { data, isLoading } = useQuery<FavoritesApiResponse>({
    queryKey: ['/projects/favorites'],
  });

  const items = [
    { title: 'Dashboard', url: '/dashboard', icon: Gauge },
    {
      title: 'Projects',
      url: '/dashboard/projects',
      icon: Folder,
      items:
        data?.data?.map((item) => ({
          title: item.name,
          url: `/dashboard/projects/show/${item._id}`,
        })) ?? [],
    },
  ];

  return { items, isLoading };
};
