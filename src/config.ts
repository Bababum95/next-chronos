import { z } from 'zod';

if (typeof window === 'undefined') {
  const envSchema = z.object({
    MONGODB_URI: z.string({ message: 'MONGODB_URI is required' }),
    NEXT_PUBLIC_INTERVAL_SEC: z.string({ message: 'NEXT_PUBLIC_INTERVAL_SEC is required' }),
    NEXT_PUBLIC_TOKEN_KEY: z.string().default('auth-token'),
  });

  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    // eslint-disable-next-line no-console
    console.error('❌ Invalid environment variables', parsedEnv.error.issues);
    throw new Error('Invalid environment variables');
  }
}

export const env = {
  mongoUri: process.env.MONGODB_URI as string,
  intervalSec: Number(process.env.NEXT_PUBLIC_INTERVAL_SEC),
  tokenKey: process.env.NEXT_PUBLIC_TOKEN_KEY || 'auth-token',
};
export const HOUR = 3600;
export const DAY = 24 * HOUR;
