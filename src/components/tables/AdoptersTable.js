import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function AdoptersTable({ adopters = [], onView }) {
  if (adopters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No adopters found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Adoptions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adopters.map((adopter) => (
          <TableRow key={adopter.id}>
            <TableCell className="font-medium">{adopter.name}</TableCell>
            <TableCell>{adopter.email}</TableCell>
            <TableCell>{adopter.phone}</TableCell>
            <TableCell className="max-w-xs truncate">{adopter.address}</TableCell>
            <TableCell>
              <Badge variant="info">
                {adopter.adoptionHistory?.length || 0}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(adopter.id)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
