import { useState } from 'react'

function SignUp({ setPage, setMessage }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    
   
    if (!formData.firstName.trim()) {
      setError('First name is required')
      return
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required')
      return
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }
    if (!formData.password) {
      setError('Password is required')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setMessage(`🎉 Welcome ${formData.firstName}! Account created successfully.`)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setTimeout(() => setPage('login'), 2000)
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "1rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="text-center mb-8">
          <h1 className="mb-2">Create Account</h1>
          <p className="text-text-light">Join us today and get started</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="form-group mb-0">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full"
              required
            />
            <p className="text-xs text-text-light mt-1">At least 6 characters</p>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-text-light">
            Already have an account?{' '}
            <a
              onClick={() => setPage('login')}
              className="font-semibold hover:underline cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
