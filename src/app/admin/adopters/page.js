'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import AdoptersTable from '../../../components/admin/AdoptersTable';

export default function AdminAdoptersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Adopters</h1>
          <p className="text-gray-600 mt-1">View and manage all potential pet adopters</p>
        </div>
        <Link href="/admin/adopters/new">
          <Button>➕ Add New Adopter</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
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
              <option value="active">Active</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Experience Levels</option>
              <option value="first-time">First Time</option>
              <option value="some">Some Experience</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterExperience('all');
              }}
              variant="secondary"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Adopters Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <AdoptersTable 
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          filterExperience={filterExperience}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/adopters/new">
            <Button>➕ Add New Adopter</Button>
          </Link>
          <Link href="/admin/adopters/import">
            <Button variant="secondary">📥 Import Adopters</Button>
          </Link>
          <Link href="/admin/adopters/export">
            <Button variant="secondary">📤 Export Data</Button>
          </Link>
          <Link href="/admin/adopters/bulk-approve">
            <Button variant="secondary">✅ Bulk Approve</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
