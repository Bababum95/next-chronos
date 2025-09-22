import { NextRequest, NextResponse } from 'next/server';

import type { SummariesQuery } from '@/lib/validation';

import { Activity, createSuccessResponse, SummariesRangeResponse } from '@/lib/api/types';
import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect, HourlyActivity } from '@/lib/mongoose';
import { parseOrThrow, SummariesQuerySchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const { searchParams } = new URL(request.url);
    const query = parseOrThrow<SummariesQuery>(SummariesQuerySchema, {
      start: searchParams.get('start'),
      end: searchParams.get('end'),
      full: searchParams.get('full'),
    });

    const startSec = Number(query.start);
    const endSec = Number(query.end);
    const full = query.full === 'true';

    const data = await HourlyActivity.find({
      user: user._id,
      timestamp: { $gte: startSec, $lte: endSec },
    })
      .select('alternate_project git_branch project_folder time_spent timestamp')
      .lean();

    const totalTime = data.reduce((acc, curr) => acc + curr.time_spent, 0);

    const response: SummariesRangeResponse['data'] = { totalTime };

    if (full) {
      // группируем по timestamp
      const grouped = new Map<number, Activity[]>();

      for (const activity of data) {
        if (!grouped.has(activity.timestamp)) {
          grouped.set(activity.timestamp, []);
        }
        grouped.get(activity.timestamp)!.push(activity);
      }

      const activities: Activity[][] = [];

      for (let ts = startSec; ts <= endSec; ts += 3600) {
        if (grouped.has(ts)) {
          activities.push(grouped.get(ts)!);
        } else {
          activities.push([{ time_spent: 0, timestamp: ts }]);
        }
      }

      response.activities = activities;
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
