import Header from '@/components/Header'
import Landing from '@/hocs/Landing'
import { LandingPageProps } from '@/lib/types'
import { AnimatedBackground } from 'animated-backgrounds'
import {useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";

function LandingPage({ logoutUser, setIsDataFetched }: LandingPageProps) {
    const [loginMessage, setLoginMessage] = useState('');

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                console.log('Conectado a STOMP');
                client.subscribe('/topic/login', (message) => {
                    setLoginMessage(message.body);
                });
            },
            onStompError: (frame) => {
                console.error('Error en STOMP', frame);
            },
        });
        client.activate();
        return () => {
            client.deactivate();
        };
    }, []);

  return (
    <div className='select-none w-screen h-screen p-0 m-0'>
      <AnimatedBackground
        animationName='cosmicDust'
        style={{ opacity: 0.08 }}
      />
      <Header handleLogout={logoutUser} />
      <Landing setIsDataFetched={setIsDataFetched} />
        {loginMessage && <p>{loginMessage}</p>}
    </div>
  )
}

export default LandingPage
