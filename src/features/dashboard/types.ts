import type { ChartConfig } from '@/components/ui/chart';

export type ChartDataPoint = {
  date: string;
  current: number;
};

export type ProjectChartDataPoint = {
  date: string;
  [projectName: string]: string | number;
};

export type WorkActivityData = {
  chartData: ChartDataPoint[];
  chartConfig: ChartConfig;
  totalTimeStr: string | null;
};

export type ProjectActivityData = {
  chartData: ProjectChartDataPoint[];
  chartConfig: ChartConfig;
};

export type DashboardStats = {
  totalTimeAllTime: string;
  totalTimePeriod: string;
  workActivity: WorkActivityData;
  projectActivity: ProjectActivityData;
};

export type DashboardLoadingState = {
  summariesLoading: boolean;
  chartDataLoading: boolean;
};

export type DashboardErrorState = {
  summariesError?: string;
  chartDataError?: string;
};
