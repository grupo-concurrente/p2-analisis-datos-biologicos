import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserRound } from 'lucide-react'

const Header = ({ handleLogout }: { handleLogout: () => void }) => (
  <header className='bg-white shadow-sm fixed w-full z-50'>
    <div className='max-w-7xl py-4 flex justify-between items-center'>
      <h1 className='text-2xl font-semibold text-gray-900'>
        &#129516; Umbrella Corporation
      </h1>
      <h1 className='text-2xl font-semibold text-gray-900'>
        Análisis de datos Biológicos
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <UserRound className='relative h-8 w-8 rounded-full' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={handleLogout}>Salir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
)

export default Header
