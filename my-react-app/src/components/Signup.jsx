import React, { useState } from 'react'

export default function SignUp({ setPage, setMessage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirm) {
      setError('Please fill all fields')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    // Dummy signup: show message then go to login
    setMessage && setMessage('Account created — please login')
    setTimeout(() => setMessage(null), 3000)
    setPage && setPage('login')
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'70vh', padding:'1rem'}}>
      <div className="card" style={{width: '100%', maxWidth: 480}}>
        <h2 className="mb-4">Create Account</h2>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" required />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" required />
          </div>
          <div className="form-group mb-4">
            <label>Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full" required />
          </div>
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded mb-3">Create account</button>
        </form>

        <div className="text-center">
          <button onClick={() => setPage && setPage('login')} className="text-sm text-blue-600">Already have an account? Log in</button>
        </div>
      </div>
    </div>
  )
}
