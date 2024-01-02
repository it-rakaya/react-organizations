import { Typography } from "@mui/material";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";
import SelectDistrict from "../../molecules/SelectDistrict";
import { t } from "i18next";
import ModalComp from "../../atoms/ModalComp";
import { useState } from "react";

function NationalAddressData() {
  const images = [
    { path: "/nationalAddress.png" },
    { path: "/tax_certificate.png" },
  ];
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="grid items-start grid-cols-2">
      <div className="">
        <Typography className={`font-bold  `}>
          2. بيانات العنوان الوطني
        </Typography>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <SelectCitiesSaudi
            label={"اسم المدينة "}
            name="city_id"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
          />
        </div>
        <div className="w-full md:w-1/2">
          <SelectDistrict
            label={t("District name")}
            name="district_id"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label=" اسم الشارع"
            placeholder="شارع الهدى والنور"
            name="street_name"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="رقم المبنى"
            placeholder="3654"
            name="building_number"
            type="custom"
            maxNum="4"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="الرمز البريدي"
            placeholder="568750"
            name="postal_code"
            type="custom"
            maxNum="6"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="الرقم الفرعي"
            placeholder="698547"
            name="sub_number"
            type="custom"
            maxNum="6"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
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

export default NationalAddressData;
