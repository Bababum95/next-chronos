import { ChevronDownIcon, XIcon } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

type NativeSelectProps = React.ComponentProps<'select'> & {
  onClear?: () => void;
  isLoading?: boolean;
};

const NativeSelect: FC<NativeSelectProps> = ({
  className,
  onClear,
  value,
  isLoading,
  disabled,
  ...props
}) => {
  const canClear = onClear && value && !isLoading;

  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        value={value}
        disabled={isLoading || disabled}
        className={cn(
          'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
          'focus-visible:border-ring focus-visible:ring-ring/50',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
      <div className="absolute top-1/2 right-3.5 -translate-y-1/2">
        {canClear ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            className="size-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Clear selection"
          >
            <XIcon className="size-4" />
          </button>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <ChevronDownIcon
            className="text-muted-foreground pointer-events-none size-4 opacity-50 select-none"
            aria-hidden="true"
            data-slot="native-select-icon"
          />
        )}
      </div>
    </div>
  );
};

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
  return <optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />;
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
