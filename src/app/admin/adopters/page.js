'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminAdoptersPage() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');

  const fetchApproved = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requests?status=approved');
      const data = await res.json();
      setRequests(Array.isArray(data.requests) ? data.requests : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApproved(); }, []);

  // Build adopters from approved requests
  const adopters = useMemo(() => {
    const map = new Map();
    for (const r of requests) {
      const key = `${r.userName}||${r.phoneNumber}`;
      const existing = map.get(key) || { userName: r.userName, phoneNumber: r.phoneNumber, requests: [] };
      existing.requests.push(r);
      map.set(key, existing);
    }
    let arr = Array.from(map.values());
    const q = search.trim().toLowerCase();
    if (q) {
      arr = arr.filter(a =>
        (`${a.userName} ${a.phoneNumber} ${a.requests.map(x=>x.pet?.name).join(' ')}`).toLowerCase().includes(q)
      );
    }
    // sort latest first by most recent request date
    arr.sort((a, b) => {
      const da = new Date(a.requests[0]?.updatedAt || a.requests[0]?.createdAt || 0);
      const db = new Date(b.requests[0]?.updatedAt || b.requests[0]?.createdAt || 0);
      return db - da;
    });
    return arr;
  }, [requests, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Manage Adopters</h1>
          <p className="text-sm text-zinc-500">View and manage people approved to adopt</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchApproved} className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr,160px]">
          <input
            className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
            placeholder="Search by name, phone, pet…"
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Adopter</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Approved Pets</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Next Pickup</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {loading ? (
              <tr><td className="px-6 py-4 text-zinc-600" colSpan={3}>Loading…</td></tr>
            ) : adopters.length === 0 ? (
              <tr><td className="px-6 py-4 text-zinc-600" colSpan={3}>No adopters yet.</td></tr>
            ) : (
              adopters.map((a, i) => {
                const nextPickup = a.requests
                  .map(r => new Date(r.pickupDate))
                  .sort((x, y) => x - y)[0];
                const petList = a.requests.map(r => `${r.pet?.name || 'Pet'} (${r.pet?.animal || ''} ${r.pet?.breed || ''})`).join(', ');
                return (
                  <tr key={i} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{a.userName}</div>
                      <div className="text-sm text-zinc-600">{a.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-700">{petList}</td>
                    <td className="px-6 py-4 text-sm text-zinc-700">{nextPickup ? nextPickup.toLocaleDateString() : '—'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
