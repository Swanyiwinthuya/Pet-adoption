'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [banner, setBanner] = useState(null); // { type: 'success'|'error', text: string }

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status !== 'all') params.set('status', status);
      const res = await fetch(`/api/requests?${params.toString()}`);
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
    setTimeout(() => setBanner(null), 2500);
  };

  const updateStatus = async (id, newStatus) => {
    // Optimistic update
    const prev = requests;
    setRequests(prev.map(r => r._id === id ? { ...r, status: newStatus } : r));

    const res = await fetch(`/api/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      flash('success', newStatus === 'approved' ? 'Request approved' : 'Request rejected');
      // Re-fetch to keep everything consistent
      fetchRequests();
    } else {
      // Revert on error
      setRequests(prev);
      const e = await res.json().catch(()=> ({}));
      flash('error', e.error || 'Failed to update status');
    }
  };

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
          <option value="approved">Approved</option>
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
              {filtered.map((r) => (
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
                    <span className={'rounded px-2 py-1 text-xs ' + (
                      r.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      r.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    )}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className={`rounded px-3 py-1 text-sm text-white ${
                          r.status === 'approved' ? 'bg-emerald-400 cursor-default' : 'bg-emerald-600 hover:bg-emerald-500'
                        }`}
                        onClick={() => r.status !== 'approved' && updateStatus(r._id, 'approved')}
                        disabled={r.status === 'approved'}
                        title={r.status === 'approved' ? 'Accepted' : 'Approve'}
                      >
                        {r.status === 'approved' ? 'Accepted ✓' : 'Approve'}
                      </button>
                      <button
                        className={`rounded px-3 py-1 text-sm text-white ${
                          r.status === 'rejected' ? 'bg-rose-400 cursor-default' : 'bg-rose-600 hover:bg-rose-500'
                        }`}
                        onClick={() => r.status !== 'rejected' && updateStatus(r._id, 'rejected')}
                        disabled={r.status === 'rejected'}
                        title={r.status === 'rejected' ? 'Rejected' : 'Reject'}
                      >
                        {r.status === 'rejected' ? 'Rejected ✗' : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
