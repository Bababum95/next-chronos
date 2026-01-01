'use client';

import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils/cn';

type Props = {
  className?: string;
};

export const PublicHeader: FC<Props> = ({ className }) => {
  return (
    <header className="bg-background text-foreground">
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="Chronos">
              <Logo />
            </Link>
          </div>

          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
