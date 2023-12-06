import { t } from "i18next";
import MainHeader from "../../atoms/MainHeader";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import UploadImage from "../../molecules/UploadImage";
import useFetch from "../../../hooks/useFetch";

export default function EmployeeMainData() {
  const { data: attachments_facility_employees } = useFetch({
    endpoint: `attachments-labels/facility_employees`,
    queryKey: ["attachments_facility_employees"],
    onError(e) {
      console.log("e", e);
    },
  });
  console.log(
    "🚀 ~ file: EmployeeMainData.jsx:15 ~ EmployeeMainData ~ attachments_facility_employees:",
    attachments_facility_employees
  );
  return (
    <div className="">
      <MainHeader title="اضافة موظف" />
      <div className="grid items-start grid-cols-2 gap-2 p-5">
        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2">
            <BaseInputField
              label=" اسم الموظف "
              placeholder="محمد احمد محمد"
              name="name"
            />
          </div>
          <div className="w-1/2">
            <BaseInputField
              label=" المسمى الوظيفي "
              placeholder={`${t("Programming")}`}
              name="position"
            />
          </div>
        </div>
        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-full">
            <BaseInputField
              label=" رقم الهوية "
              placeholder="10********"
              name="national_id"
              type="number"
              maxNum={10}
            />
          </div>
        </div>
        <div className="flex items-start col-span-12 gap-2 ">
          {attachments_facility_employees.attachment_labels.map((item) => (
            <div className="w-1/2 " key={item?.id}>
              <label>{item?.placeholder}</label>
              <UploadImage
                name={`attachments[${item?.id}]`}
                placeholder={t("please upload photo")}
              />
            </div>
          ))}
          {/* <div className="w-1/2 "></div> */}
        </div>
      </div>
    </div>
  );
}
