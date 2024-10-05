import { SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import Lottie from 'lottie-react'
import loading from '@/lotties/loading.json'
import { ProcessingStatus } from '@/lib/types'
import { useNavigate } from 'react-router-dom'

const Landing = ({
  setIsDataFetched,
}: {
  setIsDataFetched: (value: SetStateAction<boolean>) => void
}) => {
  const navigate = useNavigate()
  const [procThreads, setProcThreads] = useState(1)
  const [saveThreads, setSaveThreads] = useState(1)
  const [processingTime, setProcessingTime] = useState(NaN)
  const [savingTime, setSavingTime] = useState(NaN)
  const [status, setStatus] = useState<ProcessingStatus>(
    ProcessingStatus.SELECTION
  )

  useEffect(() => {
    if (status === ProcessingStatus.SAVED) {
      setIsDataFetched && setIsDataFetched(true)
    }
  }, [status])

  const handleProcessData = () => {
    setStatus(ProcessingStatus.PROCESSING)
    axios
      .post('http://localhost:8080/public/process-data', null, {
        params: { numThreads: procThreads },
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
        params: { numThreads: saveThreads },
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
            <h1 className='text-4xl'>Número de hilos para PREPROCESADO</h1>
            <div className='bg-fuchsia-600 opacity-75 w-48 h-28 rounded-2xl flex items-center justify-between text-6xl px-3 bg-opacity-70'>
              <button
                onClick={() => {
                  procThreads > 1 && setProcThreads(procThreads - 1)
                }}
              >
                {'<'}
              </button>
              <h1>{procThreads}</h1>
              <button
                onClick={() => {
                  procThreads < 12 && setProcThreads(procThreads + 1)
                }}
              >
                {'>'}
              </button>
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
              className='w-72 h-auto rotate-90 my-24'
            />
            <h1>PROCESANDO DATOS...</h1>
          </>
        )
      case ProcessingStatus.PROCESSED:
        return (
          <>
            <h1 className='text-5xl text-center'>
              Preprocesado: {processingTime} seg. | {procThreads} hilos
            </h1>
            <h1 className='text-4xl'>Número de hilos para GUARDADO</h1>
            <div className='bg-fuchsia-300 opacity-75 w-48 h-28 rounded-2xl flex items-center justify-between text-6xl p-1'>
              <button
                onClick={() => {
                  saveThreads > 1 && setSaveThreads(saveThreads - 1)
                }}
              >
                {'<'}
              </button>
              <h1>{saveThreads}</h1>
              <button
                onClick={() => {
                  saveThreads < 12 && setSaveThreads(saveThreads + 1)
                }}
              >
                {'>'}
              </button>
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
              Preprocesado: {processingTime} seg. | {procThreads} hilos
            </h1>
            <Lottie
              animationData={loading}
              loop={true}
              className='w-72 h-auto rotate-90 my-24'
            />
            <h1>GUARDANDO DATOS...</h1>
          </>
        )
      case ProcessingStatus.SAVED:
        return (
          <>
            <h1 className='text-5xl text-center'>
              Preprocesado: {processingTime} seg. | {procThreads} hilos
            </h1>
            <h1 className='text-5xl text-center'>
              Guardado en BD: {savingTime} seg. | {saveThreads} hilos
            </h1>
            <br />
            <h1 className='text-5xl text-center mb-8'>
              Total: {processingTime + savingTime} segundos
            </h1>
            <button
              className='text-2xl border-4 py-2 px-3 rounded-xl border-gray-900'
              onClick={() => navigate('/dashboard')}
            >
              IR AL DASHBOARD DE ANÁLISIS
            </button>
          </>
        )
    }
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
      {renderContent()}
    </div>
  )
}

export default Landing
