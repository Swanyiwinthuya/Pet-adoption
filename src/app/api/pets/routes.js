const LIST = [
  { _id: 's1', name: 'Bella', animal: 'dog', breed: 'Labrador Mix', age: 2, medicalCondition: 'Healthy, vaccinated and dewormed.', createdAt: '2025-08-08T12:00:00Z', updatedAt: '2025-08-08T12:00:00Z' },
  { _id: 's2', name: 'Milo', animal: 'cat', breed: 'Thai Domestic', age: 1, medicalCondition: 'Mild skin sensitivity; special shampoo recommended.', createdAt: '2025-08-06T12:00:00Z', updatedAt: '2025-08-06T12:00:00Z' },
  { _id: 's3', name: 'Kiwi', animal: 'bird', breed: 'Cockatiel', age: 1.2, medicalCondition: 'Healthy.', createdAt: '2025-07-20T12:00:00Z', updatedAt: '2025-07-20T12:00:00Z' },
  { _id: 's4', name: 'Thumper', animal: 'rabbit', breed: 'Mini Rex', age: 2.4, medicalCondition: 'Healthy; neutered.', createdAt: '2025-08-03T12:00:00Z', updatedAt: '2025-08-03T12:00:00Z' },
  { _id: 's5', name: 'Bubbles', animal: 'fish', breed: 'Betta', age: 0.3, medicalCondition: 'Healthy.', createdAt: '2025-06-18T12:00:00Z', updatedAt: '2025-06-18T12:00:00Z' },
  { _id: 's6', name: 'Nibbles', animal: 'hamster', breed: 'Syrian', age: 0.8, medicalCondition: 'Healthy.', createdAt: '2025-08-11T12:00:00Z', updatedAt: '2025-08-11T12:00:00Z' },
]

export async function GET(){
  // In real API you can filter by query params; this is a simple stub
  return Response.json(LIST)
}(){
  // In real API you can filter by query params; this is a simple stub
  return Response.json(LIST)
}
