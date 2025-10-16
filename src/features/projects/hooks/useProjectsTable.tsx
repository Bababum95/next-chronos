import dayjs from 'dayjs';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

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

import { useProjectsQuery } from '../api/getProjects';
import type { ProjectType } from '../api/getProjects';

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

  const { data, isLoading, isFetching } = useProjectsQuery({ page, limit, root: true });

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'index',
        cell: (info) => (
          <div className="font-bold text-muted-foreground pl-2">{info.row.index + 1}</div>
        ),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => <TruncatedText>{info.getValue()}</TruncatedText>,
      }),
      columnHelper.accessor('total_time_spent', {
        header: 'Total time',
        cell: (info) => {
          const value = info.getValue() ?? 0;
          const formatted = formatDuration(value);
          return <Badge variant="secondary">{formatted}</Badge>;
        },
      }),
      columnHelper.accessor('project_folder', {
        header: 'Project Folder',
        cell: (info) => <TruncatedText>{info.getValue()}</TruncatedText>,
      }),
      columnHelper.display({
        id: 'createdAt',
        header: 'Created At',
        cell: (info) => formatDate(info.row.original.createdAt),
      }),
      columnHelper.display({
        id: 'actions',
        cell: () => (
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
            <DropdownMenuContent align="start" className="w-32" side="left">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    []
  );

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
