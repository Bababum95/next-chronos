import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/AppSidebar';
import { UserProvider } from '@/contexts/UserContext';
import { getCurrentUser } from '@/lib/auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TimeRangeProvider } from '@/features/time-range';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Get user data - this will redirect if not authenticated due to middleware
  const user = await getCurrentUser();

  // This is a safety check in case middleware didn't catch it
  if (!user) redirect('/auth/login');

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false';

  return (
    <UserProvider initialUser={user}>
      <TimeRangeProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </TimeRangeProvider>
    </UserProvider>
  );
}
