'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import SidebarQuickStats from './SidebarQuickStats';

export default function AdminSidebar() {
  const pathname = usePathname();

  const Item = ({ href, children }) => {
    const active = pathname === href || pathname.startsWith(href + '/');
    return (
      <Link
        href={href}
        className={
          'block rounded-xl px-4 py-2.5 text-[15px] transition ' +
          (active
            ? 'bg-blue-50 text-blue-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,.25)]'
            : 'text-zinc-700 hover:bg-zinc-50')
        }
      >
        {children}
      </Link>
    );
  };

  return (
    // Fixed width column. Sticky keeps it under your global header without overlapping.
    <aside className="hidden lg:block w-72 flex-none self-start sticky top-[64px]">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="mb-2">
          <div className="text-2xl font-extrabold text-zinc-900">Pet Adoption</div>
          <div className="text-sm text-zinc-500">Administration Panel</div>
        </div>

        <nav className="mt-3 space-y-1">
          <Item href="/admin">Dashboard</Item>
          <Item href="/admin/pets">Pets</Item>
          <Item href="/admin/users">Users</Item>
          <Item href="/admin/requests">Adoption Requests</Item>
          <Item href="/admin/adopters">Adopters</Item>
          <Item href="/admin/settings">Settings</Item>
        </nav>

        {/* Live Quick Stats (real data) */}
        <div className="mt-4">
          <SidebarQuickStats />
        </div>

        <div className="mt-4">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
