export const DASHBOARD_CONSTANTS = {
  TIME_RANGES: [
    { value: 'day', label: 'Today' },
    { value: 'isoWeek', label: 'Week' },
    { value: 'month', label: 'Month' },
  ] as const,
  CHART_CONFIG: {
    WORK_ACTIVITY: {
      current: {
        label: 'Time',
        color: 'hsl(var(--chart-1))',
      },
    },
  },
  DEFAULT_TIME_RANGE: 'day' as const,
} as const;
