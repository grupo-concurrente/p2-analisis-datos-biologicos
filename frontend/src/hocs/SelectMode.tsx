import Card from '@/components/Card'
import { decodeData } from '@/lib/dataService'
import { mockData } from '@/lib/mock'
import { BiologicalData, UseMode } from '@/lib/types'
import { SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

export interface SelectModeProps {
  setMode: (value: SetStateAction<UseMode>) => void
  setData: (value: SetStateAction<BiologicalData[]>) => void
}

function SelectMode({ setMode, setData }: SelectModeProps) {
  const navigate = useNavigate()

  const updateMode = ({
    newMode,
    redirectTo,
  }: {
    newMode: UseMode
    redirectTo: string
  }) => {
    setMode(newMode)
    navigate(redirectTo)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-full px-40 flex justify-center items-center gap-20'>
        <Card
          title='Real-Time'
          description='Configuración basada un flujo de datos en vivo utilizando WebSockets que conecta el Backend con el Frontend.'
          caption='Empezar'
          handleSelection={() =>
            updateMode({
              newMode: UseMode.REAL_TIME,
              redirectTo: '/real-time-configuration',
            })
          }
        />
        <Card
          title='Near Real-Time'
          description='Configuración que procesa los datos concurrentemente en el Backend y los envía al Frontend en un solo paquete.'
          caption='Empezar'
          handleSelection={() =>
            updateMode({
              newMode: UseMode.NEAR_REAL_TIME,
              redirectTo: '/near-real-time-configuration',
            })
          }
        />
        <Card
          title='Mocking Data'
          description='Configuración que permite visualizar datos simulados sin necesidad de iniciar el Backend o la Base de Datos.'
          caption='Empezar'
          handleSelection={() => {
            setData(decodeData({ data: mockData }))
            updateMode({ newMode: UseMode.MOCKING, redirectTo: '/dashboard' })
          }}
        />
      </div>
    </div>
  )
}

export default SelectMode
