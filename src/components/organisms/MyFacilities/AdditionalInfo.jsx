import { Typography } from "@mui/material";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import { useState } from "react";
import ModalComp from "../../atoms/ModalComp";

function AdditionalInfo() {
  const images = [
    { path: "/registerMain.png" },
    { path: "/tax_certificate.png" },
  ];
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

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
            // showIcon
            // setShow={setShow}
            // setIndex={setIndex}
            // index={0}
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
            // showIcon
            // setShow={setShow}
            // setIndex={setIndex}
            // index={0}
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
      <ModalComp
        open={show}
        className="!max-w-[700px] m-auto    "
        classNameBox="shadow-none w-full "
        onClose={() => setShow(false)}
        hidden={true}
        Children={
          <div className="flex justify-center w-full">
            <img
              className="w-full h-[38rem] object-contain"
              src={images[index].path}
            />
          </div>
        }
      />
    </div>
  );
}

export default AdditionalInfo;
