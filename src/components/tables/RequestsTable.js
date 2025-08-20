import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function RequestsTable({ requests = [], onView, onUpdateStatus }) {
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

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No adoption requests found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Pet Name</TableHead>
          <TableHead>Adopter</TableHead>
          <TableHead>Date Requested</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">
              #{request.id?.slice(-6) || 'N/A'}
            </TableCell>
            <TableCell>{request.petName || 'Unknown'}</TableCell>
            <TableCell>{request.adopterName || 'Unknown'}</TableCell>
            <TableCell>{formatDate(request.dateRequested)}</TableCell>
            <TableCell>{getStatusBadge(request.status)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(request.id)}
                >
                  View
                </Button>
                {request.status === 'Pending' && onUpdateStatus && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onUpdateStatus(request.id, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onUpdateStatus(request.id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
