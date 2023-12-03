/* eslint-disable react/prop-types */

export default function ItemSelected({ title , action }) {
  return (
    <div className='bg-[#f7f7f9] p-10 rounded-3xl w-full text-center m-3 cursor-pointer' onClick={action}>
      <div className='font-bold'> {title}</div>
    </div>
  )
}
