'use client';

import Link from 'next/link';

export default function AdminQuickActions() {
  const actions = [
    {
      name: 'Add New Pet',
      description: 'Add a new pet to the adoption system',
      href: '/admin/pets/new',
      icon: '🐕',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Review Requests',
      description: 'Review pending adoption requests',
      href: '/admin/requests',
      icon: '📋',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Manage Users',
      description: 'View and manage user accounts',
      href: '/admin/users',
      icon: '👥',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      name: 'System Settings',
      description: 'Configure system preferences',
      href: '/admin/settings',
      icon: '⚙️',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Common tasks and shortcuts for administrators
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white text-2xl">
                  {action.icon}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
