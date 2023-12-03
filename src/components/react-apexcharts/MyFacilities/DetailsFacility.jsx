import React from 'react'
import MainHeader from '../../MainHeader'

export default function DetailsFacility({ data }) {
  console.log('🚀 ~ file: DetailsFacility.jsx:4 ~ DetailsFacility ~ data:', data)

  return (
    <div>
      <MainHeader title={` تفاصيل المنشأه : ${data?.name} `} />

      <div className='grid grid-cols-2 p-4 gap-y-4'>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'>الاسم:</p>
          <p>{data.name}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'>العنوان:</p>
          <p>{data.address}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'>رقم الطهاة:</p>
          <p>{data.chefs_number}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> تاريخ الإصدار:</p>
          <p>{data.Version_date}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> تاريخ الإصدار بالهجري :</p>
          <p>{data.Version_date_hj}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> رقم الموظف:</p>
          <p>{data.employee_number}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> تاريخ الانتهاء:</p>
          <p>{data.end_date}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> تاريخ الانتهاء بالهجري:</p>
          <p>{data.end_date_hj}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> مساحة المطبخ:</p>
          <p>{data.kitchen_space}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> الرخصه:</p>
          <p>{data.license}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> تاريخ انتهاء الرخصه:</p>
          <p>{data.license_expired}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> تاريخ انتهاء الرخصه بالهجري:</p>
          <p>{data.license_expired_hj}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> رقم التسجيل:</p>
          <p>{data.registration_number}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> مصدر التسجيل:</p>
          <p>{data.source_registration}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[#787EFF] font-bold'> شهادة الضرائب:</p>
          <p>{data.tax_certificate}</p>
        </div>
      </div>
    </div>
  )
}
