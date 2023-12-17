/* eslint-disable react/prop-types */
import { t } from "i18next";
import PreviewImageLink from "../../molecules/PreviewImageLink";
import PreviewPdf from "../../molecules/PreviewPdf";
import { useTheme } from "@mui/material/styles";

export default function DetailsFacility({ data }) {
  const theme = useTheme();
  const mainColor = theme?.palette?.primary?.main;

  return (
    <div>
      <div className="grid grid-cols-2 p-4 gap-y-4">
        <div className="flex col-span-2 gap-4 m">
          <p className={`mt-2 text-2xl font-bold`} style={{ color: mainColor }}>
            {t("Facility Name")}
          </p>

          <p className="mt-2 text-2xl font-bold">{data?.name}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold ">الاسم</p>
          <p>{data?.name}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold ">العنوان</p>
          <p>{data?.address}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold ">رقم الطهاة </p>
          <p>{data?.chefs_number}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> تاريخ الإصدار </p>
          <p>{data?.version_date}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> تاريخ الإصدار بالهجري</p>
          <p>{data?.version_date_hj}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> رقم الموظف </p>
          <p>{data?.employee_number}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> تاريخ الانتهاء </p>
          <p>{data?.end_date}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> تاريخ الانتهاء بالهجري</p>
          <p>{data?.end_date_hj}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> مساحة المطبخ </p>
          <p>{data?.kitchen_space}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> الرخصه </p>
          <p>{data?.license}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> تاريخ انتهاء الرخصه </p>
          <p>{data?.license_expired}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> تاريخ انتهاء الرخصه بالهجري</p>
          <p>{data?.license_expired_hj}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> رقم التسجيل </p>
          <p>{data?.registration_number}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> مصدر التسجيل </p>
          <p>{data?.city}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> شهادة الضرائب </p>
          <p>{data?.tax_certificate}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> الحي </p>
          <p>{data?.neighborhood}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> الشارع </p>
          <p>{data?.street_name}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold "> الرقم الفرعي</p>
          <p>{data?.sub_number}</p>
        </div>
        <div className="flex gap-3 ">
          <p className="font-bold ">رمز البريد </p>
          <p>{data?.postal_code}</p>
        </div>
        {data?.attachmentUrl.map((item) => (
          <div className="flex items-center " key={item?.id}>
            <p className="font-bold "> {item?.label} </p>
            {!item?.value?.toLowerCase().endsWith(".pdf") ? (
              <p>
                <PreviewImageLink url={item?.value} />
              </p>
            ) : (
              <PreviewPdf item={item?.value} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
