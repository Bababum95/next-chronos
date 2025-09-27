import { NextRequest, NextResponse } from 'next/server';

import { env, PROTECTED_ROUTES, AUTH_ROUTES } from '@/config';
import { ApiKeySchema } from '@/lib/validation';

/**
 * Check if the current path matches any of the given patterns
 */
function matchesPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(pattern);
  });
}

/**
 * Extract token from cookies
 */
function getTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get(env.tokenKey)?.value || null;
}

function validateToken(token: string | null): boolean {
  if (!token) return false;

  const result = ApiKeySchema.safeParse({ apiKey: token });

  return result.success;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromCookies(request);

  // Skip middleware for API routes, static files, and public assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if user is on a protected route
  if (matchesPattern(pathname, PROTECTED_ROUTES)) {
    // Validate token
    const isValid = validateToken(token);
    if (!isValid) {
      // Invalid token, clear cookies and redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(env.tokenKey);
      return response;
    }

    // Valid token, allow access
    return NextResponse.next();
  }

  // Check if user is on an auth route (login, signup, etc.)
  if (matchesPattern(pathname, AUTH_ROUTES) && token) {
    // User has token, validate it
    const isValid = validateToken(token);
    if (isValid) {
      // Valid token, redirect to dashboard
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    } else {
      // Invalid token, clear it and allow access to auth page
      const response = NextResponse.next();
      response.cookies.delete(env.tokenKey);
      return response;
    }
  }

  // For all other routes (public routes), allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
