import Header from '@/components/Header'
import SelectMode, { SelectModeProps } from '@/hocs/SelectMode'
import { BasePageProps } from '@/lib/types'
//@ts-ignore
import { AnimatedBackground } from 'animated-backgrounds'

interface SelectModePageProps extends BasePageProps, SelectModeProps {}

function SelectModePage({ logoutUser, setMode }: SelectModePageProps) {
  return (
    <div className='select-none w-screen h-screen p-0 m-0'>
      <AnimatedBackground
        animationName='cosmicDust'
        style={{ opacity: 0.08 }}
      />
      <Header handleLogout={logoutUser} />
      <SelectMode setMode={setMode} />
    </div>
  )
}

export default SelectModePage
