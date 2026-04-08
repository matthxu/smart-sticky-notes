import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.SubmitEvent) => {
      e.preventDefault()
      setLoading(true)
      setError("")

      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
          setError(error.message)
          setLoading(false)
      } else {
          navigate("/")
      }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-sm border border-neutral-200">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-1">Create account</h1>
        <p className="text-sm text-neutral-500 mb-6">Start taking smarter notes</p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-neutral-500 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-neutral-900 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}