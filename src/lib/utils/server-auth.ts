import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';
import type { UserDoc } from '@/lib/mongoose/models/user';

/**
 * Get current user in server components
 * Redirects to login if not authenticated
 */
export async function getAuthUser(): Promise<UserDoc> {
  const user = await getCurrentUser();

  if (!user) redirect('/auth/login');

  return user;
}

/**
 * Get current user in server components without redirect
 * Returns null if not authenticated
 */
export async function getOptionalAuthUser(): Promise<UserDoc | null> {
  return await getCurrentUser();
}
