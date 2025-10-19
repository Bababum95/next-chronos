import Link from 'next/link';
import dayjs from 'dayjs';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Archive, EllipsisVertical, Eye, Pencil, Star, Trash, Loader2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TruncatedText } from '@/components/ui/truncated-text';
import { Badge } from '@/components/ui/badge';
import { formatDuration } from '@/lib/utils/time';

import type { ProjectType } from '../lib/types';

import { useProjectsQuery } from './useProjectsQuery';
import { useFavoriteMutation } from './useFavoriteMutation';

const columnHelper = createColumnHelper<ProjectType>();

const formatDate = (iso?: string) => (iso ? dayjs(iso).format('DD MMM YYYY') : '');

export type UseProjectsTableOptions = {
  page?: number;
  limit?: number;
  root?: boolean;
};

export const useProjectsTable = (options: UseProjectsTableOptions = {}) => {
  const [page, setPage] = useState<number>(options.page ?? 1);
  const [limit, setLimit] = useState<number>(options.limit ?? 12);

  const { data, isLoading, isFetching, refetch } = useProjectsQuery({
    page,
    limit,
    root: true,
  });

  const { toggleFavorite, pendingFavoriteId } = useFavoriteMutation({
    onSuccess: async () => await refetch(),
  });

  const columns = [
    columnHelper.display({
      id: 'index',
      cell: (info) => (
        <div className="font-bold text-muted-foreground pl-2">{info.row.index + 1}</div>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => {
        const id = info.row.original._id;

        return (
          <Link href={`/dashboard/projects/show/${id}`} className="hover:underline">
            <TruncatedText>{info.getValue()}</TruncatedText>
          </Link>
        );
      },
    }),
    columnHelper.accessor('total_time_spent', {
      header: 'Total time',
      cell: (info) => {
        const value = info.getValue() ?? 0;
        const formatted = formatDuration(value);
        return <Badge variant="secondary">{formatted}</Badge>;
      },
    }),
    columnHelper.display({
      id: 'createdAt',
      header: 'Created At',
      cell: (info) => formatDate(info.row.original.createdAt),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        const project = info.row.original;
        const id = project._id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <EllipsisVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40" side="left">
              <Link href={`/dashboard/projects/show/${id}`}>
                <DropdownMenuItem>
                  <Eye />
                  Show
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={pendingFavoriteId === id}
                onClick={() => toggleFavorite({ id, isFavorite: project.is_favorite })}
              >
                {pendingFavoriteId === id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Star fill={project.is_favorite ? 'currentColor' : 'none'} />
                )}
                Favorite
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash className="text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  const items = data?.data?.items ?? [];
  const total = data?.data?.total ?? 0;

  const table = useReactTable<ProjectType>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const nextPage = () => {
    if (canNext) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (canPrev) setPage((p) => p - 1);
  };

  return {
    table,
    isLoading,
    isFetching,
    hasData: items.length > 0,
    page,
    limit,
    total,
    totalPages,
    canPrev,
    canNext,
    nextPage,
    prevPage,
    setPage,
    setLimit,
  };
};
