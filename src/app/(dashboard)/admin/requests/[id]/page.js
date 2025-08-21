'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function RequestDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await apiClient.getRequestById(id);
    setReq(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [id]);

  async function setStatus(status) {
    await apiClient.updateRequest(id, { status });
    await load();
  }

  if (loading) return <div>Loading…</div>;
  if (!req) return <div>Not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Request #{req.id}</h1>
        <div className="flex gap-2">
          {req.status === 'Pending' && (
            <>
              <Button variant="primary" onClick={() => setStatus('Approved')}>Approve</Button>
              <Button variant="danger" onClick={() => setStatus('Rejected')}>Reject</Button>
            </>
          )}
          <Button variant="ghost" onClick={() => router.push('/admin/requests')}>Back</Button>
        </div>
      </div>

      <div className="card">
        <div className="card-body grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500">Pet</div>
            <div className="font-medium">{req.pet?.name || req.petId}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Adopter</div>
            <div className="font-medium">{req.adopter?.name || req.adopterId}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Requested On</div>
            <div className="font-medium">{(req.dateRequested || req.createdAt || '').toString().slice(0,10)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className="mt-1">
              {req.status === 'Approved' ? <Badge variant="success">Approved</Badge>
               : req.status === 'Rejected' ? <Badge variant="danger">Rejected</Badge>
               : <Badge variant="warning">Pending</Badge>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
