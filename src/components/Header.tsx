import { FC, Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

type Props = {
  extra?: React.ReactNode;
  breadcrumb?: {
    current: string;
    links?: { label: string; href: string }[];
  };
};

export const Header: FC<Props> = ({ breadcrumb, extra }) => {
  return (
    <header
      className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10"
      data-slot="header"
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      {breadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.links &&
              breadcrumb.links.map((link) => (
                <Fragment key={link.href}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumb.current}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {extra && <div className="ml-auto">{extra}</div>}
    </header>
  );
};
