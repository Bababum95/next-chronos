import { NextRequest, NextResponse } from 'next/server';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';
import { Heartbeat } from '@/models/heartbeat';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const { searchParams } = new URL(request.url);
    const step = Number(searchParams.get('step')) || 3600;
    const startSec = Number(searchParams.get('start'));
    const endSec = Number(searchParams.get('end'));

    const heartbeats = await Heartbeat.find({
      user: user._id,
      time: { $gte: startSec, $lte: endSec },
    }).sort({ time: 1 });

    const buckets: Record<number, number> = {};
    for (const hb of heartbeats) {
      const ts = Math.floor(hb.time);
      const bucket = Math.floor((ts - startSec) / step) * step + startSec;
      buckets[bucket] = (buckets[bucket] || 0) + 1;
    }

    const data = Object.entries(buckets).map(([bucket, count]) => ({
      time: Number(bucket),
      value: count,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
