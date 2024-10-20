import CountryRadarChart from '@/components/charts/CountryRadarChart'
import DietRadarChart from '@/components/charts/DietRadarChart copy'
import SimpleLineChart from '@/components/charts/SimpleLineChart'
import SpecieRadarChart from '@/components/charts/SpecieRadarChart'
import { BiologicalData } from '@/lib/types'
import { useEffect } from 'react'

export interface DashboardProps {
  data: BiologicalData[]
}

export default function Dashboard({ data }: DashboardProps) {
  useEffect(() => console.log(data), [])
  return (
    <div className='w-full h-full grid grid-cols-8 grid-rows-6 gap-4 pt-16 p-8'>
      <div className='col-span-4 row-span-4 border-red-500 border-2 rounded-xl border-xl'>
        <SpecieRadarChart data={data} />
      </div>
      <div className='col-span-3 row-span-2 row-start-5 border-2 rounded-xl border-green-500'>
        <SimpleLineChart data={data} label='height' />
      </div>
      <div className='col-span-3 row-span-2 col-start-4 row-start-5 border-2 rounded-xl border-blue-500'>
        <SimpleLineChart data={data} label='cranialCapacity' />
      </div>
      <div className='col-span-4 row-span-4 col-start-5 border-2 rounded-xl border-pink-500'>
        <DietRadarChart data={data} />
      </div>
      <div className='col-span-2 row-span-2 col-start-7 row-start-5 border-2 rounded-xl border-lime-500'>
        <CountryRadarChart data={data} />
      </div>
    </div>
  )
}
