import { useEffect, useState } from 'react'
import { decodeData, fetchData } from '@/lib/utils'
import { BiologicalData } from '@/lib/types'
import Chart from '@/components/Chart'

export default function Dashboard() {
  const [data, setData] = useState<BiologicalData[]>([])

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { biologicalData } = await fetchData(true)
      setData(decodeData({ data: biologicalData }))
    }

    fetchDataAsync()
  }, [])

  return (
    <div className='w-full h-full grid grid-cols-8 grid-rows-6 gap-8 p-4 pt-16'>
      <div className='col-span-3 row-span-4 border-red-500 border-2 rounded-lg'>
        1
      </div>
      <div className='col-span-3 row-span-2 col-start-1 row-start-5 border-green-500 border-2 rounded-lg'>
        2
      </div>
      <div className='col-span-2 row-span-2 col-start-4 row-start-5 border-blue-500 border-2 rounded-lg'>
        3
      </div>
      <div className='col-span-2 row-span-2 col-start-4 row-start-1 border-pink-500 border-2 rounded-lg'>
        4
      </div>
      <div className='col-span-2 row-span-2 col-start-4 row-start-3 border-teal-500 border-2 rounded-lg'>
        5
      </div>
      <div className='col-span-4 row-span-4 col-start-6 row-start-1 border-purple-500 border-2 rounded-lg'>
        7
      </div>
      <div className='col-span-4 row-span-2 col-start-6 row-start-5 border-lime-500 border-2 rounded-lg'>
        8
      </div>
    </div>
  )
}
