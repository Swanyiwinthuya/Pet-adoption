'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/pets', label: 'Pet Management', icon: '🐕' },
    { href: '/admin/adopters', label: 'Adopter Management', icon: '👥' },
    { href: '/admin/requests', label: 'Adoption Requests', icon: '📋' },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 flex-shrink-0">
      <div className="mb-8">
        <Link href="/admin" className="text-xl font-bold hover:text-blue-400 transition-colors">
          🏢 Admin Panel
        </Link>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link
          href="/profile"
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
            pathname === '/profile'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <span>👤</span>
          <span>Profile</span>
        </Link>
        
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mt-2"
        >
          <span>🏠</span>
          <span>Back to Site</span>
        </Link>
        
        <button className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors w-full text-left mt-2">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
