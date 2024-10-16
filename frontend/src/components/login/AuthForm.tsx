import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface AuthFormProps {
  isLoginForm: boolean
  formData: {
    name?: string
    email: string
    password: string
    repeatedPassword?: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  toggleForm: () => void
}

export default function AuthForm({
  isLoginForm,
  formData,
  handleInputChange,
  handleSubmit,
  toggleForm,
}: AuthFormProps) {
  return (
    <form className='grid gap-6' onSubmit={handleSubmit}>
      {!isLoginForm && (
        <div className='grid gap-2'>
          <Label htmlFor='name'>Nombre</Label>
          <Input
            id='name'
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder='John Doe'
            required
          />
        </div>
      )}
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
          placeholder={
            isLoginForm
              ? 'admin@umbrellacorporation.com'
              : 'johndoe@emailprovider.com'
          }
          required
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='password'>Contraseña</Label>
        <Input
          id='password'
          type='password'
          placeholder='*******'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      {!isLoginForm && (
        <div className='grid gap-2'>
          <Label htmlFor='repeatedPassword'>Confirmar contraseña</Label>
          <Input
            id='repeatedPassword'
            type='password'
            placeholder='*******'
            value={formData.repeatedPassword || ''}
            onChange={handleInputChange}
            required
          />
        </div>
      )}
      <p className='text-balance'>
        {isLoginForm ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
        <span className='text-fuchsia-800 cursor-pointer' onClick={toggleForm}>
          {isLoginForm ? 'Regístrate' : 'Inicia sesión'}
        </span>
      </p>
      <Button
        type='submit'
        className='w-full bg-fuchsia-900 hover:bg-fuchsia-800'
      >
        {isLoginForm ? 'Iniciar sesión' : 'Registrarse'}
      </Button>
    </form>
  )
}
