import { Typography } from "@mui/material";
import { t } from "i18next";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";

export default function AddFacility() {
  return (
    <div className="">
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
              required
            />
            <div className="absolute top-[20px] left-[10px] md:top-[18%] md:right-[43%] info_hover">
              <Icon path={mdiInformationOutline} size={0.7} />
              <div className="absolute bg-red-500 content_name_hover top-[0%] right-[38%]">
                test
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
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
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          <div className="w-full col-span-6 md:w-1/2">
            <SelectCitiesSaudi
              label={"مصدر السجل التجاري "}
              name="registration_source"
              required
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
            />
          </div>
        </div>

        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
          {/* <div className="items-start w-full md:w-1/2 ">
            <BaseInputField
              label="عنوان المنشأة (الحي-الشارع)"
              placeholder="الملك فهد"
              name="address"
              required
            />
          </div> */}
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
    </div>
  );
}
