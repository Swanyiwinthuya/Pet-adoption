import Link from 'next/link';
import Card, { CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const featuredPets = [
  { id: '1', name: 'Bella', type: 'Dog', breed: 'Labrador Mix', age: '2 yrs', gender: 'Female', isAvailable: true, emoji: '🐶' },
  { id: '2', name: 'Milo', type: 'Cat', breed: 'Tabby', age: '1 yr', gender: 'Male', isAvailable: true, emoji: '🐱' },
  { id: '3', name: 'Rocky', type: 'Dog', breed: 'Beagle', age: '3 yrs', gender: 'Male', isAvailable: false, emoji: '🐕' },
  { id: '4', name: 'Luna', type: 'Cat', breed: 'Siamese', age: '8 mo', gender: 'Female', isAvailable: true, emoji: '🐈' },
  { id: '5', name: 'Coco', type: 'Dog', breed: 'Pomeranian', age: '4 yrs', gender: 'Female', isAvailable: true, emoji: '🦮' },
  { id: '6', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: '2 yrs', gender: 'Male', isAvailable: true, emoji: '🐾' },
];

export default function HomePage() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Find your new <span className="text-blue-600">best friend</span> today
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Browse loving dogs and cats looking for a forever home. Simple process, verified shelters, and friendly support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/pets">
                <Button className="w-full sm:w-auto" size="lg">Find Pets</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" className="w-full sm:w-auto" size="lg">Create Account</Button>
              </Link>
            </div>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-3 gap-6 text-center">
              <div className="rounded-lg bg-white ring-1 ring-gray-200 p-4">
                <dt className="text-sm text-gray-500">Pets adopted</dt>
                <dd className="text-2xl font-semibold text-gray-900">1,240+</dd>
              </div>
              <div className="rounded-lg bg-white ring-1 ring-gray-200 p-4">
                <dt className="text-sm text-gray-500">Active shelters</dt>
                <dd className="text-2xl font-semibold text-gray-900">35</dd>
              </div>
              <div className="rounded-lg bg-white ring-1 ring-gray-200 p-4">
                <dt className="text-sm text-gray-500">Happy adopters</dt>
                <dd className="text-2xl font-semibold text-gray-900">900+</dd>
              </div>
            </dl>
          </div>

          {/* Illustration */}
          <div className="hidden lg:block">
            <div className="aspect-[4/3] rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm grid place-items-center">
              <div className="text-[120px]">🐶🐱</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured pets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured pets</h2>
              <p className="text-gray-600 mt-2">A few cuties recently added by our partner shelters.</p>
            </div>
            <Link href="/pets" className="hidden sm:inline-block">
              <Button variant="ghost">View all →</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden">
                <CardHeader className="flex items-center gap-3">
                  <div className="h-12 w-12 grid place-items-center rounded-lg bg-blue-50 text-2xl">
                    <span aria-hidden>{pet.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                    <p className="text-gray-600 text-sm">{pet.type} • {pet.breed}</p>
                  </div>
                </CardHeader>

                <CardBody>
                  <dl className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-500">Age</dt>
                      <dd className="font-medium text-gray-900">{pet.age}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Gender</dt>
                      <dd className="font-medium text-gray-900">{pet.gender}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Status</dt>
                      <dd className={`font-medium ${pet.isAvailable ? 'text-green-700' : 'text-yellow-700'}`}>
                        {pet.isAvailable ? 'Available' : 'Adopted'}
                      </dd>
                    </div>
                  </dl>
                </CardBody>

                <CardFooter className="flex gap-3">
                  <Link href={`/adopt/${pet.id}`} className="flex-1">
                    <Button className="w-full" disabled={!pet.isAvailable}>
                      {pet.isAvailable ? 'Adopt me' : 'Not available'}
                    </Button>
                  </Link>
                  <Link href="/pets" className="flex-1">
                    <Button variant="secondary" className="w-full">Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/pets">
              <Button variant="ghost">View all pets →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">How adoption works</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardBody>
                <div className="text-4xl">🔎</div>
                <h3 className="mt-4 text-lg font-semibold">1. Browse pets</h3>
                <p className="mt-2 text-gray-600">Use filters to find a pet that matches your lifestyle.</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl">🤝</div>
                <h3 className="mt-4 text-lg font-semibold">2. Meet & apply</h3>
                <p className="mt-2 text-gray-600">Contact the shelter, meet the pet, and submit an application.</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl">🏡</div>
                <h3 className="mt-4 text-lg font-semibold">3. Bring them home</h3>
                <p className="mt-2 text-gray-600">Complete the process and welcome your new family member.</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ready to get started?</h2>
          <p className="mt-4 text-gray-600">Create a free account to save favorites and track your applications.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"><Button size="lg">Register</Button></Link>
            <Link href="/login"><Button variant="secondary" size="lg">Login</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
