import BaseInputField from '../../Formik/BaseInputField'
import DatePickerComp from '../../Formik/DatePickerComp'
import SelectCountry from '../../SelectCountry'

export default function AddFacility() {
  return (
    <div className=''>
      {/* <MainHeader title='اضافة منشاه' /> */}
      {/* <Formik onSubmit={values => console.log('values', values)} initialValues={{}}> */}
      {/* <Form> */}
      <div className='grid items-center grid-cols-2 gap-2 p-5'>
        <div className='flex items-center col-span-12 gap-2 '>
          <div className='w-1/2'>
            <BaseInputField
              label=' اسم التجاري للمنشأة بموجب السجل التجاري  '
              placeholder='محمد احمد محمد'
              name='name'
            />
          </div>
          <div className='w-1/2'>
            <BaseInputField label=' رقم السجل التجاري  ' placeholder='10********' name='registration_number' />
          </div>
        </div>
        <div className='flex items-center col-span-12 gap-2 '>
          <div className='w-1/2'>
            <DatePickerComp name='Version_date' label={'تاريخ إصدار السجل التجاري  بالميلادي'} />
          </div>

          <div className='w-1/2'>
            <DatePickerComp name='end_date' label={'تاريخ انتهاء السجل التجاري  بالميلادي'} />
          </div>
        </div>

        <div className='flex items-center col-span-12 gap-2 '>
          <div className='w-1/2 col-span-6'>
            <SelectCountry label={'مصدر السجل التجاري '} name='source_registration' />
          </div>
          <div className='w-1/2 col-span-6'>
            <BaseInputField
              label='قم رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة  '
              placeholder='10********'
              name='license'
            />
          </div>
        </div>

        <div className='flex items-end col-span-12 gap-2 '>
          <div className='w-1/2'>
            <DatePickerComp
              name='license_expired'
              label={'تاريخ انتهاء رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة بالميلادي'}
            />
          </div>

          <div className='w-1/2'>
            <BaseInputField label='عنوان المنشأة (الحي-الشارع)' placeholder='الملك فهد' name='address' />
          </div>
        </div>

        <div className='flex items-center col-span-12 gap-2 '>
          <div className='w-1/2'>
            <BaseInputField label='شهادة الرقم الضريبي' placeholder='***********34' name='tax_certificate' />
          </div>
          <div className='w-1/2'>
            <BaseInputField
              label='عدد الموظفين بموجب بيانات التامينات الاجتماعية '
              placeholder='20'
              name='employee_number'
            />
          </div>
        </div>

        <div className='flex items-center col-span-12 gap-2 '>
          <div className='w-1/2'>
            <BaseInputField label='عدد الطهاة على راس العمل في المنشاة ' placeholder='4' name='chefs_number' />
          </div>
          <div className='w-1/2'>
            <BaseInputField label=' مساحة المطبخ ( بالمتر المربع)' placeholder='500' name='kitchen_space' />
          </div>
        </div>

        {/* <div className='flex justify-end col-span-12'>
              <Button className='bg-[#787EFF] text-white' type='submit'>
                حفظ
              </Button>
            </div> */}
      </div>
      {/* </Form> */}
      {/* // </Formik> */}
    </div>
  )
}
