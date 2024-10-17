import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import AuthForm from '@/components/login/AuthForm';
import FormMessage from '@/components/login/FormMessage';
import FormHeader from '@/components/login/FormHeader';
import { authenticateUser, registerUser } from '@/lib/auth';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

interface LoginProps {
  authSession: () => void;
}

export default function AuthPage({ authSession }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatedPassword: '',
    name: '',
  });

  const [messages, setMessages] = useState({
    loginMessage: '',
    registerMessage: '',
  });

  const [status, setStatus] = useState({
    loginStatus: false,
    registerStatus: false,
  });

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [socketMessage, setSocketMessage] = useState<string>('');
  const stompClientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);  // Añadido el estado isConnected

  useEffect(() => {
    const connectWebSocket = async () => {
      const socket = new SockJS('http://localhost:8080/websocket-endpoint');
      const stompClient = Stomp.over(socket);
      stompClientRef.current = stompClient;

      return new Promise<void>((resolve, reject) => {
        stompClient.connect(
            {},
            (frame) => {
              console.log('Conectado: ' + frame);
              setIsConnected(true); // Marcar como conectado
              resolve();

              // Suscribirse al canal /login para recibir el mensaje después del login
              stompClient.subscribe('/login', (message) => {
                console.log('Mensaje recibido: ' + message.body);
                setSocketMessage(message.body);
              });
              stompClient.send(
                  '/sendLoginMessage',  // La ruta en el backend que escucha mensajes del cliente
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
  }, [isConnected]);  // Añadir isConnected a las dependencias para asegurarse de desconectar correctamente

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleRegisterLogin = () => {
    setIsLoginForm((prev) => !prev);
    setFormData({ email: '', password: '', repeatedPassword: '', name: '' });
  };

  const handleResponse = (
      type: 'login' | 'register',
      status: boolean,
      info: string
  ) => {
    setStatus((prev) => ({ ...prev, [`${type}Status`]: status }));
    setMessages((prev) => ({ ...prev, [`${type}Message`]: ' ' }));
    setTimeout(
        () => setMessages((prev) => ({ ...prev, [`${type}Message`]: info })),
        50
    );
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, info } = await authenticateUser(
        formData.email,
        formData.password
    );
    handleResponse('login', status, info);

    if (status) {
      localStorage.setItem(
          'session_credentials',
          JSON.stringify({ email: formData.email, password: formData.password })
      );
      setTimeout(authSession, 500);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, info } = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.repeatedPassword
    );
    handleResponse('register', status, info);

    if (status) setTimeout(toggleRegisterLogin, 500);
  };

  return (
      <div className='select-none w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
        <div className='hidden lg:block mt-auto pt-10 mb-auto ml-44'>
          <Logo />
        </div>
        <div className='flex items-center justify-center pb-2'>
          <div className='mx-auto grid w-[350px] gap-6'>
            <FormHeader isLoginForm={isLoginForm} />
            <AuthForm
                isLoginForm={isLoginForm}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={isLoginForm ? handleLogin : handleRegister}
                toggleForm={toggleRegisterLogin}
            />
            <FormMessage
                message={
                  isLoginForm ? messages.loginMessage : messages.registerMessage
                }
                isSuccess={isLoginForm ? status.loginStatus : status.registerStatus}
            />
            {/* Mostrar el mensaje recibido del WebSocket */}
            <div id="mensaje" className="text-center text-blue-600">
              {socketMessage ? `Mensaje recibido: ${socketMessage}` : 'Esperando mensaje...'}
            </div>
          </div>
        </div>
      </div>
  );
}
