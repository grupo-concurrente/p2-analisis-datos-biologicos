import GenericPage from '@/hocs/GenericPage'
import NearRealTimeConfiguration from '@/hocs/NearRealTimeConfiguration/NearRealTimeConfiguration'
import { BasePageProps } from '@/lib/types'

interface NearRealTimeConfigurationPageProps extends BasePageProps {}

const NearRealTimeConfigurationPage: React.FC<
  NearRealTimeConfigurationPageProps
> = ({ logoutUser }) => {
  return (
    <GenericPage logoutUser={logoutUser}>
      <NearRealTimeConfiguration />
    </GenericPage>
  )
}

export default NearRealTimeConfigurationPage
