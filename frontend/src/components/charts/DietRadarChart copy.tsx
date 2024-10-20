'use client'

import { BiologicalData } from '@/lib/types'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  ResponsiveContainer,
  Radar as RechartsRadar,
} from 'recharts'

function DietRadarChart
({ data }: { data: BiologicalData[] }) {
  // Agrupar y contar los datos por 'diet_type'
  const groupedData = Object.values(
    data.reduce(
      (acc: Record<string, { dietType: string; count: number }>, item) => {
        const { dietType } = item
        if (!acc[dietType]) {
          acc[dietType] = { dietType, count: 0 }
        }
        acc[dietType].count += 1
        return acc
      },
      {}
    )
  )

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={groupedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey='dietType' />
        <PolarRadiusAxis />
        <RechartsRadar
          name='Diet Count'
          dataKey='count'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default DietRadarChart
