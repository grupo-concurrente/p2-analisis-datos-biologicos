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
      <div className='w-4/5 flex justify-center items-center gap-20'>
        <Card
          title='Real-Time'
          description='Configuración Real-Time basada en un Data Strem en directo con WebSockets que comunica Backend y Frontend.'
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
          description='Configuración Near Real-Time en la que se procesan los datos juntos y se transmiten en una única trama al Frontend.'
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
          description='Configuración que obtiene los datos de mock para visualizarlos sin necesidad de levantar el Backend ni la Base de Datos.'
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
