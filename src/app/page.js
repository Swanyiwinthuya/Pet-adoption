<<<<<<< HEAD
<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AdminRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Register the admin
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Admin registration failed');
        return;
      }

      // Auto-login after successful registration
      const loginResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (loginResult?.error) {
        setError('Registration successful but login failed. Please try logging in.');
      } else {
        router.push('/admin'); // Redirect to admin dashboard
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
=======
import Image from "next/image";
import Link from "next/link";
import MainSiteLayout from "../components/layout/MainSiteLayout";
>>>>>>> origin/arkar
=======
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
>>>>>>> origin/swanyi

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Admin Account</h1>
        <p className="text-gray-600 text-center mb-8">
          Register as an administrator for the Pet Adoption System
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Admin Account...' : 'Create Admin Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
=======
    <MainSiteLayout>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex items-center justify-between w-full">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <Link
              href="/admin/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Pet Adoption Management System
          </h1>
          
          <p className="text-lg text-gray-600 text-center sm:text-left max-w-2xl">
            Find your perfect pet companion and help pets find their forever homes. 
            Our comprehensive system makes pet adoption simple and efficient.
          </p>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              href="/pets"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              Browse Pets
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            >
              Learn More
            </Link>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <Link
            href="/contact"
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Contact icon"
              width={16}
              height={16}
            />
            Contact Us
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Admin icon"
              width={16}
              height={16}
            />
            Admin Access
          </Link>
        </footer>
      </div>
    </MainSiteLayout>
>>>>>>> origin/arkar
=======
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
>>>>>>> origin/swanyi
  );
}
