'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import Button from '@/components/ui/Button';
import AdopterForm from '@/components/forms/AdopterForm';

export default function AdopterDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [adopter, setAdopter] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const a = await apiClient.getAdopterById(id);
        setAdopter(a);
        // Try to load adoption history if your API supports it
        try {
          const r = await apiClient.getRequests({ adopterId: id });
          setHistory(Array.isArray(r) ? r : (r.items ?? []));
        } catch {}
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function save(data) {
    await apiClient.updateAdopter(id, data);
    const a = await apiClient.getAdopterById(id);
    setAdopter(a);
    setEditing(false);
  }

  async function remove() {
    if (!confirm('Delete this adopter?')) return;
    await apiClient.deleteAdopter(id);
    router.push('/admin/adopters');
  }

  if (loading) return <div>Loading…</div>;
  if (!adopter) return <div>Not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{adopter.name}</h1>
        <div className="flex gap-2">
          {!editing && <Button variant="secondary" onClick={() => setEditing(true)}>Edit</Button>}
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </div>

      <div className="card">
        <div className="card-body space-y-4">
          {editing ? (
            <AdopterForm initialData={adopter} onSubmit={save} />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{adopter.email || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{adopter.phone || '-'}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium whitespace-pre-wrap">{adopter.address || '-'}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-gray-500">Notes</div>
                <div className="font-medium whitespace-pre-wrap">{adopter.notes || '-'}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">Adoption History</div>
        <div className="card-body">
          {history.length === 0 ? (
            <div className="text-gray-500">No adoption requests found for this adopter.</div>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {history.map(h => (
                <li key={h.id}>
                  {h.pet?.name || h.petId} — {h.status} — {(h.dateRequested || h.createdAt || '').toString().slice(0,10)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
