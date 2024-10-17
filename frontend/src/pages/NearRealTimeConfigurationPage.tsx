import GenericPage from '@/hocs/GenericPage'
import NearRealTimeConfiguration from '@/hocs/NearRealTimeConfiguration'
import { BasePageProps, BiologicalData } from '@/lib/types'
import { SetStateAction } from 'react'

interface NearRealTimeConfigurationPageProps extends BasePageProps {
  setData: (value: SetStateAction<BiologicalData[]>) => void
}

const NearRealTimeConfigurationPage: React.FC<
  NearRealTimeConfigurationPageProps
> = ({ logoutUser, setData }) => {
  return (
    <GenericPage logoutUser={logoutUser}>
      <NearRealTimeConfiguration setData={setData} />
    </GenericPage>
  )
}

export default NearRealTimeConfigurationPage
