import Header from '@/components/Header'
import Landing from '@/hocs/Landing'
//@ts-ignore
import { AnimatedBackground } from 'animated-backgrounds'

function LandingPage({ logoutUser, setIsDataFetched }: LandingPageProps) {
  return (
    <div className='select-none w-screen h-screen p-0 m-0'>
      <AnimatedBackground
        animationName='cosmicDust'
        style={{ opacity: 0.08 }}
      />
      <Header handleLogout={logoutUser} />
      <Landing setIsDataFetched={setIsDataFetched} />
    </div>
  )
}

export default LandingPage
