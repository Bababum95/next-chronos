'use client';

import { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { tokenStorage } from '@/lib/utils/auth';
import { fetcher } from '@/lib/utils/fetcher';
import type { UserDoc } from '@/lib/mongoose/models/user';

type UserContextType = {
  user?: UserDoc | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: UserDoc) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

type UserProviderProps = {
  children: React.ReactNode;
  initialUser?: UserDoc | null;
};

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery<UserDoc | null>({
    queryKey: ['currentUser'],
    enabled: !!tokenStorage.isAuthenticated(),
    initialData: initialUser,
    queryFn: async () => {
      if (!tokenStorage.isAuthenticated()) return null;
      try {
        const res = await fetcher({ queryKey: [`/api/v1/users/me`] });
        return res.data as UserDoc;
      } catch {
        return null;
      }
    },
  });

  const login = (userData: UserDoc) => {
    queryClient.setQueryData(['currentUser'], userData);
  };

  const logout = () => {
    queryClient.setQueryData(['currentUser'], null);
    tokenStorage.removeToken();
    window.location.href = '/login';
  };

  const refreshUser = async () => {
    await refetch();
  };

  return (
    <UserContext.Provider
      value={{
        user: data,
        isLoading,
        isAuthenticated: !!data && tokenStorage.isAuthenticated(),
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
