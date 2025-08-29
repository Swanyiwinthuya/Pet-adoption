'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ type: 'loading', text: 'Sending…' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus({ type: 'success', text: 'Thanks! We will get back to you soon.' })
      setName(''); setEmail(''); setMessage('')
    } catch (err) {
      setStatus({ type: 'error', text: 'Could not send. Please try again later.' })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Contact us</h1>
        <p className="mt-3 text-gray-600">Questions about adoption or partnerships? Send a message and our team will respond shortly.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>📧 support@petadoption.gmail.com</li>
            <li>📞 +66 02 555 1234</li>
            <li>📍 Bangkok, Thailand</li>
            <li className="text-sm text-gray-500">Mon–Fri, 9:00–17:00 ICT</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={6} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <button disabled={status.type==='loading'} className="rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 disabled:opacity-60">{status.type==='loading' ? 'Sending…' : 'Send message'}</button>
            {status.type !== 'idle' && (
              <p className={`text-sm ${status.type==='success' ? 'text-green-700' : status.type==='error' ? 'text-red-700' : 'text-gray-600'}`}>{status.text}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
