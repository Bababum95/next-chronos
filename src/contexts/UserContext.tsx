'use client';

import { createContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

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

export const UserContext = createContext<UserContextType | undefined>(undefined);

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
        const res = await fetcher({ queryKey: [`/users/me`] });
        return res.data as UserDoc;
      } catch {
        return null;
      }
    },
  });

  const login = (userData: UserDoc) => {
    queryClient.setQueryData(['currentUser'], userData);
  };

  const logout = async () => {
    tokenStorage.removeToken();

    await signOut({
      redirect: true,
      callbackUrl: '/auth/login',
    });
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
