'use client';

import { flexRender, Table as TanstackTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FC } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import type { ProjectType } from '../lib/types';

type Props = {
  table: TanstackTable<ProjectType>;
  page?: number;
  totalPages?: number;
  canPrev?: boolean;
  canNext?: boolean;
  nextPage?: () => void;
  prevPage?: () => void;
};

export const ProjectsTable: FC<Props> = ({
  table,
  page,
  totalPages,
  canPrev,
  canNext,
  nextPage,
  prevPage,
}) => {
  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages && (
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex-1 text-sm flex">
            Page {page} of {totalPages}
          </div>
          {totalPages > 1 && (
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={prevPage}
                disabled={!canPrev}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={nextPage}
                disabled={!canNext}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
