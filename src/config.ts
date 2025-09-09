import { z } from 'zod';

if (typeof window === 'undefined') {
  const envSchema = z.object({
    MONGODB_URI: z.string({ message: 'MONGODB_URI is required' }),
    API_TOKEN: z.string({ message: 'API_TOKEN is required' }),
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
  apiToken: process.env.API_TOKEN as string,
};
