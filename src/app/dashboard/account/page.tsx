'use client';

import { Header } from '@/components/Header';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/lib/hooks/useUser';

export default function Account() {
  const { user } = useUser();
  const { name, email } = user || {};

  return (
    <>
      <Header breadcrumb={{ current: 'Account' }} />
      <div className="px-4 py-4 grid gap-4">
        <Card className="max-w-sm">
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 rounded-lg bg-muted">
              <AvatarImage src={''} alt={name} />
              <AvatarFallback className="rounded-lg text-4xl font-bold">
                {name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-2xl">{name}</span>
          </CardContent>
        </Card>
        <Card className="max-w-sm pt-0">
          <CardHeader className="flex items-center border-b py-4">
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email: </span>
              <span>{email}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
