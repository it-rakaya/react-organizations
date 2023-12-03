import { TextField } from '@mui/material'
import DatePickerComp from '../../../molecules/Formik/DatePickerComp'
import SelectComp from '../../../molecules/Formik/SelectComp'


export default function StepOne() {
  return (
    <div className='grid grid-cols-1 gap-10 m-3 md:p-10 md:grid-cols-2 '>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> اسم التجاري للمنشأة بموجب السجل التجاري </label>
        <TextField fullWidth placeholder='محمد احمد محمد' className='bg-white rounded-[10px]' />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> رقم السجل التجاري </label>
        <TextField fullWidth placeholder='10********' className='bg-white rounded-[10px]' />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> تاريخ إصدار السجل التجاري </label>

        <DatePickerComp />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> تاريخ انتهاء السجل التجاري </label>

        <DatePickerComp />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> مصدر السجل التجاري </label>

        <SelectComp placeholder={''} />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label>رقم رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة</label>
        <TextField fullWidth placeholder='10********' className='bg-white rounded-[10px]' />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> تاريخ انتهاء رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة</label>

        <DatePickerComp />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label>عنوان المنشأة (الحي-الشارع)</label>
        <TextField fullWidth placeholder='10********' className='bg-white rounded-[10px]' />
      </div>

      <div className='flex flex-col col-span-1 gap-3'>
        <label> شهادة الرقم الضريبي </label>
        <TextField fullWidth placeholder='+966 5********' className='bg-white rounded-[10px]' />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> عدد الموظفين بموجب بيانات التامينات الاجتماعية </label>
        <TextField fullWidth placeholder='Example@example.com' className='bg-white rounded-[10px]' />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> عدد الطهاة على راس العمل في المنشاة </label>
        <TextField fullWidth placeholder='Example@example.com' className='bg-white rounded-[10px]' />
      </div>
      <div className='flex flex-col col-span-1 gap-3'>
        <label> مساحة المطبخ ( بالمتر المربع)</label>
        <TextField fullWidth placeholder='Example@example.com' className='bg-white rounded-[10px]' />
      </div>
    </div>
  )
}
