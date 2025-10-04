'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import PetCard from '@/components/cards/PetCard';

const ANIMALS = ['dog','cat','bird','rabbit','hamster','fish','other'];

export default function PetsPage() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [q, setQ] = useState('');
  const [animal, setAnimal] = useState('all');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

  // pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const queryString = useMemo(() => {
    const sp = new URLSearchParams();
    sp.set('page', String(page));
    sp.set('limit', String(limit));
    if (animal !== 'all') sp.set('animal', animal);
    if (breed.trim()) sp.set('breed', breed.trim());
    if (age.trim()) sp.set('age', age.trim());
    if (q.trim()) sp.set('q', q.trim());
    return sp.toString();
  }, [page, limit, animal, breed, age, q]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/pets?${queryString}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        if (!active) return;
        setPets(Array.isArray(d.pets) ? d.pets : []);
        setTotal(d.total ?? 0);
      })
      .catch(() => { if (active) { setPets([]); setTotal(0); } })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [queryString]);

  const onViewDetails = (id) => router.push(`/pets/${id}`);
  const onAdopt = (id) => router.push(`/adopt/${id}`);

  return (
    <div className="relative">
      {/* top gradient */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />

      {/* hero */}
      <section className="container mx-auto px-4 pt-10">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[1px] shadow-lg">
          <div className="rounded-2xl bg-zinc-900/90 backdrop-blur px-6 py-7 md:px-10 md:py-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Browse Pets
            </h1>
            <p className="mt-2 text-zinc-300">
              Find your new best friend 🐾 — filter by type, breed, and more.
            </p>

            {/* filters */}
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-[160px,1fr,140px,1fr]">
              <select
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
                value={animal}
                onChange={(e)=>{ setAnimal(e.target.value); setPage(1); }}
              >
                <option value="all">All animals</option>
                {ANIMALS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>

              <input
                value={breed}
                onChange={(e)=>{ setBreed(e.target.value); setPage(1); }}
                placeholder="Breed (e.g., Siamese)"
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                value={age}
                onChange={(e)=>{ setAge(e.target.value); setPage(1); }}
                placeholder="Max Age"
                className="h-11 rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="relative">
                <input
                  value={q}
                  onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
                  placeholder="Search name/notes"
                  className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-800/70 px-10 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="pointer-events-none absolute left-3 top-2.5 text-zinc-400">🔎</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* results */}
      <section className="container mx-auto px-4 pb-10 pt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-zinc-800/50" />
            ))}
          </div>
        ) : pets.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 text-center">
            <div className="mb-2 text-2xl">😿</div>
            <h3 className="text-lg font-semibold text-white">No pets match your filters</h3>
            <p className="mt-1 text-sm text-zinc-400">Try clearing the filters or searching a different term.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map((p) => (
                <PetCard
                  key={p._id}
                  pet={{ ...p, id: p._id }}
                  onViewDetails={onViewDetails}
                  onAdopt={onAdopt}
                />
              ))}
            </div>

            {/* pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
                onClick={()=> setPage(p => Math.max(1, p-1))}
                disabled={page<=1}
              >
                ◀ Prev
              </button>
              <span className="rounded-xl bg-zinc-800/60 px-4 py-2 text-sm text-zinc-200">
                Page {page} / {Math.max(1, Math.ceil(total/limit))} — <span className="text-zinc-400">{total} pets</span>
              </span>
              <button
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
                onClick={()=> setPage(p => Math.min(Math.ceil(total/limit)||1, p+1))}
                disabled={page >= Math.ceil(total/limit)}
              >
                Next ▶
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
