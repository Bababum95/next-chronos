import { NextRequest, NextResponse } from 'next/server';

import type { SummariesQuery } from '@/lib/validation';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';
import { calculateActiveTime } from '@/lib/utils';
import { SummariesQuerySchema, parseOrThrow } from '@/lib/validation';
import { Heartbeat } from '@/models/heartbeat';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const { searchParams } = new URL(request.url);
    const query = parseOrThrow<SummariesQuery>(SummariesQuerySchema, {
      start: searchParams.get('start'),
      end: searchParams.get('end'),
    });

    const startSec = Number(query.start);
    const endSec = Number(query.end);

    const heartbeats = await Heartbeat.find({
      user: user._id,
      time: { $gte: startSec, $lte: endSec },
    }).sort({ time: 1 });

    const activeTimeSec = calculateActiveTime(heartbeats, startSec, endSec);

    // Convert active time to a string representation
    let activeTimeStr: string;
    if (activeTimeSec >= 3600) {
      const hours = Math.floor(activeTimeSec / 3600);
      const minutes = Math.floor((activeTimeSec % 3600) / 60);
      activeTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      const minutes = Math.floor(activeTimeSec / 60);
      activeTimeStr = `${minutes} min`;
    }

    return NextResponse.json({
      success: true,
      activeTime: activeTimeStr,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
