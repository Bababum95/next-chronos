import { NextRequest, NextResponse } from 'next/server';

import { createErrorResponse, createSuccessResponse } from '@/lib/api/types';
import { dbConnect, User } from '@/lib/mongoose';
import { parseOrThrow, SignUpInput, SignUpSchema, ValidationError } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await request.json();
    const validatedData: SignUpInput = parseOrThrow(SignUpSchema, body);

    // Check if user already exists
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

    // Create new user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    await user.save();

    // Return success response (without password)
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      apiKey: user.apiKey,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt.toISOString(),
    };

    const successResponse = createSuccessResponse('User created successfully', userData);
    return NextResponse.json(successResponse, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Signup error:', error);

    // Handle validation errors
    if (error.message === 'ValidationError') {
      const validationErrors: ValidationError[] = error.details || [];
      const errorResponse = createErrorResponse('Validation failed', validationErrors);
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
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

    // Handle other errors
    const errorResponse = createErrorResponse('Internal server error');
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
