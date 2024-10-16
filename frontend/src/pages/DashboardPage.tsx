import Dashboard, { DashboardProps } from '@/hocs/Dashboard'
import GenericPage from '@/hocs/GenericPage'
import { BasePageProps } from '@/lib/types'

interface DashboardPageProps extends BasePageProps, DashboardProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({ logoutUser, data }) => {
  return (
    <GenericPage logoutUser={logoutUser}>
      <Dashboard data={data} />
    </GenericPage>
  )
}

export default DashboardPage
