"use client";

import { FC, useMemo } from 'react';
import { useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectsTable } from '@/components/ProjectsTable';
import type { Project } from '@/models/project';

export type ProjectsTableContainerProps = {
  items: Project[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const ProjectsTableContainer: FC<ProjectsTableContainerProps> = ({
  items,
  isLoading,
  isError,
  errorMessage,
}) => {
  const columns: ColumnDef<Project>[] = useMemo(
    () => [
      {
        id: 'index',
        header: '№',
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'project_folder',
        header: 'Project Folder',
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable<Project>({
    data: items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Ready for sorting/pagination later
  });

  return (
    <Card>
      <CardHeader className="flex items-center border-b py-4">
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isError ? (
          <div className="text-destructive p-4" role="alert">
            {errorMessage || 'Failed to load projects'}
          </div>
        ) : (
          <ProjectsTable table={table} isLoading={isLoading} />
        )}
      </CardContent>
    </Card>
  );
};
