'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    let ok = true;
    setLoading(true);
    fetch(`/api/pets/${id}`)
      .then(async r => {
        if (!r.ok) throw new Error('not found');
        return r.json();
      })
      .then((data)=> ok && setPet(data.pet))
      .catch(()=> ok && setPet(null))
      .finally(()=> ok && setLoading(false));
    return ()=> { ok = false; };
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-10 text-gray-600">Loading…</div>;
  if (!pet) return <div className="container mx-auto px-4 py-10 text-gray-600">Pet not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img
            src={pet.photo || '/placeholder.png'}
            alt={pet.name}
            className="w-full rounded-lg border"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{pet.name}</h1>
          <p className="text-gray-700">{pet.animal} • {pet.breed} • {pet.age} yrs</p>
          <div>
            <h3 className="font-semibold">Health & Notes</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{pet.medicalCondition || '—'}</p>
          </div>
          {(pet.isAvailable !== false) ? (
            <Button onClick={() => router.push(`/adopt/${pet._id}`)}>
              Adopt {pet.name}
            </Button>
          ) : (
            <div className="text-yellow-600 font-medium">Already adopted</div>
          )}
        </div>
      </div>
    </div>
  );
}
