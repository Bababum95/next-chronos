import { NextRequest, NextResponse } from 'next/server';

import type { HeartbeatsInput } from '@/lib/validation';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect, Heartbeat } from '@/lib/mongoose';
import { HeartbeatsSchema, parseOrThrow } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const json = await request.json();
    const body = parseOrThrow<HeartbeatsInput>(HeartbeatsSchema, json);

    if (body.heartbeats?.length) {
      await Heartbeat.insertMany(
        body.heartbeats.map((heartbeat) => ({
          ...heartbeat,
          user: user._id,
        })),
        { ordered: false }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Heartbeats saved',
      count: body.heartbeats.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing heartbeats:', error);

    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save heartbeats' },
      { status: 500 }
    );
  }
}
