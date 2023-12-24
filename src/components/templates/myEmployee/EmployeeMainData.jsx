/* eslint-disable react/prop-types */
import { t } from "i18next";
import MainHeader from "../../atoms/MainHeader";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectFacilities from "../../molecules/SelectFacilities";
import UploadImage from "../../molecules/UploadImage";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";

export default function EmployeeMainData({
  showSelectFacility,
  attachments_facility_employees,
}) {
  const theme = useTheme();

  return (
    <div className="">
      <MainHeader title={t("Add Employee")} />
      <div className="grid items-start grid-cols-2 gap-2 px-5">
        <h1 className="py-2 text-xl font-bold">1.{t("employee Data")}:</h1>
        {showSelectFacility && (
          <div className="col-span-12">
            <SelectFacilities
              label={t("Choose the facility name")}
              name="facility_id"
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
          <div className="w-full">
            <BaseInputField
              label={t("ID Number")}
              placeholder="10********"
              name="national_id"
              type="custom"
              maxNum={10}
            />
          </div>
        </div>
        <div className="col-span-12 pb-8 pt-9">
          <Divider/>
        </div>
        <h1 className="col-span-12 pb-3 text-xl font-bold">2.{t("attachments")}:</h1>

        <div className="grid grid-cols-2 col-span-12 gap-2 ">
          {attachments_facility_employees?.attachment_labels?.map((item) => (
            // <div className="" >
            <UploadImage
              key={item?.id}
              label={item?.placeholder}
              name={`attachments[${item?.id}]`}
              placeholder={t("please upload photo")}
              className="!justify-start mt-1 rounded-md text-start"
              accept={item?.extensions || []}
            />
            // </div>
          ))}
          {/* <div className="w-1/2 "></div> */}
        </div>
      </div>
    </div>
  );
}
