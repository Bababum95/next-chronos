'use client';

import { toast } from 'sonner';

import { API_PREFIX, env } from '@/config';
import { tokenStorage } from '@/lib/utils/auth';

/**
 * Helper function to build API URLs
 * For auth endpoints, use Next.js API routes
 * For other endpoints, use external api-chronos service
 */
const getApiUrl = (path: string): string => {
  if (path.startsWith('/auth')) {
    return `/${API_PREFIX}${path}`;
  }
  // All other endpoints go to api-chronos (which has API_PREFIX prefix)
  return `${env.apiUrl}/${API_PREFIX}${path}`;
};

// Custom fetch function that automatically adds auth token
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = tokenStorage.getToken();
  const headers = new Headers(options.headers);
  const targetUrl = getApiUrl(url);

  // Add Content-Type if not already set
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Add Authorization header if token exists
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Basic ${Buffer.from(`${token}:`).toString('base64')}`);
  }

  return fetch(targetUrl, {
    ...options,
    headers,
  });
};

// Global query function that uses authenticated fetch
export const fetcher = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
  const url = queryKey[0] as string;

  // Check if url contains protocol (http:// or https://)
  const hasProtocol = /^https?:\/\//i.test(url);
  const response = hasProtocol ? await fetch(url) : await authenticatedFetch(url);

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
        toast.error(errorBody.message);
      }
    } catch (error) {
      console.error(error);
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// Helper for creating authenticated mutations
export const createAuthenticatedMutation = <TData = unknown, TVariables = unknown>(
  url: string,
  options: Omit<RequestInit, 'body'> = {}
) => {
  return async (variables: TVariables): Promise<TData> => {
    const response = await authenticatedFetch(url, {
      ...options,
      method: options.method || 'POST',
      body: JSON.stringify(variables),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Request failed');
    }

    return result;
  };
};
