'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const phoneOK = (v) => /^\+?[1-9]\d{0,15}$/.test(v || '');

export default function AdoptionRequestPage() {
  const { petId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [pet, setPet] = useState(null);
  const [loadingPet, setLoadingPet] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    userName: '',
    phoneNumber: '',
    pickupDate: '',
    message: '',
    responsibilityAccepted: false,
  });

  useEffect(() => {
    let ok = true;
    setLoadingPet(true);
    fetch(`/api/pets/${petId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => ok && setPet(d.pet))
      .catch(() => ok && setPet(null))
      .finally(() => ok && setLoadingPet(false));
    return () => { ok = false; };
  }, [petId]);

  useEffect(() => {
    if (session?.user) {
      setForm((f) => ({
        ...f,
        userName: session.user.name || '',
        phoneNumber: session.user.phone || '',
      }));
    }
  }, [session]);

  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // client-side checks to avoid server validation error
    if (!form.userName.trim()) return setError('Please enter your name.');
    if (!phoneOK(form.phoneNumber)) return setError('Phone must be like +66123456789 (no leading 0).');
    if (!form.pickupDate || form.pickupDate < minDate) return setError('Choose a pickup date in the future.');
    if (!form.responsibilityAccepted) return setError('Please accept responsibility to continue.');

    setSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pet: petId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to submit request.');
        return;
      }
      // success → your request shows in Admin Requests immediately
      router.push('/my-requests');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPet) return <div className="container mx-auto px-4 py-10 text-zinc-300">Loading…</div>;
  if (!pet) return <div className="container mx-auto px-4 py-10 text-zinc-300">Pet not found.</div>;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Adopt {pet.name}</h1>
      <p className="mt-1 text-zinc-400">{pet.animal} • {pet.breed} • {pet.age} yrs</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
        {error && <div className="rounded-lg border border-rose-600/40 bg-rose-600/10 p-3 text-rose-200">{error}</div>}

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Your Name</label>
          <input
            name="userName"
            value={form.userName}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Phone Number</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="+66123456789"
            required
          />
          <p className="mt-1 text-xs text-zinc-500">Use international format. Example: +66981234567</p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Pickup Date</label>
          <input
            type="date"
            name="pickupDate"
            min={minDate}
            value={form.pickupDate}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <p className="mt-1 text-xs text-zinc-500">Must be a future date.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Message</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={onChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about your home, experience, etc."
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            name="responsibilityAccepted"
            checked={form.responsibilityAccepted}
            onChange={onChange}
          />
          I accept responsibility for adopting this pet.
        </label>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-4 py-2 text-white shadow disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
