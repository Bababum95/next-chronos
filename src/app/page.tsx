import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 py-12 flex-1">
        <p>Hello</p>
        <p>Welcome to Chronos!</p>
        <Link href="/dashboard">
          <Button className="flex items-center gap-2">Go to Dashboard</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
