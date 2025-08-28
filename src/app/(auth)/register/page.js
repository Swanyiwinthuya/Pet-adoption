'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (userData) => {
    setIsLoading(true);
    setError('');

    try {
      // Remove confirmPassword and address from the data sent to API
      const { confirmPassword, address, ...registrationData } = userData;
      
      // Register the user
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Registration failed');
        return;
      }

      // Auto-login after successful registration
      const loginResult = await signIn('credentials', {
        email: registrationData.email,
        password: registrationData.password,
        redirect: false,
      });

      if (loginResult?.error) {
        setError('Registration successful but login failed. Please try logging in.');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-8">
          Join us to find your perfect pet companion
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </div>
  );
}
