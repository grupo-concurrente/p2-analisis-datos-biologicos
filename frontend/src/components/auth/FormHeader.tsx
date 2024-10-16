interface FormHeaderProps {
  isLoginForm: boolean
}

export default function FormHeader({ isLoginForm }: FormHeaderProps) {
  return (
    <div className='grid gap-4 text-center'>
      <h1 className='text-3xl text-gray-700 font-bold text-fuchsia-950'>
        {isLoginForm ? 'Login' : 'Registro'}
      </h1>
      <p className='text-balance text-muted-foreground'>
        {isLoginForm
          ? 'Introduzca sus credenciales a continuación para acceder'
          : 'Introduzca sus credenciales para crear una cuenta nueva'}
      </p>
    </div>
  )
}
