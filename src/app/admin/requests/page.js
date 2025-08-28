import AdminRequestsTable from '../../../components/admin/AdminRequestsTable';

export const metadata = {
  title: 'Manage Requests - Admin Dashboard',
  description: 'Admin panel for managing adoption requests in the system',
};

export default function AdminRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Adoption Requests</h1>
          <p className="text-gray-600 mt-1">Review and process adoption applications</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Pending: 8 requests</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <AdminRequestsTable />
      </div>
    </div>
  );
}
