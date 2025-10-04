'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isAuthed = status === 'authenticated';
  const isAdmin = session?.user?.role === 'admin';

  const NavLink = ({ href, children }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={
          'rounded-lg px-3 py-2 text-sm transition-colors ' +
          (active
            ? 'bg-zinc-800 text-white'
            : 'text-zinc-200 hover:text-white hover:bg-zinc-800/60')
        }
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
          Pet <span className="text-indigo-400">Adoption</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/pets">Find Pets</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>

          {isAuthed && (
            isAdmin ? <NavLink href="/admin">Admin</NavLink> : <NavLink href="/dashboard">Dashboard</NavLink>
          )}

          {!isAuthed ? (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-1 rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
