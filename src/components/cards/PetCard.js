import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function PetCard({ pet, onViewDetails, onAdopt }) {
  const getStatusBadge = (isAvailable) => {
    return isAvailable ? (
      <Badge variant="success">Available</Badge>
    ) : (
      <Badge variant="warning">Adopted</Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={pet.image || '/placeholder-pet.jpg'}
          alt={pet.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
          {getStatusBadge(pet.isAvailable)}
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p><span className="font-medium">Breed:</span> {pet.breed}</p>
          <p><span className="font-medium">Age:</span> {pet.age} years old</p>
          <p><span className="font-medium">Species:</span> {pet.species}</p>
          <p><span className="font-medium">Health:</span> {pet.healthStatus}</p>
        </div>
        
        {pet.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {pet.description}
          </p>
        )}
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(pet.id)}
            className="flex-1"
          >
            View Details
          </Button>
          {pet.isAvailable && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAdopt(pet.id)}
              className="flex-1"
            >
              Adopt Me
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
