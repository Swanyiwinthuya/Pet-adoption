import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function RequestCard({ request, onViewDetails, onUpdateStatus }) {
  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Approved': 'success',
      'Rejected': 'danger'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardBody>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Request #{request.id?.slice(-6) || 'N/A'}
            </h3>
            <p className="text-sm text-gray-600">
              Submitted on {formatDate(request.dateRequested)}
            </p>
          </div>
          {getStatusBadge(request.status)}
        </div>
        
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <p><span className="font-medium">Pet:</span> {request.petName || 'Unknown'}</p>
          <p><span className="font-medium">Adopter:</span> {request.adopterName || 'Unknown'}</p>
          <p><span className="font-medium">Email:</span> {request.adopterEmail || 'Unknown'}</p>
        </div>
        
        {request.reason && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Reason:</p>
            <p className="text-sm text-gray-600 line-clamp-3">{request.reason}</p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(request.id)}
            className="flex-1"
          >
            View Details
          </Button>
          
          {request.status === 'Pending' && onUpdateStatus && (
            <>
              <Button
                variant="success"
                size="sm"
                onClick={() => onUpdateStatus(request.id, 'Approved')}
                className="flex-1"
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onUpdateStatus(request.id, 'Rejected')}
                className="flex-1"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
