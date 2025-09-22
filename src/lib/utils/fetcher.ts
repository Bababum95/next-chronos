'use client';

import { toast } from 'sonner';

import { tokenStorage } from '@/lib/utils/auth';

// Custom fetch function that automatically adds auth token
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = tokenStorage.getToken();

  const headers = new Headers(options.headers);

  // Add Content-Type if not already set
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add Authorization header if token exists
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Basic ${Buffer.from(`${token}:`).toString('base64')}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

// Global query function that uses authenticated fetch
export const fetcher = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
  const url = queryKey[0] as string;

  const response = url.startsWith('/api/') ? await authenticatedFetch(url) : await fetch(url);

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
        toast.error(errorBody.message);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
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
