'use client';

import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useTimeRange } from '../model/time-range-context';

type Props = {
  className?: string;
  layout?: 'single' | 'double';
};

export const TimeRangeSelector: FC<Props> = ({ className, layout = 'single' }) => {
  const { range, ranges, setValue, formattedPeriod, shiftRange, offset } = useTimeRange();

  return (
    <div className={cn('flex items-center gap-2', layout === 'double' && 'flex-col gap-0')}>
      <Tabs value={range.value} onValueChange={setValue} className={className}>
        <TabsList>
          {ranges.map((r) => (
            <TabsTrigger key={r.value} value={r.value}>
              {r.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div
        className={cn(
          'flex items-center gap-2 w-full justify-between',
          layout === 'single' && 'contents'
        )}
      >
        <Button
          variant="ghost"
          className="size-8 order-first"
          size="icon"
          onClick={() => shiftRange('prev')}
        >
          <ChevronLeft />
        </Button>
        <span
          className={cn('text-sm max-w-[100px] sm:max-w-none', layout === 'single' && 'hidden')}
        >
          {formattedPeriod}
        </span>
        <Button
          variant="ghost"
          className="size-8 order-last"
          size="icon"
          disabled={offset === 0}
          onClick={() => shiftRange('next')}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
