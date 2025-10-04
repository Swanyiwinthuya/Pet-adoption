'use client';

import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [
      u.name, u.email, u.phone, u.role, u.status,
    ].filter(Boolean).join(' ').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Manage Users</h1>
          <p className="text-sm text-zinc-500">View and manage user accounts in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchUsers} className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr,160px]">
          <input
            className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
            placeholder="Search by name, email, phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={() => setSearch('')}
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm hover:bg-zinc-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {loading ? (
              <tr><td className="px-6 py-4 text-zinc-600" colSpan={4}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td className="px-6 py-4 text-zinc-600" colSpan={4}>No users.</td></tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id || u.email} className="hover:bg-zinc-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900">{u.name || '(no name)'}</div>
                    <div className="text-sm text-zinc-600">{u.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-700">{u.phone || '—'}</td>
                  <td className="px-6 py-4 text-sm text-zinc-700">{u.role || 'user'}</td>
                  <td className="px-6 py-4">
                    <span className={'rounded px-2 py-1 text-xs ' + (
                      u.status === 'inactive' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    )}>
                      {u.status === 'inactive' ? 'inactive' : 'active'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
