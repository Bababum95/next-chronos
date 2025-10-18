'use client';

import { FC } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useTimeRange } from '../model/time-range-context';

type Props = {
  className?: string;
};

export const TimeRangeSelector: FC<Props> = ({ className }) => {
  const { range, ranges, setValue } = useTimeRange();

  return (
    <Tabs value={range.value} onValueChange={setValue} className={className}>
      <TabsList>
        {ranges.map((r) => (
          <TabsTrigger key={r.value} value={r.value}>
            {r.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
