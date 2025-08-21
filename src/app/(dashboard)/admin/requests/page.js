'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import apiClient from '@/lib/api';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import RequestsTable from '@/components/tables/RequestsTable';

export default function RequestsPage() {
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
      const res = await apiClient.getRequests({ q: search, page: currentPage, limit: itemsPerPage });
      const list = Array.isArray(res) ? res : (res.items ?? res.data ?? res.results ?? []);
      const total = (res.totalItems ?? res.total ?? list.length) || 0;
      const pages = (res.totalPages ?? Math.max(1, Math.ceil(total / itemsPerPage))) || 1;
      setItems(list);
      setTotalItems(total);
      setTotalPages(pages);
    } catch (e) {
      setError(e?.message || 'Failed to load requests');
    } finally {
      setIsLoading(false);
    }
  }, [search, currentPage]);

  useEffect(() => { load(); }, [load]);

  const visible = useMemo(() => {
    if (!search) return items;
    return items.filter(r => (r?.status || '').toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);

  async function onUpdateStatus(id, status) {
    // Component uses 'Pending'/'Approved'/'Rejected' (capitalized)
    await apiClient.updateRequest(id, { status });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Adoption Requests</h1>

      <div className="card">
        <div className="card-body space-y-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Filter by status (Pending/Approved/Rejected)…" />
          {error && <div className="text-red-600">{error}</div>}
          {isLoading ? <div>Loading…</div> : (
            <RequestsTable
              requests={visible}
              onView={(id) => location.assign(`/admin/requests/${id}`)}
              onUpdateStatus={onUpdateStatus}
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
