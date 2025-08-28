import AdminStats from '../../components/admin/AdminStats';
import AdminQuickActions from '../../components/admin/AdminQuickActions';
import RecentActivity from '../../components/admin/RecentActivity';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Administrator</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <AdminStats />

      {/* Quick Actions */}
      <AdminQuickActions />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
