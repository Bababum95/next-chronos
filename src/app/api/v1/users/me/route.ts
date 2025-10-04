import { NextRequest, NextResponse } from 'next/server';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect, User } from '@/lib/mongoose';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/types';
import {
  parseOrThrow,
  UpdateProfileInput,
  UpdateProfileSchema,
  ValidationError,
} from '@/lib/validation';

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

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    // Parse and validate request body
    const body = await request.json();
    const validatedData: UpdateProfileInput = parseOrThrow(UpdateProfileSchema, body);

    // Check if email is being changed and if it already exists
    if (validatedData.email && validatedData.email !== user.email) {
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        const fieldError: ValidationError = {
          path: 'email',
          message: 'User with this email already exists',
          field: 'email',
        };
        const errorResponse = createErrorResponse('User with this email already exists', [
          fieldError,
        ]);
        return NextResponse.json(errorResponse, { status: 409 });
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.email && { email: validatedData.email }),
      },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const successResponse = createSuccessResponse('Profile updated successfully', updatedUser);
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Profile update error:', error);

    // Handle specific validation errors
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
