'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ThreadProgressBarChartProps {
  data: { name: string; progress: number }[]
}

const ThreadProgressBarChart = ({ data }: ThreadProgressBarChartProps) => {
  return (
    <ResponsiveContainer width='100%' height='100%' className="relative">
      <BarChart
        width={500}
        height={300}
        //@ts-ignore
        data={data}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis domain={[0, 100]} />
        <Legend />
        <Bar dataKey='progress' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ThreadProgressBarChart
