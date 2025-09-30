'use client';

import { CirclePlus, SquarePen } from 'lucide-react';

import { Header } from '@/components/Header';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/lib/hooks/useUser';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FormField } from '@/components/forms/FormField';

export default function Account() {
  const { user } = useUser();
  const { name, email, avatarUrl } = user || {};

  return (
    <>
      <Header
        breadcrumb={{ current: 'Account' }}
        extra={
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <SquarePen size={14} style={{ width: 14, height: 14 }} />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <FormField
                    id="name"
                    label="Full name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                  <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>Set a new password and confirm it below</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <FormField id="password" label="New Password" type="password" required />
                  <FormField
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    required
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />
      <div className="px-4 py-4 grid gap-4">
        <Card className="max-w-sm">
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 rounded-lg bg-muted">
              <AvatarImage src={avatarUrl || ''} alt={name} />
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
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Email: </span>
              <span>{email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Telegram: </span>
              <Button variant="ghost" size="sm">
                <CirclePlus />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
