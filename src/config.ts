import { z } from 'zod';

if (typeof window === 'undefined') {
  const envSchema = z.object({
    MONGODB_URI: z.string({ message: 'MONGODB_URI is required' }),
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
};
