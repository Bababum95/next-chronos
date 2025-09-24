import { NextRequest, NextResponse } from 'next/server';

import type { SummariesQuery } from '@/lib/validation';

import { DAY, HOUR } from '@/config';
import { Activity, createSuccessResponse, SummariesRangeResponse } from '@/lib/api/types';
import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect, HourlyActivity } from '@/lib/mongoose';
import { formatDuration } from '@/lib/utils/time';
import { parseOrThrow, SummariesQuerySchema } from '@/lib/validation';

function aggregateActivities(activities: Activity[][]): Activity[][] {
  return activities.map((group) => {
    const map = new Map<string, Activity>();

    for (const act of group) {
      // Build composite key (ignoring time_spent)
      const key = JSON.stringify({
        timestamp: act.timestamp,
        alternate_project: act.alternate_project ?? null,
        git_branch: act.git_branch ?? null,
        project_folder: act.project_folder ?? null,
      });

      if (!map.has(key)) {
        map.set(key, { ...act });
      } else {
        const existing = map.get(key)!;
        existing.time_spent += act.time_spent;
      }
    }

    return Array.from(map.values());
  });
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const { searchParams } = new URL(request.url);
    const query = parseOrThrow<SummariesQuery>(SummariesQuerySchema, {
      start: searchParams.get('start'),
      end: searchParams.get('end'),
      full: searchParams.get('full') === 'true',
    });

    const startSec = Number(query.start);
    const endSec = Number(query.end);
    const range = endSec - startSec;
    const interval = Number((searchParams.get('interval') ?? range < DAY) ? HOUR : DAY);

    const data = await HourlyActivity.find({
      user: user._id,
      timestamp: { $gte: startSec, $lte: endSec },
    })
      .select('alternate_project git_branch project_folder time_spent timestamp')
      .lean();

    const totalTime = data.reduce((acc, curr) => acc + curr.time_spent, 0);

    const response: SummariesRangeResponse['data'] = {
      totalTime,
      totalTimeStr: formatDuration(totalTime),
    };

    if (query.full) {
      const grouped = new Map<number, Activity[]>();

      for (const activity of data) {
        const normalizedTs = Math.floor(activity.timestamp / interval) * interval;
        if (!grouped.has(normalizedTs)) {
          grouped.set(normalizedTs, []);
        }
        grouped.get(normalizedTs)!.push({ ...activity, timestamp: normalizedTs });
      }

      const activities: Activity[][] = [];

      const startNorm = Math.floor(startSec / interval) * interval;
      const endNorm = Math.floor(endSec / interval) * interval;

      for (let ts = startNorm; ts <= endNorm; ts += interval) {
        if (grouped.has(ts)) {
          activities.push(grouped.get(ts)!);
        } else {
          activities.push([{ time_spent: 0, timestamp: ts }]);
        }
      }

      response.activities = aggregateActivities(activities);
    }

    const successResponse = createSuccessResponse('Summaries fetched successfully', response);
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
