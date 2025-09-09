import { NextRequest, NextResponse } from 'next/server';

import type { HeartbeatsInput } from '@/lib/validation';

import { dbConnect, Heartbeat } from '@/lib/mongoose';
import { HeartbeatsSchema, parseOrThrow } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const body = parseOrThrow<HeartbeatsInput>(HeartbeatsSchema, json);

    await dbConnect();
    if (body.heartbeats?.length) {
      await Heartbeat.insertMany(body.heartbeats, { ordered: false });
    }

    return NextResponse.json({
      success: true,
      message: 'Heartbeats saved',
      count: body.heartbeats.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing heartbeats:', error);
    if (typeof error === 'object' && error !== null && 'details' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          details: (error as { details?: unknown }).details,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to save heartbeats' },
      { status: 500 }
    );
  }
}
