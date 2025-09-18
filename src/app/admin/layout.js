import AdminSidebar from '../../components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard - Pet Adoption System',
  description: 'Admin panel for managing pets, users, and adoption requests',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  );
}
