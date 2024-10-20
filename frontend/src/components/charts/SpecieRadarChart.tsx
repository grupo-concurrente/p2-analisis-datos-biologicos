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

function SpecieRadarChart({ data }: { data: BiologicalData[] }) {
  // Agrupar y contar los datos por 'diet_type'
  const groupedData = Object.values(
    data.reduce(
      (acc: Record<string, { genusSpecies: string; count: number }>, item) => {
        const { genusSpecies } = item
        if (!acc[genusSpecies]) {
          acc[genusSpecies] = { genusSpecies, count: 0 }
        }
        acc[genusSpecies].count += 1
        return acc
      },
      {}
    )
  )

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={groupedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey='genusSpecies' />
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

export default SpecieRadarChart
