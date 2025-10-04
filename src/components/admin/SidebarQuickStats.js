'use client';

import { useEffect, useState } from 'react';

export default function SidebarQuickStats() {
  const [stats, setStats] = useState({ pets: '—', users: '—', pending: '—' });

  async function load() {
    try {
      const [petsRes, usersRes, pendingRes] = await Promise.all([
        fetch('/api/pets?limit=1').then(r => r.ok ? r.json() : { total: 0 }),
        fetch('/api/users?limit=1').then(r => r.ok ? r.json() : { total: 0 }),
        fetch('/api/requests?status=pending').then(r => r.ok ? r.json() : { requests: [] }),
      ]);
      setStats({
        pets: petsRes.total ?? (petsRes.pets?.length || 0),
        users: usersRes.total ?? (usersRes.users?.length || 0),
        pending: pendingRes.requests?.length || 0,
      });
    } catch {
      setStats({ pets: '—', users: '—', pending: '—' });
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="rounded-xl bg-zinc-50 px-4 py-3">
      <div className="text-sm font-medium text-zinc-800">Quick Stats</div>
      <div className="mt-2 space-y-1.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Total Pets:</span>
          <span className="font-medium text-zinc-900">{stats.pets}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Active Users:</span>
          <span className="font-medium text-zinc-900">{stats.users}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Pending Requests:</span>
          <span className="font-medium text-zinc-900">{stats.pending}</span>
        </div>
      </div>
      <button
        onClick={load}
        className="mt-3 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100"
      >
        Refresh
      </button>
    </div>
  );
}
