import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';

export default function QuickActions({ onAction }) {
  const actions = [
    {
      id: 'add_pet',
      label: 'Add New Pet',
      icon: '🐕',
      description: 'Register a new pet for adoption',
      href: '/admin/pets/new',
      color: 'blue'
    },
    {
      id: 'view_requests',
      label: 'Review Requests',
      icon: '📋',
      description: 'Check pending adoption requests',
      href: '/admin/requests',
      color: 'yellow'
    },
    {
      id: 'manage_adopters',
      label: 'Manage Adopters',
      icon: '👥',
      description: 'View and manage adopter profiles',
      href: '/admin/adopters',
      color: 'green'
    },
    {
      id: 'view_reports',
      label: 'View Reports',
      icon: '📊',
      description: 'Generate adoption reports',
      href: '#',
      color: 'purple'
    }
  ];

  const handleAction = (action) => {
    if (onAction) {
      onAction(action.id, action);
    } else if (action.href && action.href !== '#') {
      window.location.href = action.href;
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleAction(action)}
            >
              <div className="flex-shrink-0">
                <div className="text-2xl">{action.icon}</div>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {action.label}
                </h4>
                <p className="text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
