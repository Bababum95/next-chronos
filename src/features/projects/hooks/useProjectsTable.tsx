import dayjs from 'dayjs';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
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

import { useProjectsQuery } from '../api/getProjects';
import type { ProjectType } from '../api/getProjects';

const columnHelper = createColumnHelper<ProjectType>();

const formatDate = (iso?: string) => (iso ? dayjs(iso).format('DD MMM YYYY') : '');

export const useProjectsTable = () => {
  const { data, isLoading } = useProjectsQuery();

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
        cell: (info) => info.getValue() ?? '',
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

  const table = useReactTable<ProjectType>({
    data: data?.data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isLoading, hasData: (data?.data?.items?.length ?? 0) > 0 };
};
