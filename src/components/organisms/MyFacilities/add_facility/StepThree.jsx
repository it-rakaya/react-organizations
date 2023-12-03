import  { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import UploadImage from '../../../molecules/UploadImage';

export default function StepThree() {
  const [employees, setEmployees] = useState([
    { id: 1, name: '', title: '' },
  ]);
  const [canDeleteFirstEmployee, setCanDeleteFirstEmployee] = useState(false);

  const addEmployee = () => {
    const newEmployee = { id: employees.length + 1, name: '', title: '' };
    setEmployees([...employees, newEmployee]);
    if (employees.length >= 1) {
      setCanDeleteFirstEmployee(true);
    }
  };

  const removeEmployee = (id) => {
    if (id === 1 && !canDeleteFirstEmployee) {
      return;
    }
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <>
      {employees.map((employee, index) => (
        <div key={employee.id} className='relative grid grid-cols-1 gap-10 m-3 md:p-10 md:grid-cols-2'>
          <div className='flex flex-col gap-3'>
            <label>الموظف رقم {employee.id}</label>
            <TextField
              fullWidth
              placeholder='محمد احمد محمد'
              className='bg-white rounded-[10px]'
              value={employee.name}
              onChange={(e) => {
                const updatedEmployees = [...employees];
                updatedEmployees[index].name = e.target.value;
                setEmployees(updatedEmployees);
              }}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label> المسمى الوظيفي</label>
            <TextField
              fullWidth
              placeholder='10********'
              className='bg-white rounded-[10px]'
              value={employee.title}
              onChange={(e) => {
                const updatedEmployees = [...employees];
                updatedEmployees[index].title = e.target.value;
                setEmployees(updatedEmployees);
              }}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label> صورة بطاقة العمل</label>
            <UploadImage />
          </div>
          <div className='flex flex-col gap-3'>
            <label> صورة البطاقة الصحية</label>
            <UploadImage />
          </div>
          <div className='absolute left-0 bottom-10'>
            {/* يمكن حذف الموظف الأول إذا تم التأكيد على السماح بذلك */}
            {canDeleteFirstEmployee && (
              <button onClick={() => removeEmployee(employee.id)}>
              <GridDeleteIcon className='text-red-500'/>
              </button>
            )}
          </div>
        </div>
      ))}
      <div className='flex flex-col w-full gap-3 px-2 md:m-3 md:px-10 md:w-1/4'>
        <Button
          size='large'
          className='!text-white !rounded-md  !bg-[#A59B89]'
          onClick={addEmployee}
        >
          إضافة موظف جديد
        </Button>
      </div>
    </>
  );
}
