import Header from '@/components/Header'
import Dashboard from '@/hocs/Dashboard'
import { BasePageProps } from '@/lib/types'

function DashboardPage({ logoutUser }: BasePageProps) {
  return (
    <div className='w-screen h-screen p-0 m-0'>
      <Header handleLogout={logoutUser} />
      <Dashboard />
    </div>
  )
}

export default DashboardPage
