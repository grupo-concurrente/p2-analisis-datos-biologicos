import SelectMode, { SelectModeProps } from '@/hocs/SelectMode'
import GenericPage from '@/hocs/GenericPage'
import { BasePageProps } from '@/lib/types'

interface SelectModePageProps extends BasePageProps, SelectModeProps {}

const SelectModePage: React.FC<SelectModePageProps> = ({
  logoutUser,
  setMode,
}) => {
  return (
    <GenericPage logoutUser={logoutUser}>
      <SelectMode setMode={setMode} />
    </GenericPage>
  )
}

export default SelectModePage
