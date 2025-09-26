import type { NextRequest } from 'next/server';

import { User } from './mongoose';
import { ApiKeySchema, parseOrThrow, ValidationError } from './validation';

// Function to extract API key from request headers
export function extractApiKeyFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [apiKey] = credentials.split(':');

    return apiKey || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return null;
  }
}

export class CustomError extends Error {
  constructor(
    public name: string,
    message: string,
    public code?: number,
    public details?: ValidationError[]
  ) {
    super(message);
    this.name = name;
  }
}

// Function to validate API key and find user
export async function validateApiKeyAndFindUser(apiKey?: string | null) {
  if (!apiKey) {
    throw new CustomError('NotFoundError', 'API key is required', 404);
  }

  // Validate API key format
  try {
    parseOrThrow(ApiKeySchema, { apiKey });
  } catch (error) {
    if (error instanceof Error && error.message === 'ValidationError') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const details = (error as any).details;
      throw new CustomError('InvalidApiKeyError', 'Invalid API key format', 400, details);
    }
    throw error;
  }

  // Find user by API key
  const user = await User.findByApiKey(apiKey);

  if (!user) {
    throw new CustomError('NotFoundError', 'User not found with this API key', 404);
  }

  return user;
}
