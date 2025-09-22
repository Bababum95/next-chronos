import { NextRequest, NextResponse } from 'next/server';

import { createSuccessResponse } from '@/lib/api/types';
import { dbConnect, User } from '@/lib/mongoose';
import { parseOrThrow, SignInInput, SignInSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await request.json();
    const validatedData: SignInInput = parseOrThrow(SignInSchema, body);

    // Find user by email
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      apiKey: user.apiKey,
    };

    const successResponse = createSuccessResponse('Login successful', userData);
    return NextResponse.json(successResponse, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Signin error:', error);

    // Handle validation errors
    if (error.message === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.details,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
