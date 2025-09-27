import { NextRequest, NextResponse } from 'next/server';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';
import { createSuccessResponse } from '@/lib/api/types';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const successResponse = createSuccessResponse('User fetched successfully', user);
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    // Handle specific validation errors
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
