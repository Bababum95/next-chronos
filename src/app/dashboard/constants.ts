export const DASHBOARD_CONSTANTS = {
  TIME_RANGES: [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'Week' },
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
  CHART_HEIGHT: 250,
  SKELETON_HEIGHT: 8,
} as const;
