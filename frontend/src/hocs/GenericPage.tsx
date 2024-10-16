import Header from '@/components/Header'
import { BasePageProps } from '@/lib/types'
import React, { ReactNode } from 'react'

interface GenericPageProps extends BasePageProps {
  children: ReactNode // Componente específico a renderizar
}

const GenericPage: React.FC<GenericPageProps> = ({ logoutUser, children }) => {
  return (
    <div className='select-none w-screen h-screen p-0 m-0'>
      <Header handleLogout={logoutUser} />
      {/* Renderizamos el componente específico como children */}
      {children}
    </div>
  )
}

export default GenericPage
