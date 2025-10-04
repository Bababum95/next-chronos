import { NextRequest, NextResponse } from 'next/server';

import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';
import { dbConnect, User } from '@/lib/mongoose';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/types';
import {
  parseOrThrow,
  ChangePasswordInput,
  ChangePasswordSchema,
  ValidationError,
} from '@/lib/validation';

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    // Parse and validate request body
    const body = await request.json();
    const validatedData: ChangePasswordInput = parseOrThrow(ChangePasswordSchema, body);

    // Get user with password for verification
    const userWithPassword = await User.findById(user._id).select('+password');
    if (!userWithPassword) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await userWithPassword.comparePassword(
      validatedData.currentPassword
    );
    if (!isCurrentPasswordValid) {
      const fieldError: ValidationError = {
        path: 'currentPassword',
        message: 'Current password is incorrect',
        field: 'currentPassword',
      };
      const errorResponse = createErrorResponse('Current password is incorrect', [fieldError]);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Check if new password is different from current password
    const isSamePassword = await userWithPassword.comparePassword(validatedData.newPassword);
    if (isSamePassword) {
      const fieldError: ValidationError = {
        path: 'newPassword',
        message: 'New password must be different from current password',
        field: 'newPassword',
      };
      const errorResponse = createErrorResponse(
        'New password must be different from current password',
        [fieldError]
      );
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Update password
    userWithPassword.password = validatedData.newPassword;
    await userWithPassword.save();

    const successResponse = createSuccessResponse('Password changed successfully', {});
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Password change error:', error);

    // Handle specific validation errors
    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    // Handle validation errors
    if (error instanceof Error && error.message === 'ValidationError') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const details = (error as any).details;
      const errorResponse = createErrorResponse('Validation failed', details);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
