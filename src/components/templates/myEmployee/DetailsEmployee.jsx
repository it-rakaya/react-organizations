/* eslint-disable react/prop-types */
import MainHeader from '../../atoms/MainHeader'

export default function DetailsEmployee({ data }) {
  console.log('🚀 ~ file: DetailsFacility.jsx:4 ~ DetailsFacility ~ data:', data)

  return (
    <div>
      <MainHeader title={` تفاصيل الموظف : ${data?.name} `} />

      <div className='grid grid-cols-2 p-4 gap-y-4'>
        <div className='flex gap-2'>
          <p className='font-bold text-contained'>الاسم:</p>
          <p>{data.name}</p>
        </div>
        <div className='flex gap-2'>
          <p className='font-bold text-contained'>المسمى الوظيفي:</p>
          <p>{data.position}</p>
        </div>
        {
          data?.attachmentUrl.map((item)=>
        <div className='flex flex-col gap-2' key={item?.id}>
          <p className='font-bold text-contained'> صورة بطاقة العمل:</p>
          <p><img className='w-[200px] h-[200px] rounded-xl' src={data?.work_card_photo_url} alt="" /></p>
        </div>
          )
        }
   
      </div>
    </div>
  )
}
