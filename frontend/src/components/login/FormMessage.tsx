interface FormMessageProps {
  message: string
  isSuccess: boolean
}

export default function FormMessage({ message, isSuccess }: FormMessageProps) {
  if (!message) return null

  return (
    <p
      className={`text-balance ${
        isSuccess ? 'text-green-500' : 'text-rose-500'
      }`}
    >
      {message}
    </p>
  )
}
