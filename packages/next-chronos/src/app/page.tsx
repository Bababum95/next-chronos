import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Home page built to match existing UI system (Tailwind + shadcn-like components)
// Uses existing Button and Card components; typography relies on utility classes
// and root fonts configured in the app's RootLayout.
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero / Preview section */}
      <section className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Welcome to Chronos
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Track developer activity and visualize coding time statistics with a clean, modern
                dashboard.
              </p>
              <div>
                <Link href="/dashboard">
                  <Button className="h-11 px-6 text-base">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
            <Card className="md:mt-0 mt-4">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>A glimpse of your productivity insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-muted bg-muted/30 text-muted-foreground grid h-48 place-items-center rounded-lg border">
                  Dashboard preview area
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us section */}
      <section className="border-t bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">About Us</h2>
            </div>
            <div className="text-muted-foreground leading-relaxed">
              Chronos is built for engineering teams to understand how coding time is distributed
              across projects and time periods. It integrates lightweight tracking with clear
              visualizations so developers and managers can stay aligned and make informed
              decisions.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
