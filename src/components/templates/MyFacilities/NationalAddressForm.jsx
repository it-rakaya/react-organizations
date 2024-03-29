import { Typography } from "@mui/material";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";
import SelectDistrict from "../../molecules/SelectDistrict";
import { t } from "i18next";
import ModalComp from "../../atoms/ModalComp";
import { useState } from "react";

function NationalAddressForm() {
  const images = [
    { path: "/nationalAddress.png" },
    { path: "/tax_certificate.png" },
  ];
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="grid items-start grid-cols-2">
      <div className="">
        <Typography className={`font-bold !text-black dark:!text-white `}>
          2. {t("National Address Information")}
        </Typography>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <SelectCitiesSaudi
            label={t("City")}
            name="city_id"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
            images={images}
          />
        </div>
        <div className="w-full md:w-1/2">
          <SelectDistrict
            label={t("District")}
            name="district_id"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
            images={images}

          />
        </div>
      </div>

      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("Street")}
            placeholder={t("King Fahad")}
            name="street_name"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
            images={images}

          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("Building Number")}
            placeholder="xxxx"
            name="building_number"
            type="custom"
            maxNum="4"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
            images={images}

          />
        </div>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("Postal Code")}
            placeholder="xxxxx"
            name="postal_code"
            type="custom"
            maxNum="5"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
            images={images}

          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label={t("Secondary Number")}
            placeholder="xxxx"
            name="sub_number"
            type="custom"
            maxNum="4"
            required
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={0}
            images={images}

          />
        </div>
      </div>
      <ModalComp
        open={show}
        className="!max-w-[700px] m-auto    "
        classNameBox="!shadow-none w-full !bg-transparent "
        onClose={() => setShow(false)}
        hidden={true}
        Children={
          <div className="flex justify-center w-full">
            <img
              className="w-full h-[45rem] object-contain"
              src={images[index].path}
            />
          </div>
        }
      />
    </div>
  );
}

export default NationalAddressForm;
