'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeIcon, ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layouts/Footer';
import { PublicHeader } from '@/components/layouts/PublicHeader';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. The page might have been moved,
              deleted, or you might have entered the wrong URL.
            </p>
          </div>
          <div className="flex flex-row gap-4 justify-center">
            <Link href="/">
              <Button>
                <HomeIcon className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={router.back}>
              <ArrowLeftIcon className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
