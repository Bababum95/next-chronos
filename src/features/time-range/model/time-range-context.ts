'use client';

/**
 * This module provides a React context for managing and accessing time range data
 * within the application. It includes the context value type definition, the context
 * itself, and a custom hook to consume the context.
 */

import { createContext, useContext } from 'react';

import type { TimeRangeItem } from '../lib/types';

/**
 * Represents the value provided by the TimeRangeContext.
 *
 * @property {TimeRangeItem} range - The currently selected time range item.
 * @property {number} start - The start UNIX timestamp (in seconds) of the selected time range.
 * @property {number} end - The end UNIX timestamp (in seconds) of the selected time range.
 * @property {readonly TimeRangeItem[]} ranges - An array of all available time range items.
 * @property {(value: string) => void} setValue - Function to update the selected time range by value.
 * @property {string | null} formattedPeriod - A formatted string representing the selected time period, or null if unavailable.
 * @property {number} offset - A number representing the current range shift (in units of the selected period).
 * @property {(direction: 'prev' | 'next') => void} shiftRange - Function to change the current offset backward or forward.
 */
export type TimeRangeContextValue = {
  range: TimeRangeItem;
  start: number;
  end: number;
  ranges: readonly TimeRangeItem[];
  setValue: (value: string) => void;
  formattedPeriod: string | null;
  offset: number;
  shiftRange: (direction: 'prev' | 'next') => void;
};

/**
 * React context that provides access to the current time range data and controls.
 */
export const TimeRangeContext = createContext<TimeRangeContextValue | undefined>(undefined);

/**
 * Custom hook to access the TimeRangeContext.
 *
 * @returns {TimeRangeContextValue} The current context value containing time range data and controls.
 * @throws Will throw an error if used outside of a TimeRangeProvider.
 */
export const useTimeRange = (): TimeRangeContextValue => {
  const context = useContext(TimeRangeContext);
  if (!context) throw new Error('useTimeRange must be used within a TimeRangeProvider');
  return context;
};
