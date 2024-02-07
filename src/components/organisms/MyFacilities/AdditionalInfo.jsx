import { Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import ModalComp from "../../atoms/ModalComp";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectBank from "../../molecules/Selects/SelectBank";

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
        <Typography className={`font-bold  !text-black dark:!text-white `}>
          3.{t("Additional Information")}
        </Typography>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("Employees Number")}
            placeholder="20"
            name="employee_number"
            type="custom"
            maxNum="3"
            required
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("Chefs Number")}
            placeholder="4"
            name="chefs_number"
            type="custom"
            maxNum="3"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full ">
          <BaseInputField
            label={t("Kitchen Space")}
            placeholder="500"
            name="kitchen_space"
            type="custom"
            images={images}
            required
          />
        </div>
       
      </div>
    
      {/* <BaseInputMask/> */}
      <ModalComp
        open={show}
        className="!max-w-[700px] m-auto    "
        classNameBox="!shadow-none w-full  !bg-transparent  "
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
