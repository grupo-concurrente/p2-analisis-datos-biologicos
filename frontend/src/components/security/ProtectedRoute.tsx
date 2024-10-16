import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: JSX.Element
  redirectPath?: string
}

export default function ProtectedRoute({
  isAuthenticated,
  children,
  redirectPath = '/login',
}: ProtectedRouteProps) {
  return isAuthenticated ? children : <Navigate to={redirectPath} replace />
}
