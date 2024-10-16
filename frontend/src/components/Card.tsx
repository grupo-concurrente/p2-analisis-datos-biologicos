interface CardProps {
  title: string
  description: string
  caption: string
  handleSelection: () => void
}

function Card({ title, description, caption, handleSelection }: CardProps) {
  return (
    <div className='relative flex flex-col bg-white shadow-lg shadow-fuchsia-100 border border-fuchsia-100 rounded-xl w-full'>
      <div className='p-8 flex flex-col justify-center gap-5'>
        <h5 className='text-fuchsia-800 text-3xl font-semibold'>{title}</h5>
        <p className='text-slate-600 leading-normal font-light text-lg'>
          {description}
        </p>
        <button
          className='rounded-md mt-4 text-lg w-1/2 bg-fuchsia-800 bg-opacity-60 hover:bg-fuchsia-800 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg'
          type='button'
          onClick={handleSelection}
        >
          {caption}
          {' >>'}
        </button>
      </div>
    </div>
  )
}

export default Card
