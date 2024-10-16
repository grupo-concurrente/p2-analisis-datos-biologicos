import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from '@/hocs/routes/AppRoutes'
import { UseMode } from './lib/types'

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
      <AppRoutes
        isAuthenticated={isAuthenticated}
        useMode={useMode}
        isDataFetched={isDataFetched}
        authSession={authSession}
        logoutUser={logoutUser}
        setUseMode={setUseMode}
      />
    </Router>
  )
}

export default App
