'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/api';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import AdoptersTable from '@/components/tables/AdoptersTable';
import Button from '@/components/ui/Button';

export default function AdoptersPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await apiClient.getAdopters({ q: search, page: currentPage, limit: itemsPerPage });
      const list = Array.isArray(res) ? res : (res.items ?? res.data ?? res.results ?? []);
      const total = (res.totalItems ?? res.total ?? list.length) || 0;
      const pages = (res.totalPages ?? Math.max(1, Math.ceil(total / itemsPerPage))) || 1;
      setItems(list);
      setTotalItems(total);
      setTotalPages(pages);
    } catch (e) {
      setError(e?.message || 'Failed to load adopters');
    } finally {
      setIsLoading(false);
    }
  }, [search, currentPage]);

  useEffect(() => { load(); }, [load]);

  const visible = useMemo(() => {
    if (!search) return items;
    return items.filter(a => (a?.name || '').toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Adopter Management</h1>
        <Link href="/admin/adopters/new">
          <Button variant="primary">+ Register Adopter</Button>
        </Link>
      </div>

      <div className="card">
        <div className="card-body space-y-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name…" />
          {error && <div className="text-red-600">{error}</div>}
          {isLoading ? <div>Loading…</div> : (
            <AdoptersTable
              adopters={visible}
              onView={(id) => location.assign(`/admin/adopters/${id}`)}
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
