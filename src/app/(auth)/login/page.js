'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // already logged in? send to role dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') router.replace('/admin');
      else router.replace('/dashboard');
    }
  }, [status, session, router]);

  const handleLogin = async ({ email, password }) => {
    try {
      setIsLoading(true);
      setError('');
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError('Invalid email or password.');
        return;
      }
      // fetch session and route by role
      const role = (session?.user?.role) || 'user';
      if (role === 'admin') router.replace('/admin');
      else router.replace('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Access your account to manage your adoption requests
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-600/50 bg-rose-600/10 p-3 text-rose-200">
            {error}
          </div>
        )}

        <div className="mt-4">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
