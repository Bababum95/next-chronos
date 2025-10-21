import Link from 'next/link';
import { FC } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className="border-t bg-background">
      <div className={cn('mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8', className)}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ for developers. © {new Date().getFullYear()} Chronos.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
