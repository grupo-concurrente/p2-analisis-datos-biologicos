import { useEffect, useState } from 'react'
import axios from 'axios'
import Lottie from 'lottie-react'
import loading from '@/lotties/loading.json'
import { ProcessingStatus } from '@/lib/types'
import { LoginProps } from './Login'
import { useNavigate } from 'react-router-dom'

const Landing = ({ setIsAuthenticated, setIsDataFetched }: LoginProps) => {
  const navigate = useNavigate()
  const [numThreads, setNumThreads] = useState(4)
  const [processingTime, setProcessingTime] = useState(NaN)
  const [savingTime, setSavingTime] = useState(NaN)
  const [status, setStatus] = useState<ProcessingStatus>(
    ProcessingStatus.SELECTION
  )

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/login')
  }

  useEffect(() => {
    if (status === ProcessingStatus.SAVED) {
      setIsDataFetched && setIsDataFetched(true)
    }
  }, [status])

  const navigateToDashboard = () => {
    navigate('/dashboard')
  }

  const incrementThreadsNumber = () => {
    setNumThreads(numThreads + 1)
  }

  const decrementThreadsNumber = () => {
    setNumThreads(numThreads - 1)
  }

  const handleProcessData = () => {
    setStatus(ProcessingStatus.PROCESSING)
    axios
      .post('http://localhost:8080/public/process-data', null, {
        params: { numThreads: numThreads },
      })
      .then((response) => {
        setProcessingTime(parseFloat(response.data))
        setStatus(ProcessingStatus.PROCESSED)
      })
      .catch((error) => {
        console.error('Error en el procesamiento:', error)
        setStatus(ProcessingStatus.ERROR)
      })
  }

  const handleSaveData = () => {
    setStatus(ProcessingStatus.SAVING)
    axios
      .post('http://localhost:8080/public/save-data', null, {
        params: { numThreads: numThreads },
      })
      .then((response) => {
        setSavingTime(parseFloat(response.data))
        setStatus(ProcessingStatus.SAVED)
      })
      .catch((error) => {
        console.error('Error en el procesamiento:', error)
        setStatus(ProcessingStatus.ERROR)
      })
  }

  const renderContent = () => {
    switch (status) {
      case ProcessingStatus.SELECTION:
      default:
        return (
          <>
            <h1 className='text-4xl'>Número de hilos</h1>
            <div className='bg-red-300 opacity-75 w-48 h-28 rounded-2xl flex items-center justify-between text-6xl p-1'>
              <button onClick={decrementThreadsNumber}>{'<'}</button>
              <h1>{numThreads}</h1>
              <button onClick={incrementThreadsNumber}>{'>'}</button>
            </div>
            <button
              className='text-2xl border-4 py-2 px-3 rounded-xl border-gray-900'
              onClick={handleProcessData}
            >
              INICIAR
            </button>
          </>
        )
      case ProcessingStatus.PROCESSING:
        return (
          <>
            <Lottie
              animationData={loading}
              loop={true}
              className='w-72 h-auto rotate-90'
            />
            <h1>PROCESANDO DATOS...</h1>
          </>
        )
      case ProcessingStatus.PROCESSED:
        return (
          <>
            <h1 className='text-5xl text-center'>
              Datos procesados
              <br />
              en {processingTime} seg.
            </h1>
            <h1 className='text-4xl'>Número de hilos</h1>
            <div className='bg-red-300 opacity-75 w-48 h-28 rounded-2xl flex items-center justify-between text-6xl p-1'>
              <button onClick={decrementThreadsNumber}>{'<'}</button>
              <h1>{numThreads}</h1>
              <button onClick={incrementThreadsNumber}>{'>'}</button>
            </div>
            <button
              className='text-2xl border-4 py-2 px-3 rounded-xl border-gray-900'
              onClick={handleSaveData}
            >
              GUARDAR
            </button>
          </>
        )
      case ProcessingStatus.SAVING:
        return (
          <>
            <h1 className='text-5xl text-center'>
              Datos procesados
              <br />
              en {processingTime} seg.
            </h1>
            <Lottie
              animationData={loading}
              loop={true}
              className='w-72 h-auto rotate-90'
            />
            <h1>GUARDANDO DATOS...</h1>
          </>
        )
      case ProcessingStatus.SAVED:
        return (
          <>
            <h1 className='text-5xl text-center'>
              Datos procesados
              <br />
              en {processingTime} seg.
            </h1>
            <h1 className='text-5xl text-center'>
              Datos guardados en
              <br />
              en {savingTime} seg.
            </h1>
            <button
              className='text-2xl border-4 py-2 px-3 rounded-xl border-gray-900'
              onClick={navigateToDashboard}
            >
              IR AL DASHBOARD DE ANÁLISIS
            </button>
          </>
        )
    }
  }

  return (
    <div className='w-screen h-screen bg-gradient-to-b from-blue-200 to-blue-400 flex flex-col items-center justify-center gap-10'>
      {renderContent()}
    </div>
  )
}

export default Landing
