import { useEffect, useState } from 'react'
import { fetchData } from '@/lib/utils'
import { BiologicalData } from '@/lib/types'

export default function Dashboard() {
  const [data, setData] = useState<BiologicalData[]>([])

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { biologicalData } = await fetchData()
      setData(biologicalData)
    }

    fetchDataAsync()
  }, [])

  useEffect(() => {
    console.log('New data detected: ', data)
  }, [data])

  return (
    <div className='w-full h-full grid grid-cols-9 grid-rows-6 gap-4 pt-16'>
      <div className='col-span-4 row-span-4 bg-red-500'>1</div>
      <div className='col-span-3 row-span-2 col-start-1 row-start-5 bg-green-500'>
        3
      </div>
      <div className='col-span-3 row-span-2 col-start-4 row-start-5 bg-blue-500'>
        4
      </div>
      <div className='col-span-2 row-span-2 col-start-5 row-start-1 bg-pink-500'>
        5
      </div>
      <div className='col-span-2 row-span-2 col-start-5 row-start-3 bg-teal-500'>
        6
      </div>
      <div className='col-span-3 row-span-2 col-start-7 row-start-1 bg-orange-500'>
        7
      </div>
      <div className='col-span-3 row-span-2 col-start-7 row-start-3 bg-purple-500'>
        8
      </div>
      <div className='col-span-3 row-span-2 col-start-7 row-start-5 bg-lime-500'>
        9
      </div>
    </div>
  )
}
