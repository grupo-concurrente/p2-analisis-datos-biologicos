'use client'

import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginProps } from '@/lib/types'
import { authenticateUser } from '@/lib/utils'
import { useState } from 'react'

export default function LoginPage({ autenticateUser }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLogginMessage] = useState('')
  const [loginStatus, setLogginStatus] = useState(false)

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
      setTimeout(autenticateUser, 700)
    }
  }
  return (
    <div className='w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='hidden lg:block mt-auto mb-auto ml-44'>
        <Logo />
      </div>
      <div className='flex items-center justify-center pb-2'>
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
                <Label htmlFor='password'>Password</Label>
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
            <Button type='submit' className='w-full bg-fuchsia-900'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
