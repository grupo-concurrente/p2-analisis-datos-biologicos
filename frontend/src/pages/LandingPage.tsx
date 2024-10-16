import Header from '@/components/Header';
import Landing from '@/hocs/Landing';
import { LandingPageProps } from '@/lib/types';
import { AnimatedBackground } from 'animated-backgrounds';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

function LandingPage({ logoutUser, setIsDataFetched }: LandingPageProps) {
    const [loginMessage, setLoginMessage] = useState('');
    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (!stompClientRef.current) {
            const client = new Client({
                brokerURL: 'ws://localhost:5173/ws', // Asegúrate de que el puerto sea correcto
                reconnectDelay: 1000    , // Intentar reconexión cada 5 segundos
                debug: (str) => { console.log(str); },
                onConnect: () => {
                    console.log('Connected to STOMP');
                    client.subscribe('/topic/login', (message) => {
                        setLoginMessage(message.body);
                    });
                },
                onStompError: (frame) => {
                    console.error('STOMP error', frame);
                },
            });
            stompClientRef.current = client;
            client.activate();
        }

        return () => {
            stompClientRef.current?.deactivate();
            stompClientRef.current = null;
        };
    }, []);

    return (
        <div className='select-none w-screen h-screen p-0 m-0'>
            <AnimatedBackground animationName='cosmicDust' style={{ opacity: 0.08 }} />
            <Header handleLogout={logoutUser} />
            <Landing setIsDataFetched={setIsDataFetched} />
            {loginMessage && <p>{loginMessage}</p>}
        </div>
    );
}

export default LandingPage;
