import AdminLoginForm from '../../../components/admin/AdminLoginForm';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Login - Pet Adoption System',
  description: 'Administrator login page',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">PA</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the pet adoption admin dashboard
          </p>
        </div>
        
        <AdminLoginForm />
        
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            ← Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}
