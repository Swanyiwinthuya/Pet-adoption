'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="relative">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-indigo-500/25 to-transparent blur-2xl" />

      {/* hero */}
      <section className="container mx-auto px-4 pt-10">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[1px] shadow-lg">
          <div className="rounded-2xl bg-zinc-900/90 backdrop-blur px-6 py-7 md:px-10 md:py-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Your Dashboard
            </h1>
            <p className="mt-2 text-zinc-300">
              Quick access to find pets and track your adoption requests.
            </p>

            {/* quick actions */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Browse Pets */}
              <Link
                href="/pets"
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-indigo-500/20 blur-2xl transition group-hover:bg-indigo-400/25" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-300">
                    🐾
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">Browse Pets</div>
                    <p className="text-sm text-zinc-400">
                      Find and adopt your perfect companion.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-300">
                  Start exploring
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Link>

              {/* My Requests */}
              <Link
                href="/my-requests"
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-pink-500/20 blur-2xl transition group-hover:bg-pink-400/25" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600/20 text-pink-300">
                    📄
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">My Adoption Requests</div>
                    <p className="text-sm text-zinc-400">
                      Track status, pickup dates, and details.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-pink-300">
                  View requests
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* tips / helpers */}
      <section className="container mx-auto px-4 pb-12 pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="text-zinc-200 font-medium">Tip</div>
            <p className="mt-1 text-sm text-zinc-400">
              Use filters on the Browse page to narrow by animal, breed, and age.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="text-zinc-200 font-medium">Faster approval</div>
            <p className="mt-1 text-sm text-zinc-400">
              Add a short message in your request so admins can understand your home setup.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="text-zinc-200 font-medium">Status updates</div>
            <p className="mt-1 text-sm text-zinc-400">
              Approved or rejected requests appear instantly in <span className="text-zinc-200">My Adoption Requests</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
