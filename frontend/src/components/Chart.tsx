'use state'

import { Area, AreaChart } from 'recharts'

const data = [
  {
    name: 3.61405951,
    cranialCapacity: 679.15233,
    height: 111.59004,
  },
  {
    name: 7.55196675,
    cranialCapacity: 258.04823,
    height: 91.23118,
  },
  {
    name: 6.04112375,
    cranialCapacity: 144.5141,
    height: 110.24323,
  },
  {
    name: 0.67944746,
    cranialCapacity: 1155.28124,
    height: 144.77589,
  },
  {
    name: 4.59560572,
    cranialCapacity: 403.28047,
    height: 111.40831,
  },
  {
    name: 4.38390951,
    cranialCapacity: 293.96021,
    height: 107.69018,
  },
  {
    name: 3.74941258,
    cranialCapacity: 264.79849,
    height: 123.76644,
  },
  {
    name: 3.78897752,
    cranialCapacity: 305.31366,
    height: 138.47796,
  },
  {
    name: 4.1809143,
    cranialCapacity: 460.06068,
    height: 117.35674,
  },
  {
    name: 4.05812009,
    cranialCapacity: 361.84781,
    height: 127.55925,
  },
]

function Chart() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <AreaChart width={800} height={600} data={data} >
        <Area dataKey='height'/>
      </AreaChart>
    </div>
  )
}

export default Chart
