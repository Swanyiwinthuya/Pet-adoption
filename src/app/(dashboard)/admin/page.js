'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ pets: 0, adopters: 0, requests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, a, r] = await Promise.all([
          apiClient.getPets({ page: 1, limit: 1 }),
          apiClient.getAdopters({ page: 1, limit: 1 }),
          apiClient.getRequests({ page: 1, limit: 1 }),
        ]);
        const toCount = (res) => Array.isArray(res) ? res.length : (res.totalItems ?? res.total ?? (res.items?.length ?? 0));
        setCounts({ pets: toCount(p), adopters: toCount(a), requests: toCount(r) });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card"><div className="card-header">Pets</div><div className="card-body text-3xl">{loading ? '…' : counts.pets}</div></div>
        <div className="card"><div className="card-header">Adopters</div><div className="card-body text-3xl">{loading ? '…' : counts.adopters}</div></div>
        <div className="card"><div className="card-header">Requests</div><div className="card-body text-3xl">{loading ? '…' : counts.requests}</div></div>
      </div>

      <div className="card">
        <div className="card-header">Quick Links</div>
        <div className="card-body flex flex-wrap gap-3">
          <Link href="/admin/pets"><Button variant="primary">Manage Pets</Button></Link>
          <Link href="/admin/adopters"><Button variant="primary">Manage Adopters</Button></Link>
          <Link href="/admin/requests"><Button variant="primary">Manage Requests</Button></Link>
        </div>
      </div>
    </div>
  );
}
