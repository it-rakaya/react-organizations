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
          3.{t("Additional information")}
        </Typography>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("employee number")}
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
            label={t("chefs number")}
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
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("kitchen space")}
            placeholder="500"
            name="kitchen_space"
            type="custom"
            images={images}
            required
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("account name")}
            placeholder="احمد محمد"
            name="account_name"
            images={images}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("IBAN number")}
            placeholder="27*********************"
            name="iban"
            type="IBAN"
            images={images}
            required
            maxNum="29"
          />
        </div>
        <div className="w-full md:w-1/2">
          <SelectBank name="bank_id" required={true} label={t("Chose bank")} />
        </div>
      </div>
      {/* <BaseInputMask/> */}
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
