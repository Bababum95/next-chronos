import { FC } from 'react';
import { Table } from '@tanstack/react-table';

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props<TData> = {
  table: Table<TData>;
  isLoading?: boolean;
};

export const ProjectsTable: FC<Props<any>> = ({ table, isLoading }) => {
  if (isLoading) {
    return (
      <UITable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>{header.isPlaceholder ? null : header.column.columnDef.header as any}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={table.getAllLeafColumns().length} className="text-center text-muted-foreground py-8">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </UITable>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <UITable>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>{header.isPlaceholder ? null : header.column.columnDef.header as any}</TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={table.getAllLeafColumns().length} className="text-center text-muted-foreground py-8">
              No projects found
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{cell.getValue() as any}</TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </UITable>
  );
};
