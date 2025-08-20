import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function PetsTable({ pets = [], onEdit, onDelete, onView }) {
  const getStatusBadge = (isAvailable) => {
    return isAvailable ? (
      <Badge variant="success">Available</Badge>
    ) : (
      <Badge variant="warning">Adopted</Badge>
    );
  };

  if (pets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No pets found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Species</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Health Status</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pets.map((pet) => (
          <TableRow key={pet.id}>
            <TableCell className="font-medium">{pet.name}</TableCell>
            <TableCell>{pet.species}</TableCell>
            <TableCell>{pet.breed}</TableCell>
            <TableCell>{pet.age} years</TableCell>
            <TableCell>{pet.healthStatus}</TableCell>
            <TableCell>{getStatusBadge(pet.isAvailable)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(pet.id)}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(pet.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(pet.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
