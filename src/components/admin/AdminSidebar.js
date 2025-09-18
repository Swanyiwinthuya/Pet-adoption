'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Pets', href: '/admin/pets', icon: '🐕' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Adoption Requests', href: '/admin/requests', icon: '📋' },
    { name: 'Adopters', href: '/admin/adopters', icon: '🏠' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  // Get current page title
  const getCurrentPageTitle = () => {
    const currentPage = navigation.find(item => item.href === pathname);
    return currentPage ? currentPage.name : 'Admin Panel';
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-0 z-30">
      <div className="p-6">
        {/* Page Title Section */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Pet Adoption</h1>
          <p className="text-sm text-gray-600 mt-1">Administration Panel</p>
          <div className="mt-3">
            <span className="text-lg font-medium text-blue-600">
              {getCurrentPageTitle()}
            </span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Pets:</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users:</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Requests:</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>

        {/* Demo Mode Info */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">🎯</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Demo Mode</p>
              <p className="text-xs text-gray-600">No authentication required</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-200">
            <Link
              href="/"
              className="text-xs text-green-600 hover:text-green-800 block mb-1"
            >
              ← Back to Site
            </Link>
            <div className="text-xs text-gray-500">
              Full admin access for demonstration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
