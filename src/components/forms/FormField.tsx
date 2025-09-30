import type { FC } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'input'> & {
  label?: string;
  error?: string;
};

export const FormField: FC<Props> = ({ id, label, error, required, className, ...props }) => (
  <div className="grid gap-1">
    {label && <Label htmlFor={id}>{label}</Label>}
    <Input id={id} className={cn(error ? 'border-red-500' : '', className)} {...props} />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
