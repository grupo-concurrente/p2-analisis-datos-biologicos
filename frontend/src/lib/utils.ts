import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AuthResponse, BiologicalData, RawBiologicalData } from './types'
import axios from 'axios'
import { encodedLabels } from './labelEncoding'
import { mockData } from './mock'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
