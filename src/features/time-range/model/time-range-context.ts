'use client';

import { createContext, useContext } from 'react';

import type { TimeRangeItem } from '../lib/types';

export type TimeRangeContextValue = {
  range: TimeRangeItem;
  ranges: readonly TimeRangeItem[];
  setValue: (value: string) => void;
};

export const TimeRangeContext = createContext<TimeRangeContextValue | undefined>(undefined);

export const useTimeRange = (): TimeRangeContextValue => {
  const context = useContext(TimeRangeContext);
  if (!context) throw new Error('useTimeRange must be used within a TimeRangeProvider');
  return context;
};
