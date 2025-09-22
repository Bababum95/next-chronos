import { NextRequest, NextResponse } from 'next/server';

import { createSuccessResponse } from '@/lib/api/types';
import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';
import { HourlyActivity } from '@/models/hourly-activity';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const data = await HourlyActivity.find({ user: user._id });

    const totalTime = data.reduce((acc, curr) => acc + curr.time_spent, 0);

    const successResponse = createSuccessResponse('Summaries fetched successfully', { totalTime });
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
