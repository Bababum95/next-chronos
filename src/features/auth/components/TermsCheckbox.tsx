import Link from 'next/link';
import type { FC } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  value?: boolean;
  onChange: (value: boolean) => void;
  error?: string;
};

export const TermsCheckbox: FC<Props> = ({ value, onChange, error }) => {
  return (
    <div className={cn('flex items-center space-x-2', error && 'text-red-500')}>
      <Checkbox id="terms" checked={value} onCheckedChange={onChange} required isError={!!error} />
      <Label htmlFor="terms" className="text-sm">
        I agree to the{' '}
        <Link href="/terms" className="underline underline-offset-4">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
      </Label>
    </div>
  );
};
