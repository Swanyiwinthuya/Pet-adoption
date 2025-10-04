// src/app/admin/layout.js
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  // Toggle this to true if you want a soft gradient instead of pure white
  const useGradient = false;

  return (
    <div className="relative">
      {/* Full-viewport background (behind everything) */}
      {useGradient ? (
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-sky-50 to-pink-50" />
      ) : (
        <div className="fixed inset-0 -z-10 bg-white" />
      )}

      {/* Content container */}
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        {/* Side-by-side: left = sidebar, right = main */}
        <div className="flex items-start gap-6 py-6">
          <AdminSidebar />
          <main className="min-h-[calc(100vh-96px)] flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
