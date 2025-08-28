'use client';

import { useState } from 'react';
import AdminPetsTable from '../../../components/admin/AdminPetsTable';
import AddPetButton from '../../../components/admin/AddPetButton';
import PetForm from '../../../components/admin/PetForm';

export default function AdminPetsPage() {
  const [isPetFormOpen, setIsPetFormOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Max',
      animal: 'dog',
      breed: 'Golden Retriever',
      age: 2,
      medicalCondition: 'Healthy, fully vaccinated',
      status: 'available',
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Luna',
      animal: 'cat',
      breed: 'Domestic Shorthair',
      age: 1,
      medicalCondition: 'Healthy, spayed',
      status: 'available',
      createdAt: '2024-01-02',
    },
    {
      id: 3,
      name: 'Buddy',
      animal: 'dog',
      breed: 'Labrador',
      age: 3,
      medicalCondition: 'Needs regular checkups',
      status: 'adopted',
      createdAt: '2024-01-03',
    },
  ]);

  const handleAddPet = () => {
    setEditingPet(null);
    setIsPetFormOpen(true);
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setIsPetFormOpen(true);
  };

  const handlePetSubmit = (petData) => {
    if (editingPet) {
      // Update existing pet
      setPets(pets.map(pet => 
        pet.id === editingPet.id 
          ? { ...pet, ...petData, updatedAt: new Date().toISOString().split('T')[0] }
          : pet
      ));
    } else {
      // Add new pet
      const newPet = {
        id: Date.now(), // Simple ID generation for demo
        ...petData,
        status: 'available',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setPets([...pets, newPet]);
    }
  };

  const handleCloseForm = () => {
    setIsPetFormOpen(false);
    setEditingPet(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Pets</h1>
          <p className="text-gray-600 mt-1">Add, edit, and manage pets in the adoption system</p>
        </div>
        <AddPetButton onClick={handleAddPet} />
      </div>

      <div className="bg-white shadow rounded-lg">
        <AdminPetsTable 
          pets={pets} 
          onEditPet={handleEditPet}
          onDeletePet={(id) => {
            if (confirm('Are you sure you want to delete this pet?')) {
              setPets(pets.filter(pet => pet.id !== id));
            }
          }}
        />
      </div>

      {/* Pet Form Modal */}
      <PetForm
        isOpen={isPetFormOpen}
        onClose={handleCloseForm}
        onSubmit={handlePetSubmit}
        pet={editingPet}
        mode={editingPet ? 'edit' : 'create'}
      />
    </div>
  );
}
