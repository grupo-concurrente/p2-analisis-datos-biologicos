import { useEffect, useState } from 'react'
import { LoginProps } from './Login'

export default function Dashboard({ setIsAuthenticated }: LoginProps) {
  const [data, setData] = useState([])

  useEffect(() => {},[])

  return (
    <div className='w-screen h-screen grid grid-cols-9 grid-rows-6 gap-4 w-full h-full'>
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
