'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/api';
import PetFilters from '@/components/filters/PetFilters';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import PetsTable from '@/components/tables/PetsTable';
import Button from '@/components/ui/Button';

export default function PetManagementPage() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const query = {
        ...filters,
        q: search,
        page: currentPage,
        limit: itemsPerPage,
      };
      const res = await apiClient.getPets(query);
      const list = Array.isArray(res) ? res : (res.items ?? res.data ?? res.results ?? []);
      const total = (res.totalItems ?? res.total ?? list.length) || 0;
      const pages = (res.totalPages ?? Math.max(1, Math.ceil(total / itemsPerPage))) || 1;
      setPets(list);
      setTotalItems(total);
      setTotalPages(pages);
    } catch (e) {
      setError(e?.message || 'Failed to load pets');
    } finally {
      setIsLoading(false);
    }
  }, [filters, search, currentPage]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!confirm('Delete this pet?')) return;
    await apiClient.deletePet(id);
    load();
  }

  const visible = useMemo(() => {
    if (!search) return pets;
    return pets.filter(p => (p?.name || '').toLowerCase().includes(search.toLowerCase()));
  }, [pets, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pet Management</h1>
        <Link href="/admin/pets/new">
          <Button variant="primary">+ Add Pet</Button>
        </Link>
      </div>

      <div className="card">
        <div className="card-body space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name…" />
            <div className="md:col-span-2">
              <PetFilters
                initialFilters={filters}
                onFiltersChange={(f) => { setCurrentPage(1); setFilters(f); }}
              />
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}
          {isLoading ? (
            <div>Loading…</div>
          ) : (
            <PetsTable
              pets={visible}
              onView={(id) => location.assign(`/admin/pets/${id}`)}
              onEdit={(id) => location.assign(`/admin/pets/${id}/edit`)}
              onDelete={handleDelete}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={(p) => setCurrentPage(Math.max(1, Math.min(totalPages, p)))}
          />
        </div>
      </div>
    </div>
  );
}
