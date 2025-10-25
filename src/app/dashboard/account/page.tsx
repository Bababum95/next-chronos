'use client';

import { CirclePlus } from 'lucide-react';

import { Header } from '@/components/layouts/Header';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/lib/hooks/useUser';
import { EditProfileDialog, ChangePasswordDialog, ApiKeyCard } from '@/features/account';
import { UserAvatar } from '@/entities/user';
import { TooltipLite } from '@/components/ui/tooltip';

export default function Account() {
  const { user } = useUser();
  const { name, email, avatarUrl, apiKey } = user || {};

  return (
    <>
      <Header
        breadcrumb={{ current: 'Account' }}
        extra={
          <ButtonGroup>
            <EditProfileDialog />
            <ChangePasswordDialog />
          </ButtonGroup>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <Card className="max-w-sm">
          <CardContent className="flex flex-col items-center gap-4">
            <UserAvatar url={avatarUrl} name={name} size={32} />
            <span className="font-semibold text-2xl">{name}</span>
          </CardContent>
        </Card>
        <Card className="max-w-sm pt-0">
          <CardHeader className="flex items-center border-b py-4">
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Email: </span>
              <span>{email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Telegram: </span>
              <TooltipLite content="Coming soon">
                <Button variant="ghost" size="sm">
                  <CirclePlus />
                </Button>
              </TooltipLite>
            </div>
          </CardContent>
        </Card>
        <ApiKeyCard apiKey={apiKey} />
      </div>
    </>
  );
}
