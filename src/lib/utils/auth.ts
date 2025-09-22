import Cookies from 'js-cookie';

import { env } from '@/config';

export const tokenStorage = {
  /**
   * Save authentication token to cookies
   * @param token - JWT token to save
   * @param expirationDays - Number of days until token expires (default: 7)
   */
  setToken: (token: string, expirationDays = 7) => {
    Cookies.set(env.tokenKey, token, {
      expires: expirationDays,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  },

  /**
   * Get authentication token from cookies
   * @returns Token string or null if not found
   */
  getToken: (): string | null => {
    return Cookies.get(env.tokenKey) || null;
  },

  /**
   * Remove authentication token from cookies
   */
  removeToken: () => {
    Cookies.remove(env.tokenKey, { path: '/' });
  },

  /**
   * Check if user is authenticated (has valid token)
   * @returns Boolean indicating if token exists
   */
  isAuthenticated: (): boolean => {
    return !!Cookies.get(env.tokenKey);
  },
};

/**
 * Logout utility function
 * Removes token and redirects to login page
 */
export const logout = () => {
  tokenStorage.removeToken();
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
