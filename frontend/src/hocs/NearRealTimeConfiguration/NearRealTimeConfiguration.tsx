import { Fase1_1Image } from '@/components/assets/Fase1_1Image'
import { Fase1_2Image } from '@/components/assets/Fase1_2Image'
import { Fase2_1Image } from '@/components/assets/Fase2_1Image'
import { Fase2_2Image } from '@/components/assets/Fase2_2Image'
import { PassiveThreadIcon } from '@/components/assets/PassiveThreadIcon'
import { PlayButtonIcon } from '@/components/assets/PlayButtonIcon'
import { WorkingThreadIcon } from '@/components/assets/WorkingThreadIcon'
import ThreadProgressBarChart from '@/components/charts/ThreadProgressBarChart'
import axios from 'axios'
import { useState, useEffect } from 'react'

enum NEAR_REAL_TIME_STAGES {
  PREPROCESSING_CONFIGURATION,
  PREPROCESSING,
  SAVING_CONFIGURATION,
  SAVING,
  FETCHING,
  FINISH,
}

function NearRealTimeConfiguration() {
  const [currentStage, setCurrentStage] = useState<NEAR_REAL_TIME_STAGES>(
    NEAR_REAL_TIME_STAGES.PREPROCESSING_CONFIGURATION
  )

  const [preprocessingSelectedThreads, setPreprocessingSelectedThreads] =
    useState([true, true, false, true, true, false, false, false, false])

  const [preprocessingThreadsProgress, setPreprocessingThreadsProgress] =
    useState<{ name: string; progress: number }[]>([])

  const [savingSelectedThreads, setSavingSelectedThreads] = useState([
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
  ])

  const [savingThreadsProgress, setSavingThreadsProgress] = useState<
    { name: string; progress: number }[]
  >([])

  // Función para alternar el estado de un hilo de procesamiento, asegurando que siempre haya al menos uno activo
  const toggleCurrentProcessingThreadStatus = (index: number) => {
    const activeThreads = preprocessingSelectedThreads.filter(Boolean).length

    // Si solo hay un hilo activo y el usuario intenta desactivarlo, no permitimos la acción
    if (activeThreads === 1 && preprocessingSelectedThreads[index]) {
      return
    }

    const updatedThreads = preprocessingSelectedThreads.map((thread, i) =>
      i === index ? !thread : thread
    )
    setPreprocessingSelectedThreads(updatedThreads)
  }

  const toggleCurrentSavingThreadStatus = (index: number) => {
    const activeThreads = savingSelectedThreads.filter(Boolean).length

    // Si solo hay un hilo activo y el usuario intenta desactivarlo, no permitimos la acción
    if (activeThreads === 1 && savingSelectedThreads[index]) {
      return
    }

    const updatedThreads = savingSelectedThreads.map((thread, i) =>
      i === index ? !thread : thread
    )
    setSavingSelectedThreads(updatedThreads)
  }

  const parseThreadProgressData = (progressData: Record<string, number>) => {
    return (
      Object.entries(progressData)
        .map(([key, value]) => {
          const chunkNumber = key.split('_')[1]
          return {
            name: chunkNumber,
            progress: value,
          }
        })
        // Ordenar por el número en el campo `name`
        .sort((a, b) => {
          return parseInt(a.name) - parseInt(b.name) // Comparar como números
        })
    )
  }

  const startPreprocessing = async () => {
    // Iniciar el preprocesado
    setCurrentStage(NEAR_REAL_TIME_STAGES.PREPROCESSING)
    let intervalId: NodeJS.Timeout | null = null
    setTimeout(() => {
      // Establecer un intervalo para obtener el progreso
      intervalId = setInterval(() => {
        axios
          .get('http://localhost:8080/public/processing-status')
          .then((response) => {
            const parsedProgress = parseThreadProgressData(response.data)
            setPreprocessingThreadsProgress(parsedProgress)

            // Verificar si todos los hilos han alcanzado el 100%
            if (parsedProgress.every((thread) => thread.progress === 100)) {
              intervalId && clearInterval(intervalId) // Limpiar el intervalo
              finishPreprocessing() // Finalizar el preprocesado
            }
          })
          .catch((error) => {
            console.error('Error al obtener el progreso:', error)
            intervalId && clearInterval(intervalId) // Limpiar el intervalo en caso de error
          })
      }, 200)
    }, 500)
    try {
      // Llamar al post para iniciar el procesamiento
      await axios.post('http://localhost:8080/public/process-data', null, {
        params: {
          numThreads: preprocessingSelectedThreads.filter(Boolean).length,
        },
      })
    } catch (error) {
      console.error('Error en el procesamiento:', error)
      intervalId && clearInterval(intervalId) // Limpiar el intervalo en caso de error
    }
  }

  const startSaving = async () => {
    // Iniciar el preprocesado
    setCurrentStage(NEAR_REAL_TIME_STAGES.SAVING)
    let intervalId: NodeJS.Timeout | null = null
    setTimeout(() => {
      // Establecer un intervalo para obtener el progreso
      intervalId = setInterval(() => {
        axios
          .get('http://localhost:8080/public/saving-status')
          .then((response) => {
            const parsedProgress = parseThreadProgressData(response.data)
            setSavingThreadsProgress(parsedProgress)

            // Verificar si todos los hilos han alcanzado el 100%
            if (parsedProgress.every((thread) => thread.progress === 100)) {
              intervalId && clearInterval(intervalId) // Limpiar el intervalo
              finishSaving() // Finalizar el preprocesado
            }
          })
          .catch((error) => {
            console.error('Error al obtener el progreso:', error)
            intervalId && clearInterval(intervalId) // Limpiar el intervalo en caso de error
          })
      }, 200)
    }, 500)
    try {
      // Llamar al post para iniciar el procesamiento
      await axios.post('http://localhost:8080/public/save-data', null, {
        params: {
          numThreads: savingSelectedThreads.filter(Boolean).length,
        },
      })
    } catch (error) {
      console.error('Error en el procesamiento:', error)
      intervalId && clearInterval(intervalId) // Limpiar el intervalo en caso de error
    }
  }

  const finishPreprocessing = () => {
    setCurrentStage(NEAR_REAL_TIME_STAGES.SAVING_CONFIGURATION)
  }

  const finishSaving = () => {
    setCurrentStage(NEAR_REAL_TIME_STAGES.FETCHING)
  }

  // Actualizar el progreso de los hilos activos cada vez que cambien los hilos seleccionados
  useEffect(() => {
    const activeThreadsProgress = preprocessingSelectedThreads
      .map((isActive, index) => {
        if (isActive) {
          return {
            name: `${index + 1}`, // Usamos el índice como el nombre del hilo
            progress: 0, // Progreso inicial en 0
          }
        }
        return null
      })
      .filter((thread) => thread !== null) // Eliminamos los valores inactivos (null)

    setPreprocessingThreadsProgress(
      activeThreadsProgress as {
        name: string
        progress: number
      }[]
    )
  }, [preprocessingSelectedThreads])

  return (
    <div className='w-full h-full flex justify-around items-center gap-12 pt-20 p-10'>
      <div className='w-1/2 h-full flex flex-col items-center gap-4'>
        <h1 className='text-3xl font-bold text-fuchsia-800 text-opacity-80'>
          FASE 1: PREPROCESADO
        </h1>
        <div className='w-full h-full border-dashed border-2 border-fuchsia-400 rounded-xl grid grid-cols-2 grid-rows-2'>
          <div className='flex justify-center items-center'>
            <Fase1_1Image />
          </div>
          <div
            className={`flex justify-end mr-8 items-center ${
              (currentStage ===
                NEAR_REAL_TIME_STAGES.PREPROCESSING_CONFIGURATION ||
                currentStage === NEAR_REAL_TIME_STAGES.PREPROCESSING) &&
              'opacity-30'
            }`}
          >
            <Fase1_2Image />
          </div>
          <div className='flex justify-center items-center row-start-2'>
            <div className='grid grid-cols-3 grid-rows-3 gap-14 mb-12 ml-4'>
              {preprocessingSelectedThreads.map((value, index) => (
                <div
                  key={index}
                  onClick={() =>
                    currentStage ===
                      NEAR_REAL_TIME_STAGES.PREPROCESSING_CONFIGURATION &&
                    toggleCurrentProcessingThreadStatus(index)
                  }
                >
                  {value ? <WorkingThreadIcon /> : <PassiveThreadIcon />}
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center items-center row-start-2 relative'>
            <div
              className={`w-full h-full ${
                currentStage ===
                  NEAR_REAL_TIME_STAGES.PREPROCESSING_CONFIGURATION &&
                'opacity-30'
              }`}
            >
              <ThreadProgressBarChart data={preprocessingThreadsProgress} />
            </div>
            {currentStage ===
              NEAR_REAL_TIME_STAGES.PREPROCESSING_CONFIGURATION && (
              <div
                className='absolute top-1/2 left-1/2 -translate-x-6 -translate-y-20'
                onClick={startPreprocessing}
              >
                <PlayButtonIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-1/2 h-full flex flex-col items-center gap-4 ${
          (currentStage === NEAR_REAL_TIME_STAGES.PREPROCESSING_CONFIGURATION ||
            currentStage === NEAR_REAL_TIME_STAGES.PREPROCESSING) &&
          'opacity-30'
        }`}
      >
        <h1 className='text-3xl font-bold text-fuchsia-800 text-opacity-80'>
          FASE 2: GUARDADO
        </h1>
        <div className='w-full h-full border-dashed border-2 border-fuchsia-400 rounded-xl grid grid-cols-2 grid-rows-2'>
          <div className='flex justify-center items-center'>
            <Fase2_1Image />
          </div>
          <div
            className={`flex justify-center ml-20 mr-8 items-center ${
              (currentStage === NEAR_REAL_TIME_STAGES.SAVING_CONFIGURATION ||
                currentStage === NEAR_REAL_TIME_STAGES.SAVING) &&
              'opacity-30'
            }`}
          >
            <Fase2_2Image />
          </div>
          <div className='flex justify-center items-center row-start-2'>
            <div className='grid grid-cols-3 grid-rows-3 gap-14 mb-12 ml-4'>
              {savingSelectedThreads.map((value, index) => (
                <div
                  key={index}
                  onClick={() =>
                    currentStage ===
                      NEAR_REAL_TIME_STAGES.SAVING_CONFIGURATION &&
                    toggleCurrentSavingThreadStatus(index)
                  }
                >
                  {value ? <WorkingThreadIcon /> : <PassiveThreadIcon />}
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center items-center row-start-2 relative'>
            <div
              className={`w-full h-full ${
                currentStage === NEAR_REAL_TIME_STAGES.SAVING_CONFIGURATION &&
                'opacity-30'
              }`}
            >
              <ThreadProgressBarChart data={preprocessingThreadsProgress} />
            </div>
            {currentStage === NEAR_REAL_TIME_STAGES.SAVING_CONFIGURATION && (
              <div
                className='absolute top-1/2 left-1/2 -translate-x-6 -translate-y-20'
                onClick={startSaving}
              >
                <PlayButtonIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearRealTimeConfiguration
