import { UseMode } from '@/lib/types'
import { Navigate } from 'react-router-dom'

interface ProtectedModeRouteProps {
  isAuthenticated: boolean
  useMode: UseMode
  requiredMode: UseMode
  children: JSX.Element
}

export default function ProtectedModeRoute({
  isAuthenticated,
  useMode,
  requiredMode,
  children,
}: ProtectedModeRouteProps) {
  if (!isAuthenticated) return <Navigate to='/login' replace />
  return useMode === requiredMode ? (
    children
  ) : (
    <Navigate to='/select-mode' replace />
  )
}
