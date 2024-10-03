import './App.css'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Login from '@/pages/Login'
import Landing from '@/pages/Landing'
import Dashboard from './pages/Dashboard'

function App() {
  // Mock state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

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
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Ruta protegida de Landing */}
        <Route
          path='/landing'
          element={
            isAuthenticated ? (
              <Landing
                setIsAuthenticated={setIsAuthenticated}
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
              <Dashboard setIsAuthenticated={setIsAuthenticated} />
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
