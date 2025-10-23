import { Loader2 } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  border?: boolean;
};

export const ProjectLoadingCard: FC<Props> = ({ border = true }) => (
  <div className={cn('rounded-md min-h-40 flex items-center justify-center', border && 'border')}>
    <Loader2 className="animate-spin size-10" />
  </div>
);
