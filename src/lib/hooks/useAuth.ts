'use client';

import { useUser } from '@/contexts/UserContext';

/**
 * Custom hook for authentication state and user data
 * Only works within the UserProvider context (dashboard pages)
 */
export function useAuth() {
  const { user, isLoading, isAuthenticated, logout, refreshUser } = useUser();

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    refreshUser,
    // Convenience properties
    userId: user?.id,
    userEmail: user?.email,
    userName: user?.name,
    userRole: user?.isEmailVerified ? 'verified' : 'unverified',
  };
}
