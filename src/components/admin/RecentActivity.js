'use client';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'pet_added',
      message: 'New pet "Luna" added to the system',
      user: 'Admin User',
      time: '2 minutes ago',
      icon: '🐕',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      type: 'request_approved',
      message: 'Adoption request for "Max" approved',
      user: 'Admin User',
      time: '15 minutes ago',
      icon: '✅',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 3,
      type: 'user_registered',
      message: 'New user "John Doe" registered',
      user: 'System',
      time: '1 hour ago',
      icon: '👤',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      id: 4,
      type: 'pet_updated',
      message: 'Pet "Buddy" information updated',
      user: 'Admin User',
      time: '2 hours ago',
      icon: '✏️',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 5,
      type: 'request_received',
      message: 'New adoption request received for "Fluffy"',
      user: 'System',
      time: '3 hours ago',
      icon: '📋',
      color: 'bg-orange-100 text-orange-800',
    },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      pet_added: '🐕',
      request_approved: '✅',
      user_registered: '👤',
      pet_updated: '✏️',
      request_received: '📋',
    };
    return icons[type] || '📝';
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <p className="mt-1 text-sm text-gray-500">
          Latest actions and system events
        </p>
      </div>
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.color}`}>
                        <span className="text-sm">{activity.icon}</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          by {activity.user}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
