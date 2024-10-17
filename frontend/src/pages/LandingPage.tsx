import Header from '@/components/Header'
import Landing from '@/hocs/Landing'
import { AnimatedBackground } from 'animated-backgrounds'
import {useEffect, useRef, useState} from "react";
import Stomp, {Client} from "stompjs";
import SockJS from "sockjs-client";
function LandingPage({ logoutUser, setIsDataFetched }: LandingPageProps) {

const stompClientRef = useRef<Client | null>(null);
const [isConnected, setIsConnected] = useState(false);
const [socketMessage, setSocketMessage] = useState<string>('');
useEffect(() => {
    const connectWebSocket = async () => {
        const socket = new SockJS('http://localhost:8080/websocket');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient
        return new Promise<void>((resolve, reject) => {
            stompClient.connect(
                {},
                (frame) => {
                    console.log('Conectado: ' + frame);
                    setIsConnected(true);
                    resolve();
                    stompClient.subscribe('/landing', (message) => {
                        console.log('Mensaje recibido: ' + message.body);
                        setSocketMessage(message.body);
                    });
                    stompClient.send(
                        '/sendLandingMessage',
                        {},
                        JSON.stringify({ message: "Mensaje automático desde el cliente" })
                    );
                },
                (error) => {
                    console.error('Error de conexión: ' + error);
                    reject(error);
                }
            );
        });
    };

    // Conectar al WebSocket
    connectWebSocket().catch((error) =>
        console.error('Error al conectar al WebSocket', error)
    );

    // Limpiar la conexión WebSocket al desmontar el componente
    return () => {
        if (stompClientRef.current && isConnected) {  // Solo desconectar si está conectado
            stompClientRef.current.disconnect(() => {
                console.log('Desconectado del WebSocket');
            });
        }
    };
}, [isConnected]);

  return (
    <div className='select-none w-screen h-screen p-0 m-0'>
      <AnimatedBackground
        animationName='cosmicDust'
        style={{ opacity: 0.08 }}
      />
      <Header handleLogout={logoutUser} />
      <Landing setIsDataFetched={setIsDataFetched} />
        {/* Mostrar el mensaje recibido del WebSocket */}
        <div id="mensaje" className="text-center text-blue-600">
            {socketMessage ? `Mensaje recibido: ${socketMessage}` : 'Esperando mensaje...'}
        </div>
    </div>
  )
}

export default LandingPage
