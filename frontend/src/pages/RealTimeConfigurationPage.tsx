import GenericPage from '@/hocs/GenericPage'
import RealTimeConfiguration from '@/hocs/RealTimeConfiguration'
import { BasePageProps } from '@/lib/types'

interface RealTimeConfigurationPageProps extends BasePageProps {}

const RealTimeConfigurationPage: React.FC<RealTimeConfigurationPageProps> = ({
  logoutUser,
}) => {
  return (
    <GenericPage logoutUser={logoutUser}>
      <RealTimeConfiguration />
    </GenericPage>
  )
}

export default RealTimeConfigurationPage
