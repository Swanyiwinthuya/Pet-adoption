'use client';

import { useRouter } from 'next/navigation';
import AdopterForm from '@/components/forms/AdopterForm';
import apiClient from '@/lib/api';

export default function NewAdopterPage() {
  const router = useRouter();

  async function onSubmit(data) {
    await apiClient.createAdopter(data);
    router.push('/admin/adopters');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Register Adopter</h1>
      <div className="card">
        <div className="card-body">
          <AdopterForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
