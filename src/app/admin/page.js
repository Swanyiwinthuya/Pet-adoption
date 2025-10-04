'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPets: 0,
    activeUsers: 0,
    pending: 0,
    adoptedThisMonth: 0,
    lastUpdated: new Date(),
  });

  async function fetchStats() {
    setLoading(true);
    try {
      const [petsRes, usersRes, pendingRes, approvedRes] = await Promise.all([
        fetch('/api/pets?limit=1').then(r => r.ok ? r.json() : { total: 0 }),
        fetch('/api/users?limit=1').then(r => r.ok ? r.json() : { total: 0 }),
        fetch('/api/requests?status=pending').then(r => r.ok ? r.json() : { requests: [] }),
        fetch('/api/requests?status=approved').then(r => r.ok ? r.json() : { requests: [] }),
      ]);

      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();

      const adoptedThisMonth = (approvedRes.requests || []).filter(req => {
        const d = new Date(req.pickupDate || req.updatedAt || req.createdAt);
        return d.getMonth() === month && d.getFullYear() === year;
      }).length;

      setStats({
        totalPets: petsRes.total ?? (petsRes.pets?.length || 0),
        activeUsers: usersRes.total ?? (usersRes.users?.length || 0),
        pending: pendingRes.requests?.length || 0,
        adoptedThisMonth,
        lastUpdated: now,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStats(); }, []);

  const Card = ({ title, value, emoji }) => (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-500">{title}</div>
        <div className="text-lg">{emoji}</div>
      </div>
      <div className="mt-2 text-3xl font-semibold text-zinc-900">{loading ? '—' : value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <p className="text-sm text-zinc-500">Overview of pets, users, and adoptions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          >
            Refresh
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Pets" value={stats.totalPets} emoji="🐾" />
        <Card title="Active Users" value={stats.activeUsers} emoji="👥" />
        <Card title="Pending Requests" value={stats.pending} emoji="⏳" />
        <Card title="Adoptions This Month" value={stats.adoptedThisMonth} emoji="✅" />
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="text-sm font-medium text-zinc-900">Quick Actions</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a href="/admin/pets" className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-700 hover:bg-zinc-100">
            Add / Manage Pets
          </a>
          <a href="/admin/requests" className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-700 hover:bg-zinc-100">
            Review Requests
          </a>
          <a href="/admin/users" className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-700 hover:bg-zinc-100">
            Manage Users
          </a>
          <a href="/admin/adopters" className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-700 hover:bg-zinc-100">
            View Adopters
          </a>
        </div>
        <div className="mt-4 text-right text-xs text-zinc-500">
          Last updated: {new Date(stats.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
