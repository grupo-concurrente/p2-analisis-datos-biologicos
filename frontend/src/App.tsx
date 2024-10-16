import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { BiologicalData, UseMode } from './lib/types'
import AppRoutes from './hocs/AppRoutes'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [data, setData] = useState<BiologicalData[]>([])
  const [useMode, setUseMode] = useState<UseMode>(UseMode.NONE)

  // Verifica si hay una sesión guardada en el localStorage
  useEffect(() => {
    const storedSession = localStorage.getItem('session_authenticated')
    if (storedSession === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const logoutUser = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('session_authenticated') // Eliminar sesión del localStorage
  }

  const authSession = () => {
    setIsAuthenticated(true)
    localStorage.setItem('session_authenticated', 'true') // Guardar sesión en localStorage
  }

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        useMode={useMode}
        data={data}
        setData={setData}
        authSession={authSession}
        logoutUser={logoutUser}
        setUseMode={setUseMode}
      />
    </Router>
  )
}

export default App
