'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const StatusPill = ({ status }) => {
  const base = 'rounded-full px-2.5 py-1 text-xs font-medium';
  if (status === 'approved') return <span className={`${base} bg-emerald-500/15 text-emerald-300`}>Approved</span>;
  if (status === 'rejected') return <span className={`${base} bg-rose-500/15 text-rose-300`}>Rejected</span>;
  return <span className={`${base} bg-amber-500/15 text-amber-300`}>Pending</span>;
};

export default function MyRequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = session?.user?.name || '';

  useEffect(() => {
    let ok = true;
    if (!userName) { setLoading(false); setRequests([]); return; }
    setLoading(true);
    fetch(`/api/requests?userName=${encodeURIComponent(userName)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => ok && setRequests(d.requests || []))
      .catch(() => ok && setRequests([]))
      .finally(() => ok && setLoading(false));
    return () => { ok = false; };
  }, [userName]);

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-yellow-200">
          Please log in to view your requests.
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />

      <section className="container mx-auto px-4 pt-10">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[1px] shadow-lg">
          <div className="rounded-2xl bg-zinc-900/90 backdrop-blur px-6 py-7 md:px-10 md:py-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              My Adoption Requests
            </h1>
            <p className="mt-2 text-zinc-300">
              Track status, pickup dates, and details for each request.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 pt-8">
        {loading ? (
          <div className="grid gap-4">
            {Array.from({length:4}).map((_,i)=>(
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-zinc-800/50" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 text-center">
            <div className="mb-2 text-2xl">🐶</div>
            <h3 className="text-lg font-semibold text-white">No requests yet</h3>
            <p className="mt-1 text-sm text-zinc-400">Head to Browse Pets and send your first request!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div
                key={r._id}
                className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              >
                <img
                  src={r.pet?.photo || '/placeholder.png'}
                  alt={r.pet?.name || 'Pet'}
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-zinc-700/60"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="truncate text-base font-semibold text-white">
                      {r.pet?.name || 'Pet'}
                    </div>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    {r.pet?.animal} • {r.pet?.breed}
                    <span className="mx-2 text-zinc-600">|</span>
                    Pickup: <span className="text-zinc-300">{new Date(r.pickupDate).toLocaleDateString()}</span>
                  </div>
                  {r.message && (
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-300">{r.message}</p>
                  )}
                </div>

                <div className="hidden sm:flex flex-col items-end text-right text-sm text-zinc-400">
                  <div>Applicant</div>
                  <div className="text-zinc-200">{r.userName}</div>
                  <div className="text-zinc-400">{r.phoneNumber}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
