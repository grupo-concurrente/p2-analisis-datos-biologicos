export enum ProcessingStatus {
  SELECTION,
  PROCESSING,
  PROCESSED,
  SAVING,
  SAVED,
  ERROR
}

export interface AuthResponse {
  status: boolean
  info: string
}

// Tipo para representar un dato biologico
export interface BiologicalData {
  genusSpecies: number
  timePeriod: number
  location: number
  zone: number
  currentCountry: number
  habitat: number
  cranialCapacity: number
  height: number
  incisorSize: number
  jawShape: number
  torusSupraorbital: number
  prognathism: number
  foramenMagnumPosition: number
  canineSize: number
  caninesShape: number
  toothEnamel: number
  tecnoCulture: number
  tecnoType: number
  bipedalism: number
  armsLength: number
  feetStructure: number
  dietType: number
  sexualDimorphism: number
  hipStructure: number
  verticalFrontStructure: number
  anatomyFeatures: number
  migrated: number
  skeletonFeatures: number
}
