'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import PetsTable from '../../../components/admin/AdminPetsTable';
import PetEditModal from '../../../components/admin/PetEditModal';
import AddPetModal from '../../../components/admin/AddPetModal';

export default function AdminPetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnimal, setFilterAnimal] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPet, setEditingPet] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch pets from API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets');
        const data = await response.json();
        setPets(data.pets || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Handle edit pet
  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setIsEditModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingPet(null);
  };

  // Handle pet save (after edit)
  const handleSavePet = (updatedPet) => {
    setPets(pets.map(pet => 
      pet._id === updatedPet._id ? updatedPet : pet
    ));
    showNotification('Pet updated successfully!', 'success');
  };

  // Handle add new pet
  const handleAddPet = () => {
    setIsAddModalOpen(true);
  };

  // Handle close add modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handle save new pet
  const handleSaveNewPet = (newPet) => {
    setPets([newPet, ...pets]); // Add to beginning of list
    showNotification('Pet added successfully!', 'success');
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle delete pet
  const handleDeletePet = async (petId) => {
    if (!confirm('Are you sure you want to delete this pet? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove pet from local state
        setPets(pets.filter(pet => pet._id !== petId));
        showNotification('Pet deleted successfully!', 'success');
      } else {
        const error = await response.json();
        alert(`Error deleting pet: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('Error deleting pet. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' ? '✅' : '❌'}
            </span>
            {notification.message}
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Pets</h1>
          <p className="text-gray-600 mt-1">Add, edit, and manage all pets in the system</p>
        </div>
        <button
          onClick={handleAddPet}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Add New Pet
        </button>
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
        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading pets...</p>
          </div>
        ) : (
          <PetsTable 
            pets={pets}
            searchTerm={searchTerm}
            filterAnimal={filterAnimal}
            filterStatus={filterStatus}
            onEditPet={handleEditPet}
            onDeletePet={handleDeletePet}
          />
        )}
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

      {/* Edit Pet Modal */}
      <PetEditModal
        pet={editingPet}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePet}
      />

      {/* Add Pet Modal */}
      <AddPetModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewPet}
      />
    </div>
  );
}
