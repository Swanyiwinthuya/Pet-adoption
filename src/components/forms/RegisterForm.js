'use client';

import { useState } from 'react';

export default function RegisterForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',      // 'user' | 'admin'
    adminCode: '',     // required only if role === 'admin'
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit?.(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          className="mt-1 w-full rounded-md border p-2"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="mt-1 w-full rounded-md border p-2"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          className="mt-1 w-full rounded-md border p-2"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="+66999999999"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sign up as</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border p-2 bg-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin (requires code)</option>
        </select>
      </div>

      {form.role === 'admin' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Signup Code</label>
          <input
            className="mt-1 w-full rounded-md border p-2"
            name="adminCode"
            value={form.adminCode}
            onChange={handleChange}
            placeholder="Enter admin code"
            required={form.role === 'admin'}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}
