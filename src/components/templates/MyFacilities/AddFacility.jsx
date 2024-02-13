import { Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import Line from "../../atoms/Line";
import ModalComp from "../../atoms/ModalComp";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";
import SelectBank from "../../molecules/Selects/SelectBank";

export default function AddFacility() {
  const images = [
    { path: "/registerMain.png" },
    { path: "/tax_certificate.png" },
    { path: "/license.png" },
  ];
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="relative">
      <div className="grid items-start grid-cols-1 px-1 md:grid-cols-2">
        <div className="col-span-2">
          <Typography className={`font-bold  !text-black dark:!text-white `}>
            1. {t("Facility Information")}
          </Typography>
        </div>
        <h1 className="flex items-center col-span-12 gap-1 pt-5 pb-3 text-xl font-medium dark:text-white">
          {t("Commercial Registration Information")}:
        </h1>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="relative w-full md:w-1/2">
            <BaseInputField
              label={t("Facility Trade Name")}
              placeholder={t("Rakaya Kitchen for Catering Services")}
              name="name"
              showIcon
              required
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={0}
            />
          </div>

          <div className="w-full md:w-1/2">
            <BaseInputField
              label={t("registration number")}
              placeholder="xxxxxxxxxx"
              name="registration_number"
              type="custom"
              maxNum="10"
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={0}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full col-span-6 md:w-1/2">
            <SelectCitiesSaudi
              label={t("Commercial Registration Source")}
              name="registration_source"
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={0}
            />
          </div>
          <div className="w-full md:w-1/2">
            <BaseInputField
              label={t("Vat Registration Number")}
              placeholder="xxxxxxxxxxxxxxx"
              name="tax_certificate"
              type="custom"
              maxNum="15"
              required
              showIcon
              index={1}
              setIndex={setIndex}
              images={images}
              setShow={setShow}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full md:w-1/2">
            <DatePickerComp
              name="version_date"
              name_hj="version_date_hj"
              label={t("Commercial Registration Release Date")}
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={0}
            />
          </div>

          <div className="w-full md:w-1/2">
            <DatePickerComp
              name="end_date"
              name_hj="end_date_hj"
              label={t(
                "Commercial Registration Expiration Date"
              )}
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={0}
            />
          </div>
        </div>
        <div className="col-span-12 pb-8 pt-9">
         <Line/>
        </div>
        <h1 className="flex items-center col-span-12 gap-1 pb-3 text-xl font-medium dark:text-white">
          {/* <Icon path={mdiAccountBoxOutline} size={1} /> */}
          {t("Commercial Activity Licence Information (balady)")}:
        </h1>

        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full md:col-span-6">
            <BaseInputField
              label={t("Licence")}
              placeholder="xxxxxxxxxxx"
              name="license"
              type="custom"
              maxNum="11"
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={2}
            />
          </div>
          <div className="flex items-start justify-center w-full">
            <DatePickerComp
              name="license_expired"
              name_hj="license_expired_hj"
              label={t("Licence Expiration Date")}
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              images={images}
              index={2}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full ">
            <BaseInputField
              label={t("Capacity")}
              placeholder="xxxxx"
              name="capacity"
              type="custom"
              maxNum="5"
              required
            />
          </div>
        </div>
        <div className="col-span-12 pb-8 pt-9">
         <Line/>
        </div>
        <h1 className="flex items-center col-span-12 gap-1 pb-3 text-xl font-medium dark:text-white">
          {/* <Icon path={mdiAccountBoxOutline} size={1} /> */}
          {t("Facility's Bank Information:")}:
        </h1>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full md:w-1/2">
            <BaseInputField
              label={t("Account Name")}
              placeholder={t("Rakaya Kitchen for Catering Services")}
              name="account_name"
              required
              showIcon
              messageInfo={t("Please enter the name of the facility's bank account")}
            />
          </div>
          <div className="w-full md:w-1/2">
            <SelectBank
              name="bank_id"
              required={true}
              label={t("Choose Bank")}
              showIcon
              messageInfo={t("Please select the facility's bank")}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full">
            <BaseInputField
              label={t("IBAN Number")}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
              name="iban"
              type="IBAN"
              required
              maxNum="29"
              showIcon
              messageInfo={t("Please enter the facility's IBAN number")}
            />
          </div>
        </div>
      </div>
      <ModalComp
        open={show}
        className="!max-w-[700px] m-auto   max-h-[450px]  "
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
