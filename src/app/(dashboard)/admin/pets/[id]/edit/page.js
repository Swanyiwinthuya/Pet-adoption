'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PetForm from '@/components/forms/PetForm';
import apiClient from '@/lib/api';
import Button from '@/components/ui/Button';

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getPetById(id).then(setPet).finally(() => setLoading(false));
  }, [id]);

  async function onSubmit(data) {
    await apiClient.updatePet(id, data);
    router.push('/admin/pets');
  }

  if (loading) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Pet</h1>
        <Button variant="ghost" onClick={() => router.push(`/admin/pets/${id}`)}>View</Button>
      </div>
      <div className="card">
        <div className="card-body">
          <PetForm initialData={pet} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

