import AnimatedBackgroundWrapper from '@/components/background/AnimatedBackgroundWrapper'
import ProtectedModeRoute from '@/components/security/ProtectedModeRoute'
import ProtectedRoute from '@/components/security/ProtectedRoute'
import { BiologicalData, UseMode } from '@/lib/types'
import AuthPage from '@/pages/AuthPage'
import DashboardPage from '@/pages/DashboardPage'
import SelectModePage from '@/pages/SelectModePage'
import { SetStateAction, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NearRealTimeConfigurationPage from '@/pages/NearRealTimeConfigurationPage'
import RealTimeConfigurationPage from '@/pages/RealTimeConfigurationPage'
import axios from 'axios'
import { decodeData, fetchData } from '@/lib/dataService'

interface AppRoutesProps {
  isAuthenticated: boolean
  useMode: UseMode
  data: BiologicalData[]
  setData: (value: SetStateAction<BiologicalData[]>) => void
  authSession: () => void
  logoutUser: () => void
  setUseMode: (value: SetStateAction<UseMode>) => void
}

export default function AppRoutes({
  isAuthenticated,
  useMode,
  data,
  setData,
  authSession,
  logoutUser,
  setUseMode,
}: AppRoutesProps) {
  const [isLiveFething, setIsLiveFetching] = useState(false)
  const triggerLiveFetching = async ({ nThreads }: { nThreads: number }) => {
    setIsLiveFetching(true)
    let intervalId: NodeJS.Timeout | null = null
    setTimeout(() => {
      // Establecer un intervalo para obtener el progreso
      intervalId = setInterval(async () => {
        await fetchData().then((response) =>
          setData(decodeData({ data: response.biologicalData }))
        )
      }, 200)
    }, 900)
    try {
      // Llamar al post para iniciar el procesamiento
      await axios.post('http://localhost:8080/public/save-data', null, {
        params: {
          numThreads: nThreads,
        },
      })
      intervalId && clearInterval(intervalId) // Limpiar el intervalo
    } catch (error) {
      console.error('Error en el procesamiento:', error)
      intervalId && clearInterval(intervalId) // Limpiar el intervalo en caso de error
    }
  }
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
            <>
              <AnimatedBackgroundWrapper />
              <SelectModePage
                logoutUser={logoutUser}
                setMode={setUseMode}
                setData={setData}
              />
            </>
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
            <>
              <AnimatedBackgroundWrapper />
              <RealTimeConfigurationPage
                logoutUser={logoutUser}
                triggerLiveFetching={triggerLiveFetching}
              />
            </>
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
            <>
              <AnimatedBackgroundWrapper />
              <NearRealTimeConfigurationPage
                logoutUser={logoutUser}
                setData={setData}
              />
            </>
          </ProtectedModeRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {data.length > 0 || isLiveFething ? (
              <DashboardPage logoutUser={logoutUser} data={data} />
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
