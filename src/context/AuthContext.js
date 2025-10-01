'use client';

import { createContext, useContext, useMemo } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();

  const value = useMemo(() => ({
    user: session?.user || null,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    isAdmin: () => session?.user?.role === 'admin',

    // wrappers
    login: async ({ email, password }) => {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      return res; // { ok, error, status, url }
    },

    register: async (payload) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    },

    logout: async () => {
      await signOut({ callbackUrl: '/' });
    },

    updateProfile: async (id, body) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return res.json();
    },
  }), [session, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
