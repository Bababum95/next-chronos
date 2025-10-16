import { flexRender } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { useProjectsTable } from '../hooks/useProjectsTable';

export function ProjectsTable() {
  const {
    table,
    isLoading,
    isFetching,
    hasData,
    page,
    totalPages,
    nextPage,
    prevPage,
    canNext,
    canPrev,
  } = useProjectsTable();

  if (isLoading) {
    return (
      <div className="rounded border p-4 text-sm text-muted-foreground">Loading projects...</div>
    );
  }

  if (!hasData) {
    return (
      <div className="rounded border p-4 text-sm text-muted-foreground">No projects found.</div>
    );
  }

  return (
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

      <div className="flex items-center justify-center gap-4 p-3 border-t bg-background">
        <Button variant="ghost" size="sm" onClick={prevPage} disabled={!canPrev || isFetching}>
          Prev
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <Button variant="ghost" size="sm" onClick={nextPage} disabled={!canNext || isFetching}>
          Next
        </Button>
      </div>
    </div>
  );
}
