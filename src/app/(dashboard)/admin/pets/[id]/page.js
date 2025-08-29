'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getPetById(id).then(setPet).finally(() => setLoading(false));
  }, [id]);

  async function remove() {
    if (!confirm('Delete this pet?')) return;
    await apiClient.deletePet(id);
    router.push('/admin/pets');
  }

  if (loading) return <div>Loading…</div>;
  if (!pet) return <div>Not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{pet.name}</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push(`/admin/pets/${id}/edit`)}>Edit</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </div>

      <div className="card">
        <div className="card-body grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500">Species</div>
            <div className="font-medium">{pet.species || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Breed</div>
            <div className="font-medium">{pet.breed || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Age</div>
            <div className="font-medium">{pet.age ?? '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Health Status</div>
            <div className="font-medium">{pet.healthStatus || '-'}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-gray-500">Availability</div>
            <div className="mt-1">
              {pet.isAvailable ? <Badge variant="success">Available</Badge> : <Badge variant="warning">Adopted</Badge>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
