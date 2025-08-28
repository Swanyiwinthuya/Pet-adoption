import Card, { CardBody } from '../ui/Card';

export default function StatsCard({ title, value, icon, trend, trendValue, color = 'blue' }) {
  const colors = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100',
    purple: 'text-purple-600 bg-purple-100'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
              <div className="text-2xl">{icon}</div>
            </div>
          </div>
          
          <div className="ml-4 flex-1">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {title}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {value}
            </div>
            
            {trend && trendValue && (
              <div className={`text-sm ${trendColors[trend]} flex items-center mt-1`}>
                <span className="mr-1">
                  {trend === 'up' && '↗'}
                  {trend === 'down' && '↘'}
                  {trend === 'neutral' && '→'}
                </span>
                {trendValue}
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
