/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import { t } from "i18next";

function AfterAndBeforeFacility({
  activeStep,
  setActiveStep,
  setOpen,
  steps,
  attachments_facilities,
  update,
}) {
  const { values, errors } = useFormikContext();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    const checkErrorsForKeys = (initialCase) =>
      Object.keys(initialCase).some((key) => values[key] === "" || errors[key]);

    // Check for validation errors for the current step
    const hasValidationErrors =
      activeStep === 0
        ? checkErrorsForKeys(initialCase0)
        : activeStep === 1
        ? checkErrorsForKeys(initialCase1)
        : activeStep === 2
        ? checkErrorsForKeys(initialCase2)
        : false;

    // If there are validation errors, handle them (notify, etc.)
    if (hasValidationErrors) {
      return;
    } else {
      // Proceed to the next step
      if (activeStep === steps.length - 1) {
        setOpen(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const initialCase0 = {
    name: "",
    registration_number: "",
    version_date: new Date(),
    version_date_hj: "",
    end_date: new Date(),
    end_date_hj: "",
    license_expired: new Date(),
    license_expired_hj: "",
    registration_source: "",
    capacity: "",
    license: "",
    tax_certificate: "",
  };
  const initialCase1 = {
    street_name: "",
    building_number: "",
    postal_code: "",
    sub_number: "",
    district_id: "",
    city_id: "",
  };
  const initialCase2 = {
    employee_number: "",
    chefs_number: "",
    building_number: "",
    kitchen_space: "",
  };
  const isSaveDisabled = () => {
    const checkErrorsForKeys = (initialCase) =>
      Object.keys(initialCase).some((key) => values[key] === "" || errors[key]);

    switch (activeStep) {
      case 0:
        return checkErrorsForKeys(initialCase0);
      case 1:
        return checkErrorsForKeys(initialCase1);
      case 2:
        return checkErrorsForKeys(initialCase2);
      case 3:
        // Filter out undefined values from attachments_facilities
        // const filteredAttachmentLabels =
        // values?.attachments?.filter(
        //   (value) => value !== undefined && value !== null
        //   ) || [];

        // const attachmentsLength =
        // attachments_facilities?.attachment_labels.length || 0;
        // const actualAttachmentsLength = filteredAttachmentLabels?.length || 0;

        // return update ? "" : attachmentsLength !== actualAttachmentsLength;
        const requiredInputs =
          attachments_facilities?.attachment_labels
            ?.filter((item) => item?.is_required === "1")
            ?.map((item) => item?.id) || [];

        const validAttachments = values?.attachments
          ?.map((file, index) => ({ index, file }))
          ?.filter((item) => typeof item?.file !== "undefined");

        const attachments = validAttachments?.map((item) => ({
          [`attachments[${item?.index}]`]: item?.file,
        }));
        const isValid = requiredInputs?.every((id) => {
          const attachmentItem = attachments?.find(
            (item) => item[`attachments[${id}]`] !== undefined
          );
          return (
            attachmentItem && attachmentItem[`attachments[${id}]`] !== null
          );
        });
        return update ? "" : !isValid;
      default:
        return false;
    }
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: "5px",
      }}
      className="md:fixed mt-5 md:mt-0 bottom-[55px] md:bottom-[30px] ltr:right-[16px] ltr:md:right-[28px] rtl:left-[16px] md:rtl:left-[33px] "
    >
      <ButtonComp
        size="large"
        type="button"
        disabled={activeStep === 0}
        action={handleBack}
        variant="outlined"
        className={`!w-[130px] px-1 !text-contained  !mt-0 ${
          activeStep === 0 ? "!hidden" : "block"
        } `}
      >
        {t("Back")}
      </ButtonComp>

      <ButtonComp
        action={handleNext}
        type="button"
        className={"!w-[130px] py-2  px-1 md:py-3 !mt-0 "}
        variant="contained"
        disabled={isSaveDisabled()}
      >
        {activeStep === steps.length - 1 ? t("Save") : t("Next")}
      </ButtonComp>
    </Grid>
  );
}

export default AfterAndBeforeFacility;
