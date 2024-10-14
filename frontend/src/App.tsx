
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ```typescriptreact
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

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws')
        const stompClient = Stomp.over(socket)

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame)
            stompClient.subscribe('/topic/messages', (message) => {
                console.log(message.body)
            })
        })

        return () => {
            if (stompClient) {
                stompClient.disconnect()
            }
        }
    }, [])

    const sendMessage = (message: string) => {
        const socket = new SockJS('http://localhost:8080/ws')
        const stompClient = Stomp.over(socket)
        stompClient.send('/app/message', {}, JSON.stringify({ 'content': message }))
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
```