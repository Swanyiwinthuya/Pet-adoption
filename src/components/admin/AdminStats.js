'use client';

export default function AdminStats() {
  const stats = [
    {
      name: 'Total Pets',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: '🐕',
      color: 'bg-blue-500',
    },
    {
      name: 'Active Users',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: '👥',
      color: 'bg-green-500',
    },
    {
      name: 'Pending Requests',
      value: '8',
      change: '-3',
      changeType: 'decrease',
      icon: '📋',
      color: 'bg-yellow-500',
    },
    {
      name: 'Adoptions This Month',
      value: '12',
      change: '+25%',
      changeType: 'increase',
      icon: '🏠',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.color}`}>
                  <span className="text-white text-lg">{stat.icon}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
