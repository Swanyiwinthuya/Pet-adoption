'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [banner, setBanner] = useState(null); // { type, text }

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (status !== 'all') qs.set('status', status);
      const res = await fetch(`/api/requests?${qs.toString()}`);
      const data = await res.json();
      setRequests(Array.isArray(data.requests) ? data.requests : []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, [status]);

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    if (!t) return requests;
    return requests.filter(r => {
      const hay = [
        r.userName, r.phoneNumber, r.pet?.name, r.pet?.breed, r.message
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(t);
    });
  }, [requests, searchTerm]);

  const flash = (type, text) => {
    setBanner({ type, text });
    setTimeout(() => setBanner(null), 2200);
  };

  const updateStatus = async (id, newStatus) => {
    // optimistic row update
    const prev = requests;
    setRequests(prev.map(r => r._id === id ? { ...r, status: newStatus } : r));

    const res = await fetch(`/api/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      flash('success', newStatus === 'approved' ? 'Marked as Completed' : 'Marked as Rejected');
      fetchRequests(); // keep in sync with DB
    } else {
      setRequests(prev); // revert
      const e = await res.json().catch(()=> ({}));
      flash('error', e.error || 'Failed to update status');
    }
  };

  const StatusPill = ({ s }) => (
    <span className={
      'rounded px-2 py-1 text-xs ' +
      (s === 'approved'
        ? 'bg-emerald-100 text-emerald-700'
        : s === 'rejected'
        ? 'bg-rose-100 text-rose-700'
        : 'bg-amber-100 text-amber-700')
    }>
      {s === 'approved' ? 'Completed' : s === 'rejected' ? 'Rejected' : 'Pending'}
    </span>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b px-6 py-4">
        <h3 className="mr-auto text-lg font-semibold text-zinc-900">All Adoption Requests</h3>
        <input
          className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
          placeholder="Search by name, pet, breed…"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
        <select
          className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
          value={status}
          onChange={(e)=> setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={fetchRequests}
          className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm hover:bg-zinc-50"
        >
          Refresh
        </button>
      </div>

      {banner && (
        <div className={`mx-6 mt-4 rounded-lg p-3 text-sm ${
          banner.type === 'success'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {banner.text}
        </div>
      )}

      {loading ? (
        <div className="p-6 text-zinc-600">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="p-6 text-zinc-600">No requests.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Pet</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Pickup</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {filtered.map((r) => {
                const isPending = r.status === 'pending';
                return (
                  <tr key={r._id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{r.userName}</div>
                      {r.message && <div className="text-sm text-zinc-600">{r.message}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-700">{r.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{r.pet?.name || '—'}</div>
                      <div className="text-sm text-zinc-600">{r.pet?.animal} • {r.pet?.breed}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-700">
                      {new Date(r.pickupDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill s={r.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <div className="flex justify-end gap-2">
                          <button
                            className="rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-500"
                            onClick={() => updateStatus(r._id, 'approved')}
                          >
                            Approve
                          </button>
                          <button
                            className="rounded bg-rose-600 px-3 py-1 text-sm text-white hover:bg-rose-500"
                            onClick={() => updateStatus(r._id, 'rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
