import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';
import { NextAuthOptions } from 'next-auth';
import type { NextRequest } from 'next/server';

import { env } from '@/config';

import { dbConnect, User } from './mongoose';
import { ApiKeySchema, parseOrThrow, ValidationError } from './validation';
import { UserDoc } from './mongoose/models/user';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();

          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            existingUser = new User({
              name: user.name,
              email: user.email,
              avatarUrl: user.image,
              gallery: user.image ? [user.image] : [],
              isEmailVerified: true,
            });
            await existingUser.save();
          } else if (!existingUser.isEmailVerified) {
            existingUser.isEmailVerified = true;
            if (user.image) {
              if (!existingUser.gallery) existingUser.gallery = [];
              existingUser.gallery.push(user.image);
            }
            await existingUser.save();
          }

          return true;
        } catch (error) {
          console.error('Error during Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        await dbConnect();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser?.apiKey) {
          token.apiKey = dbUser.apiKey;
        }
      }
      return token;
    },
  },
};

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
    console.error(error);

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

/**
 * Get token from server-side cookies
 */
export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(env.tokenKey)?.value || null;
}

/**
 * Validate token and get user data on the server side
 */
export async function validateServerToken(token?: string | null): Promise<UserDoc | null> {
  if (!token) return null;

  try {
    await dbConnect();

    parseOrThrow(ApiKeySchema, { apiKey: token });
    const user = await User.findByApiKey(token);
    if (!user) return null;

    return user;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

/**
 * Get current authenticated user on the server side
 * Returns null if not authenticated or token is invalid
 */
export async function getCurrentUser(): Promise<UserDoc | null> {
  const token = await getServerToken();
  return validateServerToken(token);
}

/**
 * Require authentication - throws error if user is not authenticated
 * Use this in server components and API routes that require auth
 */
export async function requireAuth(): Promise<UserDoc> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
