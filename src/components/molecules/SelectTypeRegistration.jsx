import ItemSelected from './ItemSelectes'
export default function SelectTypeRegistration({ setSelectedValue }) {

  return (
    <div className='flex items-center justify-center w-full'>
      <ItemSelected title={'مقدم خدمه'} action={() => setSelectedValue('providor')} />
      <ItemSelected title={' موظف'}  action={() => setSelectedValue('employee')}/>
    </div>
  )
}
