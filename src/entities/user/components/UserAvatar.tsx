import { FC } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn, getInitials } from '@/lib/utils';

type Props = {
  url?: string;
  name?: string;
  size?: number;
};

export const UserAvatar: FC<Props> = ({ url, name, size = 24 }) => {
  return (
    <Avatar className={cn(`h-${size} w-${size} rounded-lg bg-muted`)}>
      <AvatarImage src={url} alt={name} />
      <AvatarFallback className="rounded-lg font-bold" style={{ fontSize: size * 2 }}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};
