import { FC } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Project } from '@/models/project';

type Props = {
  items: Project[];
  isLoading?: boolean;
};

export const ProjectsTable: FC<Props> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Project Folder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>№</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Project Folder</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
              No projects found
            </TableCell>
          </TableRow>
        ) : (
          items.map((project, idx) => (
            <TableRow key={project._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell className="text-muted-foreground">{project.project_folder}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
