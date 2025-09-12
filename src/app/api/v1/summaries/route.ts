import { NextRequest, NextResponse } from 'next/server';

import type { SummariesQuery } from '@/lib/validation';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';
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

    // 1. Принять start и end как UNIX timestamp в секундах
    const startSec = Number(query.start);
    const endSec = Number(query.end);

    // 2. Загрузить heartbeats за диапазон для конкретного пользователя, отсортировать по времени
    const heartbeats = await Heartbeat.find({
      user: user._id,
      time: { $gte: startSec, $lte: endSec },
    }).sort({ time: 1 });

    // 3. Разбить диапазон на интервалы по 300 секунд (5 минут)
    const intervalSec = 300;
    const totalIntervals = Math.ceil((endSec - startSec) / intervalSec);

    // 4. Собрать Set активных интервалов на основе hb.time
    const activeIntervalSet = new Set<number>();
    for (const hb of heartbeats) {
      const hbTs = Math.floor(hb.time);
      const intervalIdx = Math.floor((hbTs - startSec) / intervalSec);
      if (intervalIdx >= 0 && intervalIdx < totalIntervals) {
        activeIntervalSet.add(intervalIdx);
      }
    }
    const activeIntervals = activeIntervalSet.size;

    // Вычисление общего времени активности в секундах
    const activeTimeSec = activeIntervals * intervalSec;
    // Преобразование времени в строку
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
