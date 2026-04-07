import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'

// Redirects unauthenticated users to login
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}