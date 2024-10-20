import axios from 'axios'
import { BiologicalData, RawBiologicalData } from './types'
import { encodedLabels } from './labelEncoding'

// Función para obtener los datos de sensores y lecturas
export const fetchData = async (): Promise<{
  biologicalData: RawBiologicalData[]
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

// Función para decodificar datos biológicos
export const decodeData = ({
  data,
}: {
  data: RawBiologicalData[]
}): BiologicalData[] => {
  return data
    .map((entry) => ({
      ...entry,
      genusSpecies: encodedLabels.genus_species[entry.genusSpecies],
      location: encodedLabels.location[entry.location],
      zone: encodedLabels.zone[entry.zone],
      currentCountry: encodedLabels.current_country[entry.currentCountry],
      habitat: encodedLabels.habitat[entry.habitat],
      incisorSize: encodedLabels.incisor_size[entry.incisorSize],
      jawShape: encodedLabels.jaw_shape[entry.jawShape],
      torusSupraorbital:
        encodedLabels.torus_supraorbital[entry.torusSupraorbital],
      prognathism: encodedLabels.prognathism[entry.prognathism],
      foramenMagnumPosition:
        encodedLabels.foramen_magnum_position[entry.foramenMagnumPosition],
      canineSize: encodedLabels.canine_size[entry.canineSize],
      caninesShape: encodedLabels.canines_shape[entry.caninesShape],
      toothEnamel: encodedLabels.tooth_enamel[entry.toothEnamel],
      tecnoCulture: encodedLabels.tecno_culture[entry.tecnoCulture],
      tecnoType: encodedLabels.tecno_type[entry.tecnoType],
      bipedalism: encodedLabels.bipedalism[entry.bipedalism],
      armsLength: encodedLabels.arms_length[entry.armsLength],
      feetStructure: encodedLabels.feet_structure[entry.feetStructure],
      dietType: encodedLabels.diet_type[entry.dietType],
      sexualDimorphism: encodedLabels.sexual_dimorphism[entry.sexualDimorphism],
      hipStructure: encodedLabels.hip_structure[entry.hipStructure],
      verticalFrontStructure:
        encodedLabels.vertical_front_structure[entry.verticalFrontStructure],
      anatomyFeatures: encodedLabels.anatomy_features[entry.anatomyFeatures],
      migrated: encodedLabels.migrated[entry.migrated],
      skeletonFeatures: encodedLabels.skeleton_features[entry.skeletonFeatures],
    }))
    .sort((a, b) => b.timePeriod - a.timePeriod) // Ordenar de mayor a menor según timePeriod
}

// Función para decodificar un único dato biológico
export const decodeSingleData = (entry: RawBiologicalData): BiologicalData => {
  return {
    ...entry,
    genusSpecies: encodedLabels.genus_species[entry.genusSpecies],
    location: encodedLabels.location[entry.location],
    zone: encodedLabels.zone[entry.zone],
    currentCountry: encodedLabels.current_country[entry.currentCountry],
    habitat: encodedLabels.habitat[entry.habitat],
    incisorSize: encodedLabels.incisor_size[entry.incisorSize],
    jawShape: encodedLabels.jaw_shape[entry.jawShape],
    torusSupraorbital:
      encodedLabels.torus_supraorbital[entry.torusSupraorbital],
    prognathism: encodedLabels.prognathism[entry.prognathism],
    foramenMagnumPosition:
      encodedLabels.foramen_magnum_position[entry.foramenMagnumPosition],
    canineSize: encodedLabels.canine_size[entry.canineSize],
    caninesShape: encodedLabels.canines_shape[entry.caninesShape],
    toothEnamel: encodedLabels.tooth_enamel[entry.toothEnamel],
    tecnoCulture: encodedLabels.tecno_culture[entry.tecnoCulture],
    tecnoType: encodedLabels.tecno_type[entry.tecnoType],
    bipedalism: encodedLabels.bipedalism[entry.bipedalism],
    armsLength: encodedLabels.arms_length[entry.armsLength],
    feetStructure: encodedLabels.feet_structure[entry.feetStructure],
    dietType: encodedLabels.diet_type[entry.dietType],
    sexualDimorphism: encodedLabels.sexual_dimorphism[entry.sexualDimorphism],
    hipStructure: encodedLabels.hip_structure[entry.hipStructure],
    verticalFrontStructure:
      encodedLabels.vertical_front_structure[entry.verticalFrontStructure],
    anatomyFeatures: encodedLabels.anatomy_features[entry.anatomyFeatures],
    migrated: encodedLabels.migrated[entry.migrated],
    skeletonFeatures: encodedLabels.skeleton_features[entry.skeletonFeatures],
  }
}

export const parseThreadProgressData = (
  progressData: Record<string, number>
): Array<{ name: string; progress: number }> => {
  // Utilizamos Object.entries para obtener un array de pares [key, value]
  return Object.entries(progressData).map(([key, value]) => {
    // Extraemos el número del chunk y creamos el objeto en el formato requerido
    const chunkNumber = key.split('_')[1] // Extraer el número del chunk
    return {
      name: chunkNumber,
      progress: value,
    }
  })
}
