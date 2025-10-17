import { SquarePen } from 'lucide-react';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function Projects() {
  return (
    <>
      <Header
        breadcrumb={{
          current: 'Project Details',
          links: [{ label: 'Projects', href: '/dashboard/projects' }],
        }}
        extra={
          <Button size="sm">
            <SquarePen size={14} />
            Edit
          </Button>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <p>Project Details</p>
      </div>
    </>
  );
}
