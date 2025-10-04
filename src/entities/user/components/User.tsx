import type { FC } from 'react';

import { UserAvatar } from './UserAvatar';

type Props = {
  name?: string;
  email?: string;
  avatar?: string;
};

export const User: FC<Props> = ({ name, email, avatar }) => (
  <>
    <UserAvatar url={avatar} name={name} size={8} />
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{name}</span>
      <span className="truncate text-xs">{email}</span>
    </div>
  </>
);

export type { Props as UserProps };
