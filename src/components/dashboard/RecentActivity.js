import Card, { CardHeader, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';

export default function RecentActivity({ activities = [] }) {
  const getActivityIcon = (type) => {
    const icons = {
      'adoption_request': '📋',
      'pet_added': '🐕',
      'request_approved': '✅',
      'request_rejected': '❌',
      'adopter_registered': '👤'
    };
    return icons[type] || '📝';
  };

  const getActivityBadge = (type) => {
    const variants = {
      'adoption_request': 'info',
      'pet_added': 'success',
      'request_approved': 'success',
      'request_rejected': 'danger',
      'adopter_registered': 'info'
    };
    
    const labels = {
      'adoption_request': 'New Request',
      'pet_added': 'Pet Added',
      'request_approved': 'Approved',
      'request_rejected': 'Rejected',
      'adopter_registered': 'New Adopter'
    };

    return (
      <Badge variant={variants[type] || 'default'}>
        {labels[type] || 'Activity'}
      </Badge>
    );
  };

  const formatTime = (dateString) => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return activityDate.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </CardHeader>
      <CardBody>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, index) => (
                <li key={activity.id || index}>
                  <div className="relative pb-8">
                    {index !== activities.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                          <div className="mt-1">
                            {getActivityBadge(activity.type)}
                          </div>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {formatTime(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
