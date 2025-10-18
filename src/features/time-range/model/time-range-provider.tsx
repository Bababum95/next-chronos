'use client';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useState, useCallback, ReactNode, FC } from 'react';

import { TIME_RANGES } from '../lib/constants';
import type { TimeRangeItem } from '../lib/types';

import { TimeRangeContext } from './time-range-context';

dayjs.extend(isoWeek);

type Props = {
  children: ReactNode;
  ranges?: readonly TimeRangeItem[];
  defaultValue?: TimeRangeItem;
};

export const TimeRangeProvider: FC<Props> = ({
  children,
  ranges = TIME_RANGES,
  defaultValue = TIME_RANGES[0],
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = useCallback(
    (newValue: string) => {
      const current = ranges.find((range) => range.value === newValue);
      if (current) setValue(current);
    },
    [ranges]
  );

  return (
    <TimeRangeContext.Provider value={{ range: value, ranges, setValue: handleChange }}>
      {children}
    </TimeRangeContext.Provider>
  );
};
