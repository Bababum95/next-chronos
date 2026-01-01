'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { useTimeRange } from '../model/time-range-context';

type Props = {
  className?: string;
  type?: 'select' | 'tabs';
};

export const TimeRangeSelector: FC<Props> = ({ className, type = 'tabs' }) => {
  const { range, ranges, setValue, shiftRange, offset } = useTimeRange();

  return (
    <div className="flex items-center gap-2">
      {type === 'select' ? (
        <Select value={range.value} onValueChange={setValue}>
          <SelectTrigger className={cn('min-w-[6rem]', className)}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="min-w-[6rem]">
            {ranges.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Tabs value={range.value} onValueChange={setValue} className={className}>
          <TabsList>
            {ranges.map((r) => (
              <TabsTrigger key={r.value} value={r.value}>
                {r.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      <Button
        variant="ghost"
        className="size-8 order-first"
        size="icon"
        onClick={() => shiftRange('prev')}
      >
        <ChevronLeft />
      </Button>
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
  );
};
