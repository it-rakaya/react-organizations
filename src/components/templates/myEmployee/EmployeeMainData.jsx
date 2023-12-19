/* eslint-disable react/prop-types */
import { t } from "i18next";
import MainHeader from "../../atoms/MainHeader";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import UploadImage from "../../molecules/UploadImage";
import useFetch from "../../../hooks/useFetch";
import SelectFacilities from "../../molecules/SelectFacilities";

export default function EmployeeMainData({ showSelectFacility }) {
  const { data: attachments_facility_employees } = useFetch({
    endpoint: `attachments-labels/facility_employees`,
    queryKey: ["attachments_facility_employees"],
  });

  return (
    <div className="">
      <MainHeader title={t("Add Employee")} />
      <div className="grid items-start grid-cols-2 gap-2">
      {showSelectFacility && (
            <div className="col-span-12">
              <SelectFacilities
                label={t("Choose the facility name")}
                name={"facility_id"}
                placeholder={t("Choose the facility name")}
              />
            </div>
       )}
        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2">
            <BaseInputField
              label={t("Employee Name")}
              placeholder="محمد احمد محمد"
              name="name"
            />
          </div>
          <div className="w-1/2">
            <BaseInputField
              label={t("Job title")}
              placeholder={`${t("Programming")}`}
              name="position"
            />
          </div>
        </div>
        <div className="flex items-start col-span-12 gap-2 ">
          <div className="w-1/2">
            <BaseInputField
              label={t("ID Number")}
              placeholder="10********"
              name="national_id"
              type="custom"
              maxNum={10}
            />
          </div>
        </div>
        <div className="flex items-start col-span-12 gap-2 "></div>
        <div className="grid grid-cols-2 col-span-12 gap-2 ">
          {attachments_facility_employees?.attachment_labels?.map((item) => (
            <div className="" key={item?.id}>
              <label>{item?.placeholder}</label>
              <UploadImage
                name={`attachments[${item?.id}]`}
                placeholder={t("please upload photo")}
                className="!justify-start mt-1 rounded-md text-start"
              />
            </div>
          ))}
          {/* <div className="w-1/2 "></div> */}
        </div>
      </div>
    </div>
  );
}
