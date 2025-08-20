'use client';

import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AdoptionRequestForm({ petId, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    adopterId: '',
    petId: petId,
    reason: '',
    experience: '',
    livingSpace: '',
    otherPets: '',
    workSchedule: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why do you want to adopt this pet? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us why you want to adopt this pet and what you can offer..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous Pet Experience <span className="text-red-500">*</span>
        </label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          rows={3}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your experience with pets..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Living Space <span className="text-red-500">*</span>
          </label>
          <select
            name="livingSpace"
            value={formData.livingSpace}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Living Space</option>
            <option value="Apartment">Apartment</option>
            <option value="House with Yard">House with Yard</option>
            <option value="House without Yard">House without Yard</option>
            <option value="Farm/Rural">Farm/Rural</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Schedule <span className="text-red-500">*</span>
          </label>
          <select
            name="workSchedule"
            value={formData.workSchedule}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Work Schedule</option>
            <option value="Work from Home">Work from Home</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Retired">Retired</option>
            <option value="Student">Student</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Other Pets in Household
        </label>
        <textarea
          name="otherPets"
          value={formData.otherPets}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="List any other pets you currently have (optional)..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Adoption Request'}
        </Button>
      </div>
    </form>
  );
}
