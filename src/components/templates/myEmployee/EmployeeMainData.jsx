import { t } from 'i18next'
import MainHeader from '../../atoms/MainHeader'
import BaseInputField from '../../molecules/Formik/BaseInputField'
import UploadImage from '../../molecules/UploadImage'

export default function EmployeeMainData() {
  return (
    <div className=''>
      <MainHeader title='اضافة موظف' />
      <div className='grid items-center grid-cols-2 gap-2 p-5'>
        <div className='flex items-center col-span-12 gap-2 '>
          <div className='w-1/2'>
            <BaseInputField label=' اسم الموظف ' placeholder='محمد احمد محمد' name='name' />
          </div>
          <div className='w-1/2'>
            <BaseInputField label=' المسمى الوظيفي ' placeholder={`${t("Programming")}`}name='position' />
          </div>
        </div>
        <div className='flex items-start col-span-12 gap-2 mt-5'>
          <div className='w-1/2 '>
            <label>صورة بطاقة العمل</label>
            <UploadImage name='work_card_photo' placeholder={t("please upload work card photo")} />
          </div>
          <div className='w-1/2'>
            <label> صورة البطاقة الصحية</label>
            <UploadImage name='health_photo' placeholder={t("please upload health photo")} />
          </div>
        </div>
      </div>
    </div>
  )
}
