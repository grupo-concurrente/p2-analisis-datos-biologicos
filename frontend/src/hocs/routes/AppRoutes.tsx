import AnimatedBackgroundWrapper from '@/components/background/AnimatedBackgroundWrapper'
import ProtectedModeRoute from '@/components/security/ProtectedModeRoute'
import ProtectedRoute from '@/components/security/ProtectedRoute'
import { UseMode } from '@/lib/types'
import AuthPage from '@/pages/AuthPage'
import DashboardPage from '@/pages/DashboardPage'
import SelectModePage from '@/pages/SelectModePage'
import { SetStateAction } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

interface AppRoutesProps {
  isAuthenticated: boolean
  useMode: UseMode
  isDataFetched: boolean
  authSession: () => void
  logoutUser: () => void
  setUseMode: (value: SetStateAction<UseMode>) => void
}

export default function AppRoutes({
  isAuthenticated,
  useMode,
  isDataFetched,
  authSession,
  logoutUser,
  setUseMode,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          isAuthenticated ? (
            <Navigate to='/select-mode' replace />
          ) : (
            <>
              <AnimatedBackgroundWrapper />
              <AuthPage authSession={authSession} />
            </>
          )
        }
      />
      <Route
        path='/select-mode'
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SelectModePage logoutUser={logoutUser} setMode={setUseMode} />
          </ProtectedRoute>
        }
      />
      <Route
        path='/real-time-configuration'
        element={
          <ProtectedModeRoute
            isAuthenticated={isAuthenticated}
            useMode={useMode}
            requiredMode={UseMode.REAL_TIME}
          >
            {/* Componente a implementar */}
            <></>
          </ProtectedModeRoute>
        }
      />
      <Route
        path='/near-real-time-configuration'
        element={
          <ProtectedModeRoute
            isAuthenticated={isAuthenticated}
            useMode={useMode}
            requiredMode={UseMode.NEAR_REAL_TIME}
          >
            {/* Componente a implementar */}
            <></>
          </ProtectedModeRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {isDataFetched || useMode === UseMode.MOCKING ? (
              <DashboardPage logoutUser={logoutUser} />
            ) : (
              <Navigate to='/login' replace />
            )}
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  )
}
