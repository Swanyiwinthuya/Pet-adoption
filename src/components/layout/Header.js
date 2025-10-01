'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthed = status === 'authenticated';
  const isAdmin = session?.user?.role === 'admin';

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Pet Adoption</Link>

        <nav className="flex items-center gap-4">
          <Link href="/pets" className="hover:underline">Find Pets</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>

          {!isAuthed ? (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="rounded bg-blue-600 text-white px-3 py-1">Register</Link>
            </>
          ) : (
            <>
              {isAdmin ? (
                <Link href="/admin" className="hover:underline">Admin</Link>
              ) : (
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              )}
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-600 hover:underline">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
