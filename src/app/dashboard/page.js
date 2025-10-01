'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Welcome{session?.user?.name ? `, ${session.user.name}` : ''}! 
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-5 border rounded-lg bg-white">
          <h2 className="font-semibold mb-2">Your Profile</h2>
          <p>Email: {session?.user?.email}</p>
          <p>Role: {session?.user?.role}</p>
        </div>

        <div className="p-5 border rounded-lg bg-white">
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><Link className="text-blue-600 hover:underline" href="/pets">Browse Pets</Link></li>
            <li><Link className="text-blue-600 hover:underline" href="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
