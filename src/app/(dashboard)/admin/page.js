import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Pet Adoption Management System admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <span className="text-2xl">🐕</span>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">42</div>
              <div className="text-sm text-gray-500">Available Pets</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <span className="text-2xl">📋</span>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-sm text-gray-500">Pending Requests</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">128</div>
              <div className="text-sm text-gray-500">Registered Adopters</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-500">Successful Adoptions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/pets/new"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="text-4xl mb-4">➕</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
            Add New Pet
          </h3>
          <p className="text-gray-600 text-sm">
            Register a new pet for adoption
          </p>
        </Link>

        <Link
          href="/admin/requests"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
            Review Requests
          </h3>
          <p className="text-gray-600 text-sm">
            Process pending adoption requests
          </p>
        </Link>

        <Link
          href="/admin/pets"
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="text-4xl mb-4">🐾</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
            Manage Pets
          </h3>
          <p className="text-gray-600 text-sm">
            View and update pet information
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🐕</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New pet "Max" added to the system</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📋</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Adoption request approved for "Luna"</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👤</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New adopter "Sarah Johnson" registered</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
