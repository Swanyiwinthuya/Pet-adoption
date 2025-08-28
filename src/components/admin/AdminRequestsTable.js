'use client';

import { useState } from 'react';

export default function AdminRequestsTable() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      userName: 'John Doe',
      phoneNumber: '+1234567890',
      petName: 'Max',
      petBreed: 'Golden Retriever',
      pickupDate: '2024-01-20',
      status: 'pending',
      createdAt: '2024-01-15',
      message: 'I have experience with dogs and a large yard.',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      phoneNumber: '+1234567891',
      petName: 'Luna',
      petBreed: 'Domestic Shorthair',
      pickupDate: '2024-01-22',
      status: 'approved',
      createdAt: '2024-01-14',
      message: 'I live in a quiet apartment perfect for cats.',
    },
    {
      id: 3,
      userName: 'Bob Johnson',
      phoneNumber: '+1234567892',
      petName: 'Buddy',
      petBreed: 'Labrador',
      pickupDate: '2024-01-25',
      status: 'rejected',
      createdAt: '2024-01-13',
      message: 'I have a small apartment and work long hours.',
    },
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">All Adoption Requests</h3>
        <p className="mt-1 text-sm text-gray-500">
          Review and process adoption applications
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-700 font-medium text-sm">
                          {request.userName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                      <div className="text-sm text-gray-500">{request.phoneNumber}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.petName}</div>
                  <div className="text-sm text-gray-500">{request.petBreed}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.pickupDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <button
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve (NextAuth)
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject (NextAuth)
                        </button>
                      </>
                    )}
                    <button
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View (NextAuth)
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete (NextAuth)
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
