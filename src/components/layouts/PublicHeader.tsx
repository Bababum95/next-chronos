'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/cn';

export function PublicHeader() {
  return (
    <header className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo / App name */}
          <div className="flex items-center">
            <Link
              href="/"
              className={cn(
                'text-base font-semibold tracking-tight hover:text-foreground/90',
                'text-foreground'
              )}
              aria-label="Chronos home"
            >
              Chronos
            </Link>
          </div>

          {/* Right: Navigation - desktop */}
          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </nav>

          {/* Mobile menu */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <Link href="/">
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href="/privacy">
                  <DropdownMenuItem>Privacy</DropdownMenuItem>
                </Link>
                <Link href="/terms">
                  <DropdownMenuItem>Terms</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
