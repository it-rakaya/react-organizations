import { Typography } from "@mui/material";
import BaseInputField from "../../molecules/Formik/BaseInputField";

function AdditionalInfo() {
  return (
    <div className="grid items-start grid-cols-2">
      <div className="">
        <Typography className={`font-bold  `}>3. بيانات اضافية</Typography>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="عدد الموظفين بموجب بيانات التامينات الاجتماعية "
            placeholder="20"
            name="employee_number"
            type="custom"
            maxNum="3"
            required
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="عدد الطهاة على راس العمل في المنشاة "
            placeholder="4"
            name="chefs_number"
            type="custom"
            maxNum="3"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full">
          <BaseInputField
            label=" مساحة المطبخ ( بالمتر المربع)"
            placeholder="500"
            name="kitchen_space"
            type="custom"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
