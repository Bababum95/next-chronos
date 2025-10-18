import type { ApiResponse } from '@/lib/validation';
import type { ChartConfig } from '@/components/ui/chart';
import type { Activity } from '@/lib/api/types';

export type ChartDataPoint = {
  date: string;
  current: number;
};

export type ProjectType = {
  _id: string;
  user: string;
  project_folder: string;
  git_branches?: string[];
  alternate_project?: string;
  total_time_spent?: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type ProjectDetailsType = ProjectType & {
  activities: Activity[][];
};

export type ActivityData = {
  chartData: ChartDataPoint[];
  chartConfig: ChartConfig;
  totalTimeStr: string | null;
};

export type ProjectApiResponse = ApiResponse<ProjectDetailsType>;
export type ProjectsApiResponse = ApiResponse<{
  items: ProjectType[];
  total: number;
  page: number;
  limit: number;
}>;
