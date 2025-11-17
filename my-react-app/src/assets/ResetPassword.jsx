import { useState } from 'react'

function ResetPassword({ setPage }) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleReset = (e) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    setIsSubmitted(true)
    setTimeout(() => {
      setPage('login')
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div className="card" style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}>
          <div className="text-6xl mb-4">✅</div>
          <h1 className="mb-4">Check Your Email</h1>
          <p className="text-text-light mb-2">
            A password reset link has been sent to
          </p>
          <p className="font-semibold text-text-dark mb-6">{email}</p>
          <p className="text-sm text-text-light mb-8">
            Please check your email and follow the instructions to reset your password. 
            Redirecting to login in 3 seconds...
          </p>
        </div>
      </div>
    )
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
          <h1 className="mb-2">Reset Password</h1>
          <p className="text-text-light">Enter your email and we'll send you a link to reset your password</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleReset}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
          >
            Send Reset Link
          </button>
        </form>

        <button
          onClick={() => setPage('login')}
          className="w-full py-3 bg-gray-200 text-text-dark font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default ResetPassword
