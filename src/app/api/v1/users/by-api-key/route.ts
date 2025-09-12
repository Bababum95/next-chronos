import { NextRequest, NextResponse } from 'next/server';

import { CustomError, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get API key from query parameters and validate
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('apiKey');

    // Validate API key and find user
    const user = await validateApiKeyAndFindUser(apiKey);

    // Return user data (without password)
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle specific validation errors
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
