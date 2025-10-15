import dayjs from 'dayjs';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

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
        cell: (info) => info.getValue() ?? '',
      }),
      columnHelper.display({
        id: 'createdAt',
        header: 'Created At',
        cell: (info) => formatDate(info.row.original.createdAt),
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
