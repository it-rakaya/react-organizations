/* eslint-disable react/prop-types */
import { Button } from '@mui/material'

export default function MainHeader({ title, addTitle, action }) {
  return (
    <div className='flex justify-between m-5'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      {addTitle && (
        <Button className='!text-white !bg-contained' onClick={action}>
          {addTitle}
        </Button>
      )}
    </div>
  )
}
