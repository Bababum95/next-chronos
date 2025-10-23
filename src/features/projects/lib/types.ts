import type { ApiResponse } from '@/lib/validation';
import type { ChartConfig } from '@/components/ui/chart';
import type { TimeRangeItem } from '@/features/time-range/lib/types';

export type ChartDataPoint = {
  date: string;
  current: number;
};

export type ProjectType = {
  _id: string;
  user: string;
  name: string;
  description?: string;
  project_folder: string;
  git_branches?: string[];
  alternate_project?: string;
  total_time_spent?: number;
  is_favorite?: boolean;
  is_archived?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ActivityData = {
  chartData: ChartDataPoint[];
  chartConfig: ChartConfig;
  totalTimeStr: string | null;
  formattedPeriod: string;
  range: TimeRangeItem;
};

export type ProjectFormData = Partial<ProjectType>;
export type ProjectApiResponse = ApiResponse<ProjectType>;
export type ProjectsApiResponse = ApiResponse<{
  items: ProjectType[];
  total: number;
  page: number;
  limit: number;
}>;
