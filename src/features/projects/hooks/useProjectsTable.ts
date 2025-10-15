import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useProjectsQuery } from '../api/getProjects';
import type { ProjectType } from '../api/getProjects';

const columnHelper = createColumnHelper<ProjectType>();

const formatDate = (iso?: string) => (iso ? dayjs(iso).format('YYYY-MM-DD HH:mm') : '');

export const useProjectsTable = () => {
  const { data, isLoading } = useProjectsQuery();

  const columns: ColumnDef<ProjectType, unknown>[] = useMemo(
    () => [
      columnHelper.display({
        id: 'index',
        header: '№',
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue() ?? '',
      }),
      columnHelper.accessor('project_folder', {
        header: 'Project Folder',
        cell: (info) => info.getValue() ?? '',
      }),
      columnHelper.display({
        id: 'createdAt',
        header: 'Created At',
        cell: (info) => formatDate(info.row.original.createdAt),
      }),
      columnHelper.display({
        id: 'updatedAt',
        header: 'Updated At',
        cell: (info) => formatDate(info.row.original.updatedAt),
      }),
    ],
    []
  );

  const table = useReactTable<ProjectType>({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isLoading, hasData: (data?.items?.length ?? 0) > 0 };
};
