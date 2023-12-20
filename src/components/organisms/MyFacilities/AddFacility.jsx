import { Typography } from "@mui/material";
import { t } from "i18next";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";

export default function AddFacility() {
  return (
    <div className="">
      <div className="grid items-start grid-cols-2 p-5">
        <div className="">
          <Typography className={`font-bold  `}>1. بيانات المنشاة</Typography>
        </div>

        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2">
            <BaseInputField
              label={t("Trade name")}
              placeholder="محمد احمد محمد"
              name="name"
              required
            />
          </div>
          <div className="w-1/2">
            <BaseInputField
              label=" رقم السجل التجاري  "
              placeholder="10********"
              name="registration_number"
              type="custom"
              maxNum="10"
              required
            />
          </div>
        </div>
        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2">
            <DatePickerComp
              name="version_date"
              name_hj="version_date_hj"
              label={t("Date of issuance of the commercial register in AD")}
              required
            />
          </div>

          <div className="w-1/2">
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

  

        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2 col-span-6">
            <SelectCitiesSaudi
              label={"مصدر السجل التجاري "}
              name="registration_source"
              required
            />
          </div>
          <div className="w-1/2 col-span-6">
            <BaseInputField
              label="رقم رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة  "
              placeholder="10********"
              name="license"
              type="custom"
              maxNum="10"
              required
            />
          </div>
        </div>

        <div className="flex items-start col-span-12 gap-2 ">
          <div className="flex items-start justify-center w-1/2">
            <DatePickerComp
              name="license_expired"
              name_hj="license_expired_hj"
              label={
                "تاريخ انتهاء رخصة مزاولة المهنة الصادرة من أمانة العاصمة المقدسة بالميلادي"
              }
              required
            />
          </div>

          <div className="items-start w-1/2 ">
            <BaseInputField
              label="عنوان المنشأة (الحي-الشارع)"
              placeholder="الملك فهد"
              name="address"
              required
            />
          </div>
        </div>

        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2 ">
            <BaseInputField
              label="شهادة الرقم الضريبي"
              placeholder="***********34"
              name="tax_certificate"
              type="custom"
              maxNum="9"
              required
            />
          </div>
          <div className="w-1/2 ">
            <BaseInputField
              label="الطاقة الاستيعابية للحجاج"
              placeholder="***********34"
              name="capacity"
              type="custom"
              maxNum="9"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
