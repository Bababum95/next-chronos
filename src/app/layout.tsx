import NextTopLoader from 'nextjs-toploader';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { QueryProvider } from '@/lib/query-client';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chronos',
  description:
    'Chronos is a plugin for tracking developer activity and visualizing coding time statistics.',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <QueryProvider>
              <NextTopLoader
                color="hsl(var(--primary))"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing="ease"
                speed={200}
                showSpinner={false}
              />
              <div className="flex min-h-screen flex-col">
                <main className="flex-1">{children}</main>
                <Toaster />
              </div>
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
