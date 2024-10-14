import './App.css'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { AnimatedBackground } from 'animated-backgrounds'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

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
              isDataFetched ? (
                <Navigate to='/dashboard' replace />
              ) : (
                <Navigate to='/landing' replace />
              )
            ) : (
              <>
                <AnimatedBackground
                  animationName='cosmicDust'
                  style={{ opacity: 0.09 }}
                />
                <LoginPage authSession={authSession} />
              </>
            )
          }
        />

        {/* Ruta protegida de Landing */}
        <Route
          path='/landing'
          element={
            isAuthenticated ? (
              <LandingPage
                logoutUser={logoutUser}
                setIsDataFetched={setIsDataFetched}
              />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        {/* Ruta protegida de Dashboard */}
        <Route
          path='/dashboard'
          element={
            isAuthenticated && isDataFetched ? (
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
