export default function RequestDetailsPage({ params }) {
  return (
    <div>
      <h1>Request Details</h1>
      <p>Request ID: {params.id}</p>
      {/* Request details and approval/rejection will be implemented here */}
    </div>
  );
}
