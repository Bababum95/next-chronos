import Link from 'next/link';
import dayjs from 'dayjs';
import { createColumnHelper, getCoreRowModel, Table, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Archive, EllipsisVertical, Eye, Pencil, Star, Trash2Icon } from 'lucide-react';

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
import { Spinner } from '@/components/ui/spinner';

import type { ProjectType } from '../lib/types';

import { useProjectsQuery, GetProjectsParams } from './useProjectsQuery';
import { useFavoriteMutation } from './useFavoriteMutation';
import { useDelete } from './useDelete';

const columnHelper = createColumnHelper<ProjectType>();

const formatDate = (iso?: string) => (iso ? dayjs(iso).format('DD MMM YYYY') : '');

export type UseProjectsTableResult = {
  table: Table<ProjectType>;
  isLoading: boolean;
  isFetching: boolean;
  hasData: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  nextPage: () => void;
  prevPage: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

export const useProjectsTable = (options: GetProjectsParams = {}): UseProjectsTableResult => {
  const [page, setPage] = useState<number>(options.page ?? 1);
  const [limit, setLimit] = useState<number>(options.limit ?? 12);

  const { data, isLoading, isFetching, refetch } = useProjectsQuery({
    page,
    limit,
    root: options.root ?? true,
    parent: options.parent,
  });

  const { onDelete, deletingId } = useDelete({
    onSuccess: async () => await refetch(),
  });
  const { toggleFavorite, pendingFavoriteId } = useFavoriteMutation({
    onSuccess: async () => await refetch(),
  });

  const columns = [
    columnHelper.display({
      id: 'index',
      cell: (info) => (
        <div className="font-bold text-muted-foreground pl-2">
          {(page - 1) * limit + info.row.index + 1}
        </div>
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
          <div className="flex justify-end">
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
                <Link href={`/dashboard/projects/edit/${id}`}>
                  <DropdownMenuItem>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={pendingFavoriteId === id}
                  onClick={() => toggleFavorite({ id, isFavorite: project.is_favorite })}
                >
                  {pendingFavoriteId === id ? (
                    <Spinner />
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
                <DropdownMenuItem variant="destructive" onClick={() => onDelete({ id })}>
                  {deletingId === id ? (
                    <Spinner className="text-destructive" />
                  ) : (
                    <Trash2Icon className="text-destructive" />
                  )}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
