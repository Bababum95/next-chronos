import { FC } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type Props = {
  border?: boolean;
};

export const ProjectLoadingCard: FC<Props> = ({ border = true }) => (
  <div className={cn('rounded-md min-h-40 flex items-center justify-center', border && 'border')}>
    <Spinner className="size-10" />
  </div>
);
