function WrongPassword({ setPage }) {
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
        <div className="text-6xl mb-4">❌</div>
        <h1 className="mb-2">Oops!</h1>
        <p className="text-text-light mb-8">
          The password you entered is incorrect. Please try again or reset your password.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setPage('login')}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
          >
            Try Again
          </button>

          <button
            onClick={() => setPage('reset-password')}
            className="w-full py-3 bg-gray-200 text-text-dark font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default WrongPassword