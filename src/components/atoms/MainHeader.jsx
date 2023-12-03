import { Button } from '@mui/material'

export default function MainHeader({ title, addTitle, action }) {
  return (
    <div className='flex justify-between m-5'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {addTitle && (
        <Button className='bg-[#787EFF] text-white' onClick={action}>
          {addTitle}{' '}
        </Button>
      )}
    </div>
  )
}
