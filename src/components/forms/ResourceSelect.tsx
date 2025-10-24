'use client';

import { FC } from 'react';

import { useSelect } from '@/lib/hooks/useSelect';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  resource: string;
  filter?: string[];
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
};

export const ResourceSelect: FC<Props> = ({
  resource,
  value,
  onChange,
  filter,
  placeholder,
  label,
  error,
}) => {
  const { options, isLoading } = useSelect({ resource, filter });

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      {isLoading ? (
        <Skeleton className="h-9 w-full" />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger onClear={() => onChange?.(null)} hasValue={!!value}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
