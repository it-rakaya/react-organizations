/* eslint-disable react/prop-types */
import { t } from "i18next";
import MainHeader from "../../atoms/MainHeader";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectFacilities from "../../molecules/SelectFacilities";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Icon from "@mdi/react";
import { mdiAccountBoxOutline, mdiFileDocumentOutline } from "@mdi/js";
import UploadImage from "../../molecules/uploadImage/UploadImage";
export default function EmployeeMainData({
  showSelectFacility,
  attachments_facility_employees,
}) {
  const theme = useTheme();

  return (
    <div className="">
      <MainHeader
        title={t("Add Employee")}
        styleHead={{ color: theme.palette.primary.main }}
      />
      <div className="grid items-start grid-cols-2 gap-2 px-5 max-h-[32rem] h-full overflow-y-scroll scroll_main ">
      <h1 className="flex items-center col-span-12 gap-1 py-2 text-xl font-medium dark:text-white">
        <Icon path={mdiAccountBoxOutline} size={1} />
        {t("employee Data")}:
      </h1>
        {showSelectFacility && (
          <div className="col-span-12">
            <SelectFacilities
              label={t("Choose the facility name")}
              name="facility_id"
              placeholder={t("Choose the facility name")}
            />
          </div>
        )}
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap ">
          <div className="w-full md:w-1/2">
            <BaseInputField
              label={t("Employee Name")}
              placeholder="محمد احمد محمد"
              name="name"
            />
          </div>
          <div className="w-full md:w-1/2">
            <BaseInputField
              label={t("Job title")}
              placeholder={`${t("Programming")}`}
              name="position"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap ">
          <div className="w-full">
            <BaseInputField
              label={t("ID Number")}
              placeholder="********10"
              name="national_id"
              type="custom"
              maxNum={10}
            />
          </div>
        </div>
        <div className="col-span-12 pb-8 pt-9">
          <Divider />
        </div>
        <h1 className="flex col-span-12 gap-1 pb-3 text-xl font-medium item-center dark:text-white">
        <Icon path={mdiFileDocumentOutline} size={1} />

         {t("attachments")}:
        </h1>

        <div className="grid grid-cols-1 col-span-12 gap-2 md:grid-cols-2 ">
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
        </div>
      </div>
      <div className="grid items-start grid-cols-2 gap-2 px-5"></div>
    </div>
  );
}
