import { useRef, useState, useEffect, FC, useMemo } from 'react';

import { TooltipLite } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  maxWidth?: number | string;
  className?: string;
};

export const TruncatedText: FC<Props> = ({ children, className, maxWidth = 250 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  const content = useMemo(
    () => (
      <div
        ref={ref}
        className={cn('truncate overflow-hidden whitespace-nowrap', className)}
        style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
      >
        {children}
      </div>
    ),
    [children, className, maxWidth]
  );

  if (!isOverflowed) return content;

  return <TooltipLite content={children}>{content}</TooltipLite>;
};
