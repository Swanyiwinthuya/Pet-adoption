export default function PetDetailsPage({ params }) {
  return (
    <div>
      <h1>Pet Details</h1>
      <p>Pet ID: {params.id}</p>
      {/* Pet details and edit options will be implemented here */}
    </div>
  );
}
