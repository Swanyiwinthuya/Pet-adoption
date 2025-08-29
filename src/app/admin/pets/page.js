'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import PetsTable from '../../../components/admin/AdminPetsTable';
import AddPetButton from '../../../components/admin/AddPetButton';

export default function AdminPetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnimal, setFilterAnimal] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Pets</h1>
          <p className="text-gray-600 mt-1">Add, edit, and manage all pets in the system</p>
        </div>
        <AddPetButton />
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Animal Type</label>
            <select
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Animals</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="bird">Birds</option>
              <option value="rabbit">Rabbits</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm('');
                setFilterAnimal('all');
                setFilterStatus('all');
              }}
              variant="secondary"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Pets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <PetsTable 
          searchTerm={searchTerm}
          filterAnimal={filterAnimal}
          filterStatus={filterStatus}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/pets/new">
            <Button>➕ Add New Pet</Button>
          </Link>
          <Link href="/admin/pets/import">
            <Button variant="secondary">📥 Import Pets</Button>
          </Link>
          <Link href="/admin/pets/export">
            <Button variant="secondary">📤 Export Data</Button>
          </Link>
          <Link href="/admin/pets/bulk-edit">
            <Button variant="secondary">✏️ Bulk Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
