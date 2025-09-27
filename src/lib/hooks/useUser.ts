'use client';

import { useContext } from 'react';

import { UserContext } from '@/contexts/UserContext';

/**
 * Custom hook for authentication state and user data
 * Only works within the UserProvider context (dashboard pages)
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
