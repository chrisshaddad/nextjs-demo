'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pages that don't require authentication
const publicPages = ['/', '/login'];

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize user from localStorage without triggering an effect
  const [user, setUser] = useState<User | null>(() => auth.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if not authenticated and on a protected page
  useEffect(() => {
    if (user === null && !publicPages.includes(pathname)) {
      router.push('/login');
    }
  }, [user, pathname, router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = auth.login(email, password);
    setUser(newUser);
    setIsLoading(false);
    router.push('/');
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
