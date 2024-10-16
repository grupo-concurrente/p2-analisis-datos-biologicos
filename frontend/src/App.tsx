import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
//@ts-ignore
import { AnimatedBackground } from 'animated-backgrounds'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import { UseMode } from './lib/types'
import SelectModePage from './pages/SelectModePage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [useMode, setUseMode] = useState<UseMode>(UseMode.NONE)

  const logoutUser = () => {
    setIsAuthenticated(false)
  }

  const authSession = () => {
    setIsAuthenticated(true)
  }

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route
          path='/login'
          element={
            isAuthenticated ? (
              <Navigate to='/select-mode' replace />
            ) : (
              <>
                <AnimatedBackground
                  animationName='cosmicDust'
                  style={{ opacity: 0.09 }}
                />
                <AuthPage authSession={authSession} />
              </>
            )
          }
        />

        {/* Ruta protegida de Selección de Modo de Uso */}
        <Route
          path='/select-mode'
          element={
            isAuthenticated ? (
              <SelectModePage logoutUser={logoutUser} setMode={setUseMode} />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        {/* Ruta protegida de Real Time Configuration */}
        <Route
          path='/real-time-configuration'
          element={
            isAuthenticated ? (
              useMode === UseMode.REAL_TIME ? (
                //TODO: implement component
                <></>
              ) : (
                <Navigate to='/select-mode' replace />
              )
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        {/* Ruta protegida de Near Real Time Configuration */}
        <Route
          path='/near-real-time-configuration'
          element={
            isAuthenticated ? (
              useMode === UseMode.NEAR_REAL_TIME ? (
                //TODO: implement component
                <></>
              ) : (
                <Navigate to='/select-mode' replace />
              )
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        {/* Ruta protegida de Dashboard */}
        <Route
          path='/dashboard'
          element={
            isAuthenticated &&
            (isDataFetched || useMode === UseMode.MOCKING) ? (
              <DashboardPage logoutUser={logoutUser} />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        {/* Redirige cualquier ruta desconocida a /login */}
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </Router>
  )
}

export default App
