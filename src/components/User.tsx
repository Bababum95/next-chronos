import type { FC } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  name: string;
  email: string;
  avatar: string;
};

export const User: FC<Props> = ({ name, email, avatar }) => (
  <>
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="rounded-lg">{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{name}</span>
      <span className="truncate text-xs">{email}</span>
    </div>
  </>
);

export type { Props as UserProps };
