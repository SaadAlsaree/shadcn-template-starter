'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import {
  saveUserSettings,
  saveUserToCookie,
  clearUserCookie
} from '@/app/actions/user-actions';
import type { User } from '@/types';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  updateSettings: (settings: {
    theme?: string;
    language?: string;
    fontSize?: string;
  }) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  role: 'admin',
  status: 'active',
  createdAt: new Date().toISOString()
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('user');
    }
    return false;
  });

  const login = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const loggedInUser: User = { ...mockUser, email };
    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    await saveUserToCookie(loggedInUser);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    await clearUserCookie();
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      saveUserToCookie(updatedUser);
    }
  };

  const updateSettings = async (settings: {
    theme?: string;
    language?: string;
    fontSize?: string;
  }) => {
    await saveUserSettings(settings);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        updateSettings
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
