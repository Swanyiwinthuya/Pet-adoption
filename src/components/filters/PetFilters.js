'use client';

import { useState } from 'react';
import Button from '../ui/Button';

export default function PetFilters({ onFiltersChange, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    species: initialFilters.species || '',
    breed: initialFilters.breed || '',
    ageRange: initialFilters.ageRange || '',
    healthStatus: initialFilters.healthStatus || '',
    isAvailable: initialFilters.isAvailable || '',
    ...initialFilters
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      species: '',
      breed: '',
      ageRange: '',
      healthStatus: '',
      isAvailable: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Species Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species
          </label>
          <select
            value={filters.species}
            onChange={(e) => handleFilterChange('species', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range
          </label>
          <select
            value={filters.ageRange}
            onChange={(e) => handleFilterChange('ageRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Ages</option>
            <option value="0-1">Puppy/Kitten (0-1 years)</option>
            <option value="1-3">Young (1-3 years)</option>
            <option value="3-7">Adult (3-7 years)</option>
            <option value="7+">Senior (7+ years)</option>
          </select>
        </div>

        {/* Health Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Health Status
          </label>
          <select
            value={filters.healthStatus}
            onChange={(e) => handleFilterChange('healthStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Health Status</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Needs Medical Attention">Needs Medical Attention</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={filters.isAvailable}
            onChange={(e) => handleFilterChange('isAvailable', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Pets</option>
            <option value="true">Available</option>
            <option value="false">Adopted</option>
          </select>
        </div>
      </div>
    </div>
  );
}
