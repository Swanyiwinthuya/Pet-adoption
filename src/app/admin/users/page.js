import AdminUsersTable from '../../../components/admin/AdminUsersTable';

export const metadata = {
  title: 'Manage Users - Admin Dashboard',
  description: 'Admin panel for managing user accounts in the adoption system',
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-1">View and manage user accounts and permissions</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total users: 156</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <AdminUsersTable />
      </div>
    </div>
  );
}
