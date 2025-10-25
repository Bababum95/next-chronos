'use client';

import { FC } from 'react';

import { useSelect } from '@/lib/hooks/useSelect';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type Props = {
  resource: string;
  filter?: string[];
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder: string;
  label?: string;
  error?: string;
};

export const ResourceSelect: FC<Props> = ({
  resource,
  value,
  onChange,
  filter,
  label,
  error,
  placeholder,
}) => {
  const { options, isLoading } = useSelect({ resource, filter });

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <NativeSelect
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onClear={() => onChange?.(null)}
        isLoading={isLoading}
      >
        <NativeSelectOption value="" disabled>
          {placeholder}
        </NativeSelectOption>
        {options?.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
