import './App.css'
import { useState, useEffect } from 'react'
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
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [biologicalData, setBiologicalData] = useState([])
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws')
        const client = Stomp.over(socket)

        const connectCallback = () => {
            console.log('Connected to WebSocket')
            client.subscribe('/topic/biological-data', (message) => {
                setBiologicalData(JSON.parse(message.body))
            })
        }

        const errorCallback = (error) => {
            console.error('WebSocket error:', error)
            setTimeout(() => {
                client.connect({}, connectCallback, errorCallback)
            }, 5000)
        }

        client.connect({}, connectCallback, errorCallback)

        setStompClient(client)

        return () => {
            if (client) {
                client.disconnect()
            }
        }
    }, [])

    const sendMessage = (message: string) => {
        if (stompClient && stompClient.connected) {
            stompClient.send('/app/message', {}, JSON.stringify({ 'content': message }))
        } else {
            console.error('no hay conexion a stomp')
        }
    }

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

                <Route
                    path='/dashboard'
                    element={
                        isAuthenticated && isDataFetched && biologicalData ? (
                            <DashboardPage logoutUser={logoutUser} biologicalData={biologicalData} />
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