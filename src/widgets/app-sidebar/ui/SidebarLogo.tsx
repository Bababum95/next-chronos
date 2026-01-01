'use client';

import { useRouter } from 'next/navigation';

import { Logo } from '@/components/ui/logo';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export const SidebarLogo = () => {
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={() => router.push('/dashboard')} className="gap-0.5">
          <Logo asChild />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
