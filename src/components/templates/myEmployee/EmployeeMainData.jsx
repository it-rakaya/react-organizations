/* eslint-disable react/prop-types */
import { mdiAccountBoxOutline, mdiFileDocumentOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "@mui/material/styles";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useIsRTL } from "../../../hooks/useIsRTL";
import Line from "../../atoms/Line";
import MainHeader from "../../atoms/MainHeader";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectFacilities from "../../molecules/SelectFacilities";
import SelectPositions from "../../molecules/SelectPositions";
import UploadDoc from "../../molecules/uploadImage/UploadDoc";
export default function EmployeeMainData({
  showSelectFacility,
  attachments_facility_employees,
  loadingEmployee,
  uploadProgress
}) {
  const theme = useTheme();
  const { values, errors } = useFormikContext();
  const isRTL = useIsRTL();
  const requiredInputs =
    attachments_facility_employees?.attachment_labels
      ?.filter((item) => item?.is_required === "1")
      ?.map((item) => item?.id) || [];

  const validAttachments = values?.attachments
    ?.map((file, index) => ({ index, file }))
    ?.filter(
      (item) => typeof item?.file !== "undefined" && item.file !== "deleted"
    );

  const attachments = validAttachments?.map((item) => ({
    [`attachments[${item?.index}]`]: item?.file,
  }));
  const isValid = requiredInputs?.every((id) => {
    const attachmentItem = attachments?.find(
      (item) => item[`attachments[${id}]`] !== undefined
    );
    return attachmentItem && attachmentItem[`attachments[${id}]`] !== null;
  });
  return (
    <>
      <div className="">
        <MainHeader
          title={t("Add Employee")}
          styleHead={{ color: theme.palette.primary.main }}
        />
        <div className="grid items-start grid-cols-2 gap-2 md:px-5 max-h-[26rem] h-full overflow-y-scroll scroll_main px-2">
          <h1 className="flex items-center col-span-12 gap-1 py-2 text-xl font-medium dark:text-white">
            <Icon path={mdiAccountBoxOutline} size={1} />
            {t("employee Data")}:
          </h1>
          {showSelectFacility && (
            <div className="col-span-12">
              <SelectFacilities
                label={t("Facility Name")}
                name="facility_id"
                placeholder={t("Choose The Facility Name")}
                required
              />
            </div>
          )}
          <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap ">
            <div className="w-full md:w-1/2">
              <BaseInputField
                label={t("Employee Name")}
                placeholder={t("registration.namePleaceholder")}
                name="name"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <SelectPositions
                label={t("Job title")}
                name="facility_employee_position_id"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap ">
            <div className="w-full">
              <BaseInputField
                label={t("ID Number")}
                placeholder="xxxxxxxxxx"
                name="national_id"
                type="custom"
                maxNum={10}
                required
              />
            </div>
          </div>
          <div className="col-span-12 pb-8 pt-9">
            <Line />
          </div>
          <h1 className="flex col-span-12 gap-1 pb-3 text-xl font-medium item-center dark:text-white">
            <Icon path={mdiFileDocumentOutline} size={1} />
            {t("attachments")}:
          </h1>

          <div className="grid grid-cols-1 col-span-12 gap-2 md:grid-cols-2 ">
            {attachments_facility_employees?.attachment_labels?.map((item) => (
              // <div className="" >
              <UploadDoc
                key={item?.id}
                label={isRTL ? item?.placeholder_ar : item?.placeholder_en}
                name={`attachments[${item?.id}]`}
                placeholder={t("please upload photo")}
                className="!justify-start mt-1 rounded-md text-start"
                accept={item?.extensions || []}
                isRequired={item?.is_required}
              />
              // </div>
            ))}
          </div>
        </div>
      </div>
     

      <div className="flex justify-end px-3 md:px-8">
        <ButtonComp
          loading={loadingEmployee}
          type="submit"
          variant="contained"
          className=" !rounded-md  !w-auto  mt-5"
          status={uploadProgress}
          disabled={
            values?.national_id == "" ||
            Object.entries(errors).length > 0 ||
            !isValid
          }
          progress
        >
          {t("Add")}
        </ButtonComp>
      </div>
    </>
  );
}
