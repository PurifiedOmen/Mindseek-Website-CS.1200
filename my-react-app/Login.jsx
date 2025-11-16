import { useState } from 'react'

function Login({ setPage, setMessage }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const correctPassword = "hello123"

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    if (password === correctPassword) {
      setIsLoggedIn(true)
      setMessage(`Welcome back, ${email}! 🎉`)
    } else {
      setPage("wrong-password")
    }
  }

  if (isLoggedIn) {
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
          <h1 className="mb-4">Login Successfully!</h1>
          <p className="text-text-light mb-8">
            Welcome back, <strong>{email}</strong>!
          </p>
          <button
            onClick={() => {
              setIsLoggedIn(false)
              setEmail("")
              setPassword("")
              setPage("login")
            }}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
          >
            Logout
          </button>
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
          <h1 className="mb-2">Welcome Back</h1>
          <p className="text-text-light">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Sign In
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="text-center">
            <a
              onClick={() => setPage("reset-password")}
              className="text-sm hover:underline cursor-pointer"
            >
              Forgot your password?
            </a>
          </div>

          <div className="border-t border-gray-200"></div>

          <p className="text-center text-sm text-text-light">
            Don't have an account?{" "}
            <a
              onClick={() => setPage("signup")}
              className="font-semibold hover:underline cursor-pointer"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login