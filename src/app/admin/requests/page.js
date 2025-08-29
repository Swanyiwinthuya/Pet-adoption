'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import AdminRequestsTable from '../../../components/admin/AdminRequestsTable';

export default function AdminRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Adoption Requests</h1>
          <p className="text-gray-600 mt-1">Review and manage all pet adoption requests</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total requests: 24</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by adopter name, pet name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterDate('all');
              }}
              variant="secondary"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <AdminRequestsTable 
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          filterDate={filterDate}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/requests/bulk-approve">
            <Button>✅ Bulk Approve</Button>
          </Link>
          <Link href="/admin/requests/export">
            <Button variant="secondary">📤 Export Requests</Button>
          </Link>
          <Link href="/admin/requests/analytics">
            <Button variant="secondary">📊 View Analytics</Button>
          </Link>
          <Link href="/admin/requests/settings">
            <Button variant="secondary">⚙️ Request Settings</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
