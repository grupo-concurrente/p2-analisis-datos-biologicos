'use client'

import { useState } from 'react'
import Logo from '@/components/Logo'
import AuthForm from '@/components/auth/AuthForm'
import FormMessage from '@/components/auth/FormMessage'
import FormHeader from '@/components/auth/FormHeader'
import { authenticateUser, registerUser } from '@/lib/utils'

interface LoginProps {
  authSession: () => void
}

export default function AuthPage({ authSession }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatedPassword: '',
    name: '',
  })

  const [messages, setMessages] = useState({
    loginMessage: '',
    registerMessage: '',
  })

  const [status, setStatus] = useState({
    loginStatus: false,
    registerStatus: false,
  })

  const [isLoginForm, setIsLoginForm] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const toggleRegisterLogin = () => {
    setIsLoginForm((prev) => !prev)
    setFormData({ email: '', password: '', repeatedPassword: '', name: '' })
  }

  const handleResponse = (
    type: 'login' | 'register',
    status: boolean,
    info: string
  ) => {
    setStatus((prev) => ({ ...prev, [`${type}Status`]: status }))
    setMessages((prev) => ({ ...prev, [`${type}Message`]: ' ' }))
    setTimeout(
      () => setMessages((prev) => ({ ...prev, [`${type}Message`]: info })),
      50
    )
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { status, info } = await authenticateUser(
      formData.email,
      formData.password
    )
    handleResponse('login', status, info)

    if (status) {
      localStorage.setItem(
        'session_credentials',
        JSON.stringify({ email: formData.email, password: formData.password })
      )
      setTimeout(authSession, 500)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { status, info } = await registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.repeatedPassword
    )
    handleResponse('register', status, info)

    if (status) setTimeout(toggleRegisterLogin, 500)
  }

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
        </div>
      </div>
    </div>
  )
}
