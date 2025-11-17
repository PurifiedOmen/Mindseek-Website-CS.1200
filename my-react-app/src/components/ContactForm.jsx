import React, { useState } from 'react'

export default function ContactForm({ setMessage, setPage }) {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Request demo')
  const [messageText, setMessageText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) return setError('Please provide your email')

    // Simulate sending
    setMessage && setMessage('Thanks — your message was sent')
    setTimeout(() => setMessage(null), 3500)

    if (subject === 'Back to features') {
      // Try to navigate/scroll back to features section
      setPage && setPage('home')
      setTimeout(() => { try { window.location.hash = '#features' } catch {} }, 120)
    }

    // clear form
    setEmail('')
    setMessageText('')
    setSubject('Request demo')
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:480}} className="space-y-4">
      {error && <div className="alert alert-error">{error}</div>}

      <div>
        <label className="form-label">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" placeholder="you@example.com" required />
      </div>

      <div>
        <label className="form-label">What is this about?</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full">
          <option>Request demo</option>
          <option>Back to features</option>
        </select>
      </div>

      <div>
        <label className="form-label">Message</label>
        <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} className="w-full" rows={4} placeholder="Tell us what you'd like (optional)" />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded">Send message</button>
        <button type="button" onClick={() => setPage && setPage('signup')} className="py-2 px-4 border rounded">Sign up</button>
      </div>
    </form>
  )
}
