'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pets', label: 'Find Pets' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Admin Dashboard' },
    { href: '/admin/pets', label: 'Manage Pets' },
    { href: '/admin/adopters', label: 'Manage Adopters' },
    { href: '/admin/requests', label: 'Manage Requests' },
  ];

  const userLinks = [
    { href: '/my-requests', label: 'My Requests' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
              🐾 Pet Adoption Center
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Admin & Demo Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Links */}
            <div className="flex items-center space-x-2">
              <Link
                href="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                🚀 Admin Panel
              </Link>
            </div>
            
            {/* Demo Info */}
            <div className="text-sm text-gray-500">
              Demo Mode - No Auth Required
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {/* Main Navigation */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-600 bg-blue-50 font-medium'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Admin Links */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Admin Panel
              </div>
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-600 bg-blue-50 font-medium'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Demo Info */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Demo Features
              </div>
              <div className="px-3 py-2 text-sm text-gray-600">
                🎯 Demo Mode Active - No Authentication Required
              </div>
              
              {/* User Links */}
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                User Features
              </div>
              {userLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-600 bg-blue-50 font-medium'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
