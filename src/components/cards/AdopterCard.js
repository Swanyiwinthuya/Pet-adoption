import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function AdopterCard({ adopter, onViewDetails }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardBody>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {adopter.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {adopter.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{adopter.email}</p>
            <p className="text-sm text-gray-600 truncate">{adopter.phone}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-700 line-clamp-2">
            <span className="font-medium">Address:</span> {adopter.address}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="info">
              {adopter.adoptionHistory?.length || 0} Adoptions
            </Badge>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(adopter.id)}
          >
            View Details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
