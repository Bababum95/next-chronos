import { NextResponse } from 'next/server';

import { env } from '@/config';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  // Clear the authentication cookie
  response.cookies.delete(env.tokenKey);

  return response;
}
