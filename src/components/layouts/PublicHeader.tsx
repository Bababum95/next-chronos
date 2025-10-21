'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
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
            <Link
              href="/"
              aria-label="Chronos home"
              className={cn(
                'text-base font-semibold tracking-tight hover:text-foreground/90',
                'text-foreground'
              )}
            >
              <Image src="/full-logo.png" alt="Chronos logo" width={112} height={36} />
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
