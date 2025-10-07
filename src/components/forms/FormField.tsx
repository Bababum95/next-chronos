import type { FC } from 'react';

import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'input'> & {
  label?: string;
  error?: string;
  field?: 'input';
};

const Components = {
  input: Input,
};

export const FormField: FC<Props> = ({
  id,
  label,
  error,
  required,
  className,
  field = 'input',
  ...props
}) => {
  const Component = Components[field];

  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Component id={id} className={cn(error ? 'border-destructive' : '', className)} {...props} />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
