'use client';

import { Plus } from 'lucide-react';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function Projects() {
  return (
    <>
      <Header
        breadcrumb={{ current: 'Projects' }}
        extra={
          <Button size="sm">
            <Plus />
            Create
          </Button>
        }
      />
      <div className="px-4 py-4 grid gap-4"></div>
    </>
  );
}
