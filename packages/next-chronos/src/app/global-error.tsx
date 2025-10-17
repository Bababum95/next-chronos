'use client';

import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { AlertTriangleIcon, HomeIcon, RefreshCcwIcon } from 'lucide-react';

import '@/app/globals.css';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV !== 'production';

  // Log for local debugging while avoiding noisy production logs
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-destructive/10 text-destructive p-2">
                  <AlertTriangleIcon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Something went wrong</CardTitle>
                  <CardDescription>
                    An unexpected error occurred. You can try again or go back home.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isDev && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Error details (dev only)</div>
                  <div className="rounded-md border bg-muted/30 text-muted-foreground">
                    <pre className="whitespace-pre-wrap break-words p-3 text-xs overflow-auto max-h-72">
{`${error.name ?? 'Error'}: ${error.message}`}
{error.digest ? `\n\nDigest: ${error.digest}` : ''}
{error.stack ? `\n\nStack:\n${error.stack}` : ''}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button onClick={reset}>
                <RefreshCcwIcon className="h-4 w-4" />
                Try again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <HomeIcon className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}
