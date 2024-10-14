import { SetStateAction } from 'react'

export enum ProcessingStatus {
  SELECTION,
  PROCESSING,
  PROCESSED,
  SAVING,
  SAVED,
  ERROR,
}

export interface AuthResponse {
  status: boolean
  info: string
}

export interface LoginProps {
  authSession: () => void
}

export interface BasePageProps {
  logoutUser: () => void
}

export interface LandingPageProps extends BasePageProps {
  setIsDataFetched: (value: SetStateAction<boolean>) => void
}

export interface RawBiologicalData {
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

export interface BiologicalData {
  genusSpecies: string
  timePeriod: number
  location: string
  zone: string
  currentCountry: string
  habitat: string
  cranialCapacity: number
  height: number
  incisorSize: string
  jawShape: string
  torusSupraorbital: string
  prognathism: string
  foramenMagnumPosition: string
  canineSize: string
  caninesShape: string
  toothEnamel: string
  tecnoCulture: string
  tecnoType: string
  bipedalism: string
  armsLength: string
  feetStructure: string
  dietType: string
  sexualDimorphism: string
  hipStructure: string
  verticalFrontStructure: string
  anatomyFeatures: string
  migrated: string
  skeletonFeatures: string
}
