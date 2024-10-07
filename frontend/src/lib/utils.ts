import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AuthResponse, BiologicalData } from "./types"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para obtener los datos de sensores y lecturas
export const fetchData = async (): Promise<{
  biologicalData: BiologicalData[]
}> => {
  try {
    // Obtener las credenciales cifradas del localStorage
    const storedCredentials = localStorage.getItem('session_credentials')

    if (!storedCredentials) {
      throw new Error('No se encontraron credenciales almacenadas')
    }

    // Parsear las credenciales almacenadas
    const { email, password } = JSON.parse(storedCredentials)

    // Codificar las credenciales en formato Base64 para Basic Auth
    const encodedCredentials = btoa(`${email}:${password}`)
    // Hacer las solicitudes con autenticación básica
    const biologicalDataResponse = await axios.get(
      'http://localhost:8080/api/v1/biological-data',
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    )

    return {
      biologicalData: biologicalDataResponse.data,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { biologicalData: [] }
  }
}

// Función para autenticar al usuario
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await axios.post('http://localhost:8080/public/login', {
      email,
      password,
    })

    if (response.status === 200) {
      return { status: true, info: 'Login exitoso' }
    } else if (response.status === 401) {
      return { status: false, info: 'Credenciales incorrectas' }
    } else {
      console.error('Error:', response.statusText)
      return { status: false, info: 'Error desconocido' }
    }
  } catch (error) {
    console.error('Error conectando con el servidor:', error)
    return { status: false, info: 'Error conectando con el servidor' }
  }
}
