'use client'

import { BiologicalData } from '@/lib/types'
import {
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from 'recharts'

function SimpleLineChart({
  data,
  label,
}: {
  data: BiologicalData[]
  label: string
}) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={300}
        //@ts-ignore
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 5,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey={label}
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SimpleLineChart
