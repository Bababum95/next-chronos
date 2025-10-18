import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Folder, Timer, CalendarDays } from 'lucide-react';

import { useTimeRange } from '@/features/time-range';
import { Activity } from '@/lib/api/types';
import { formatDate } from '@/lib/utils';
import { formatDuration } from '@/lib/utils/time';

import { WORK_ACTIVITY } from '../lib/constants';
import { ActivityData } from '../lib/types';

import { useProjectQuery } from './useProjectQuery';

export const useProjectDetails = (id?: string) => {
  const { range } = useTimeRange();
  const { data, isLoading } = useProjectQuery(range.value, id);

  const activity = useMemo((): ActivityData => {
    const project = data?.data;

    if (!project?.activities) {
      return {
        chartData: [],
        totalTimeStr: null,
        chartConfig: WORK_ACTIVITY,
      };
    }

    let totalTime = 0;

    const chartData = project.activities.map((slot: Activity[]) => {
      const currentTotalTime = slot.reduce((sum, item) => sum + (item.time_spent || 0), 0);
      totalTime += currentTotalTime;

      return {
        date: formatDate(range.value, slot[0]?.timestamp),
        current: currentTotalTime,
      };
    });

    return {
      chartData,
      totalTimeStr: formatDuration(totalTime ?? 0),
      chartConfig: WORK_ACTIVITY,
    };
  }, [data, range.value]);

  const items = useMemo(() => {
    const project = data?.data;

    return [
      {
        icon: <Folder />,
        description: 'Project folder',
        value: project?.project_folder,
      },
      {
        icon: <Folder />,
        description: 'Alternate project',
        value: project?.alternate_project,
      },
      {
        icon: <Timer />,
        description: 'Total time spent',
        value: formatDuration(project?.total_time_spent ?? 0),
      },
      {
        icon: <CalendarDays />,
        description: 'Created',
        value: project?.createdAt ? dayjs(project.createdAt).format('DD MMM YYYY') : '',
      },
    ];
  }, [data]);

  return { project: data?.data, isLoading, activity, items };
};
