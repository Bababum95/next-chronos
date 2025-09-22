'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export const SidebarLogo = () => {
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={() => router.push('/dashboard')}>
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <div className="grid flex-1 text-left text-md">
            <span className="truncate font-semibold">Chronos</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
