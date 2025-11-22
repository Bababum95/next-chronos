import { z } from 'zod';

// Check if running in Storybook environment
const isStorybook =
  (typeof process !== 'undefined' && process.env.STORYBOOK === 'true') ||
  (typeof window !== 'undefined' &&
    (window as typeof window & { __STORYBOOK__?: boolean }).__STORYBOOK__ === true);

if (!isStorybook && typeof window === 'undefined') {
  const envSchema = z.object({
    MONGODB_URI: z.string({ message: 'MONGODB_URI is required' }),
    GOOGLE_CLIENT_ID: z.string({ message: 'GOOGLE_CLIENT_ID is required' }),
    GOOGLE_CLIENT_SECRET: z.string({ message: 'GOOGLE_CLIENT_SECRET is required' }),
    NEXT_PUBLIC_INTERVAL_SEC: z.string({ message: 'NEXT_PUBLIC_INTERVAL_SEC is required' }),
    NEXT_PUBLIC_TOKEN_KEY: z.string().default('auth-token'),
    NEXT_PUBLIC_API_URL: z.string().default('http://localhost:3001'),
    NEXTAUTH_SECRET: z.string({ message: 'NEXTAUTH_SECRET is required' }),
  });

  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables', parsedEnv.error.issues);
    throw new Error('Invalid environment variables');
  }
}

export const env = {
  mongoUri: (isStorybook
    ? 'mongodb://localhost:27017/storybook'
    : process.env.MONGODB_URI) as string,
  googleClientId: isStorybook ? 'storybook-client-id' : process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: isStorybook
    ? 'storybook-client-secret'
    : process.env.GOOGLE_CLIENT_SECRET || '',
  nextauthSecret: isStorybook ? 'storybook-nextauth-secret' : process.env.NEXTAUTH_SECRET || '',
  intervalSec: isStorybook ? 60 : Number(process.env.NEXT_PUBLIC_INTERVAL_SEC),
  tokenKey: process.env.NEXT_PUBLIC_TOKEN_KEY || 'auth-token',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};

export const HOUR = 3600;
export const DAY = 24 * HOUR;
export const API_PREFIX = 'api/v1';
export const PROTECTED_ROUTES = ['/dashboard'];
export const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/forgot-password'];
export const PUBLIC_ROUTES = ['/', '/privacy', '/terms', '/api-docs'];
