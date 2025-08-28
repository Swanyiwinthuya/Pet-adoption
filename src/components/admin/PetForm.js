'use client';

import { useState } from 'react';

export default function PetForm({ isOpen, onClose, onSubmit, pet = null, mode = 'create' }) {
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    animal: pet?.animal || 'dog',
    breed: pet?.breed || '',
    age: pet?.age || '',
    medicalCondition: pet?.medicalCondition || ''
  });

  const [errors, setErrors] = useState({});

  const animalOptions = [
    { value: 'dog', label: '🐕 Dog' },
    { value: 'cat', label: '🐱 Cat' },
    { value: 'bird', label: '🐦 Bird' },
    { value: 'rabbit', label: '🐰 Rabbit' },
    { value: 'hamster', label: '🐹 Hamster' },
    { value: 'fish', label: '🐠 Fish' },
    { value: 'other', label: '🐾 Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Pet name is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Pet name must be 50 characters or less';
    }

    if (!formData.breed.trim()) {
      newErrors.breed = 'Breed is required';
    }

    if (!formData.age || formData.age < 0 || formData.age > 30) {
      newErrors.age = 'Age must be between 0 and 30 years';
    }

    if (!formData.medicalCondition.trim()) {
      newErrors.medicalCondition = 'Medical condition is required';
    } else if (formData.medicalCondition.length > 500) {
      newErrors.medicalCondition = 'Medical condition must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        age: parseInt(formData.age)
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      animal: 'dog',
      breed: '',
      age: '',
      medicalCondition: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Add New Pet' : 'Edit Pet'}
            </h2>
            <p className="text-gray-600 mt-1">
              {mode === 'create' ? 'Enter the details for the new pet' : 'Update the pet information'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Pet Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Pet Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter pet name (e.g., Max, Luna)"
              maxLength={50}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.name.length}/50 characters
            </p>
          </div>

          {/* Animal Type */}
          <div>
            <label htmlFor="animal" className="block text-sm font-medium text-gray-700 mb-2">
              Animal Type *
            </label>
            <select
              id="animal"
              name="animal"
              value={formData.animal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {animalOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Breed */}
          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">
              Breed *
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.breed ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter breed (e.g., Golden Retriever, Domestic Shorthair)"
            />
            {errors.breed && (
              <p className="mt-1 text-sm text-red-600">{errors.breed}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age (years) *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="30"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter age in years"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Age must be between 0 and 30 years
            </p>
          </div>

          {/* Medical Condition */}
          <div>
            <label htmlFor="medicalCondition" className="block text-sm font-medium text-gray-700 mb-2">
              Medical Condition *
            </label>
            <textarea
              id="medicalCondition"
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.medicalCondition ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe the pet's medical condition, vaccinations, special needs, etc."
              maxLength={500}
            />
            {errors.medicalCondition && (
              <p className="mt-1 text-sm text-red-600">{errors.medicalCondition}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.medicalCondition.length}/500 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === 'create' ? 'Add Pet' : 'Update Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
