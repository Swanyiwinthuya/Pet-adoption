'use client';

import { useState } from 'react';

export default function AdoptersTable({ searchTerm, filterStatus, filterExperience }) {
  const [adopters, setAdopters] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      status: 'approved',
      experience: 'experienced',
      housingType: 'house',
      petPreference: 'dog',
      applicationDate: '2024-01-15',
      lastContact: '2024-01-20',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      status: 'pending',
      experience: 'first-time',
      housingType: 'apartment',
      petPreference: 'cat',
      applicationDate: '2024-01-18',
      lastContact: '2024-01-18',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      status: 'active',
      experience: 'experienced',
      housingType: 'house',
      petPreference: 'any',
      applicationDate: '2024-01-10',
      lastContact: '2024-01-22',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 456-7890',
      status: 'rejected',
      experience: 'some',
      housingType: 'apartment',
      petPreference: 'small dog',
      applicationDate: '2024-01-05',
      lastContact: '2024-01-12',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 567-8901',
      status: 'approved',
      experience: 'experienced',
      housingType: 'house',
      petPreference: 'cat',
      applicationDate: '2024-01-08',
      lastContact: '2024-01-25',
    },
  ]);

  // Filter adopters based on search term and filters
  const filteredAdopters = adopters.filter(adopter => {
    const matchesSearch = !searchTerm || 
      adopter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adopter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adopter.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || adopter.status === filterStatus;
    const matchesExperience = filterExperience === 'all' || adopter.experience === filterExperience;
    
    return matchesSearch && matchesStatus && matchesExperience;
  });

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getExperienceBadge = (experience) => {
    const badges = {
      'first-time': 'bg-purple-100 text-purple-800',
      'some': 'bg-indigo-100 text-indigo-800',
      'experienced': 'bg-emerald-100 text-emerald-800',
    };
    return badges[experience] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusChange = (adopterId, newStatus) => {
    setAdopters(prev => prev.map(adopter => 
      adopter.id === adopterId ? { ...adopter, status: newStatus } : adopter
    ));
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Adopters ({filteredAdopters.length})</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage potential pet adopters and their applications
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adopter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Housing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pet Preference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdopters.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                  <div className="text-lg">🔍</div>
                  <p className="mt-2">No adopters found matching your criteria</p>
                </td>
              </tr>
            ) : (
              filteredAdopters.map((adopter) => (
                <tr key={adopter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-700 font-medium text-sm">
                            {adopter.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{adopter.name}</div>
                        <div className="text-sm text-gray-500">{adopter.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adopter.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(adopter.status)}`}>
                      {adopter.status.charAt(0).toUpperCase() + adopter.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExperienceBadge(adopter.experience)}`}>
                      {adopter.experience === 'first-time' ? 'First Time' : 
                       adopter.experience === 'some' ? 'Some Experience' : 'Experienced'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {adopter.housingType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {adopter.petPreference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(adopter.applicationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <select
                        value={adopter.status}
                        onChange={(e) => handleStatusChange(adopter.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button className="text-blue-600 hover:text-blue-900 text-xs font-medium">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 text-xs font-medium">
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {filteredAdopters.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredAdopters.length} of {adopters.length} adopters
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}