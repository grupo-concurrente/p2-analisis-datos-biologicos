import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserRound } from 'lucide-react'

const Header = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <header className='bg-white bg-opacity-50 shadow-sm fixed w-full z-50 absolute top-0 px-8'>
      <div className='w-full py-4 flex justify-between items-center'>
        <h1
          className='text-2xl cursor-pointer font-semibold text-gray-900'
          onClick={() => {
            handleLogout()
          }}
        >
          &#129516;
        </h1>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Análisis de Datos Biológicos
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserRound className='relative cursor-pointer h-8 w-8 rounded-full' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
              Salir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
