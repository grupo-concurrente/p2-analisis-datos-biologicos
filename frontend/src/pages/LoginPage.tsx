'use client'

import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginProps } from '@/lib/types'
import { authenticateUser, registerUser } from '@/lib/utils'
import { useState } from 'react'

export default function LoginPage({ authSession }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [name, setName] = useState('')
  const [loginMessage, setLogginMessage] = useState('')
  const [loginStatus, setLogginStatus] = useState(false)
  const [registerMessage, setRegisterMessage] = useState('')
  const [registerStatus, setRegisterStatus] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)

  const toggleRegisterLogin = () => setIsLoginForm((prevState) => !prevState)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { status, info } = await authenticateUser(email, password)

    setLogginStatus(status)
    setLogginMessage(' ')
    setTimeout(() => setLogginMessage(info), 50)
    if (status) {
      localStorage.setItem(
        'session_credentials',
        JSON.stringify({ email, password })
      )
      setTimeout(authSession, 500)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { status, info } = await registerUser(
      name,
      email,
      password,
      repeatedPassword
    )

    setRegisterStatus(status)
    setRegisterMessage(' ')
    setTimeout(() => setRegisterMessage(info), 50)
    if (status) {
      setTimeout(toggleRegisterLogin, 500)
      setName('')
      setEmail('')
      setPassword('')
      setRepeatedPassword('')
    }
  }

  return (
    <div className='select-none w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='hidden lg:block mt-auto pt-10 mb-auto ml-44'>
        <Logo />
      </div>
      <div className='flex items-center justify-center pb-2'>
        {isLoginForm ? (
          <div className='mx-auto grid w-[350px] gap-6'>
            <div className='grid gap-4 text-center'>
              <h1 className='text-3xl text-gray-700 font-bold text-fuchsia-950'>
                Login
              </h1>
              <p className='text-balance text-muted-foreground'>
                Introduzca sus credenciales a continuación para acceder
              </p>
            </div>
            <form className='grid gap-6' onSubmit={handleLogin}>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='admin@umbrellacorporation.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='**********'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginMessage && (
                <p
                  className={`text-balance ${
                    loginStatus ? 'text-green-500' : 'text-rose-500'
                  }`}
                >
                  {loginMessage}
                </p>
              )}
              <p className='text-balance'>
                ¿No tienes cuenta?{' '}
                <span
                  className='text-blue-600 cursor-pointer'
                  onClick={toggleRegisterLogin}
                >
                  Regístrate
                </span>
              </p>
              <Button
                type='submit'
                className='w-full bg-fuchsia-900 hover:bg-fuchsia-700'
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
        ) : (
          <div className='mx-auto grid w-[350px] gap-6'>
            <div className='grid gap-4 text-center'>
              <h1 className='text-3xl text-gray-700 font-bold text-fuchsia-950'>
                Registro
              </h1>
              <p className='text-balance text-muted-foreground'>
                Introduzca sus credenciales para crear una cuenta nueva
              </p>
            </div>
            <form className='grid gap-6' onSubmit={handleRegister}>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Nombre</Label>
                <Input
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='John Doe'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='johndoe@emailprovider.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='**********'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password-repeated'>
                    Confirmar contraseña
                  </Label>
                </div>
                <Input
                  id='password-repeated'
                  type='password'
                  placeholder='**********'
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  required
                />
              </div>
              {registerMessage && (
                <p
                  className={`text-balance ${
                    registerStatus ? 'text-green-500' : 'text-rose-500'
                  }`}
                >
                  {registerMessage}
                </p>
              )}
              <p className='text-balance'>
                ¿Ya tienes cuenta?{' '}
                <span
                  className='text-blue-600 cursor-pointer'
                  onClick={toggleRegisterLogin}
                >
                  Inicia sesión
                </span>
              </p>
              <Button
                type='submit'
                className='w-full bg-fuchsia-900 hover:bg-fuchsia-700'
              >
                Registrarse
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
