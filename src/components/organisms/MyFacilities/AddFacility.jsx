import { Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import ModalComp from "../../atoms/ModalComp";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";

export default function AddFacility() {
  const images = [
    { path: "/registerMain.png" },
    { path: "/tax_certificate.png" },
  ];
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  console.log("🚀 ~ file: AddFacility.jsx:17 ~ AddFacility ~ index:", index);

  return (
    <div className="relative">
      <div className="grid items-start grid-cols-1 md:px-5 md:grid-cols-2">
        <div className="col-span-2">
          <Typography className={`font-bold  `}>1. بيانات المنشاة</Typography>
        </div>

        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="relative w-full md:w-1/2">
            <BaseInputField
              label={t("Trade name")}
              placeholder="محمد احمد محمد"
              name="name"
              showIcon
              required
              setShow={setShow}
              setIndex={setIndex}
              index={0}
            />
          </div>

          <div className="w-full md:w-1/2">
            <BaseInputField
              label=" رقم السجل التجاري  "
              placeholder="10********"
              name="registration_number"
              type="custom"
              maxNum="10"
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              index={0}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full col-span-6 md:w-1/2">
            <SelectCitiesSaudi
              label={"مصدر السجل التجاري "}
              name="registration_source"
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              index={0}
            />
          </div>
          <div className="w-full md:w-1/2">
            <BaseInputField
              label="شهادة الرقم الضريبي"
              placeholder="***********34"
              name="tax_certificate"
              type="custom"
              maxNum="9"
              required
              showIcon
              index={1}
              setIndex={setIndex}
              setShow={setShow}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full md:w-1/2">
            <DatePickerComp
              name="version_date"
              name_hj="version_date_hj"
              label={t("Date of issuance of the commercial register in AD")}
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              index={0}
            />
          </div>

          <div className="w-full md:w-1/2">
            <DatePickerComp
              name="end_date"
              name_hj="end_date_hj"
              label={t(
                "Commercial registration expiration date in Gregorian calendar"
              )}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full md:col-span-6">
            <BaseInputField
              label="رقم رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة  "
              placeholder="10********"
              name="license"
              type="custom"
              maxNum="10"
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              index={0}
            />
          </div>
          <div className="flex items-start justify-center w-full">
            <DatePickerComp
              name="license_expired"
              name_hj="license_expired_hj"
              label={
                "تاريخ انتهاء رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة بالميلادي"
              }
              required
              showIcon
              setShow={setShow}
              setIndex={setIndex}
              index={0}
            />
          </div>
        </div>



        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full ">
            <BaseInputField
              label="الطاقة الاستيعابية للمنشأة"
              placeholder="36541"
              name="capacity"
              type="custom"
              maxNum="5"
              required
              
            />
          </div>
        </div>
      </div>
      <ModalComp
        open={show}
        className="!max-w-[850px] m-auto    "
        classNameBox="!bg-transparent shadow-[initial]"
        onClose={() => setShow(false)}
        hidden={true}
        Children={
          <div className="flex justify-center">
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
