import GenericPage from '@/hocs/GenericPage'
import RealTimeConfiguration from '@/hocs/RealTimeConfiguration'
import { BasePageProps } from '@/lib/types'

interface RealTimeConfigurationPageProps extends BasePageProps {
  triggerLiveFetching: ({ nThreads }: { nThreads: number }) => void
}

const RealTimeConfigurationPage: React.FC<RealTimeConfigurationPageProps> = ({
  logoutUser,
  triggerLiveFetching,
}) => {
  return (
    <GenericPage logoutUser={logoutUser}>
      <RealTimeConfiguration triggerLiveFetching={triggerLiveFetching} />
    </GenericPage>
  )
}

export default RealTimeConfigurationPage
