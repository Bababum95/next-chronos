import type { FC } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'textarea'> & {
  label?: string;
  error?: string;
};

export const TextareaFormField: FC<Props> = ({
  id,
  label,
  error,
  required,
  className,
  ...props
}) => {
  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Textarea id={id} className={cn(error ? 'border-destructive' : '', className)} {...props} />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
