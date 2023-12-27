/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";

function AfterAndBeforeFacility({
  activeStep,
  setActiveStep,
  setOpen,
  steps,
  attachments_facilities,
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
    // address: "",
    tax_certificate: "",
  };
  const initialCase1 = {
    street_name: "",
    neighborhood: "",
    building_number: "",
    postal_code: "",
    sub_number: "",
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
        const filteredAttachmentLabels =
          values?.attachments?.filter(
            (value) => value !== undefined && value !== null
          ) || [];

        const attachmentsLength =
          attachments_facilities?.attachment_labels.length || 0;
        const actualAttachmentsLength = filteredAttachmentLabels?.length || 0;

        return attachmentsLength !== actualAttachmentsLength;
      default:
        return false;
    }
  };
  // const validateImages = () => {
  //   attachments_facilities?.attachment_labels.forEach((item) => {
  //     if (item.is_required && !values[`attachments[${item.id || item.attachment_id}]`]) {
  //       setFieldError(`attachments[${item.id || item.attachment_id}]`, "Image is required");
  //     }
  //   });
  // };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: "5px",
      }}
      className="fixed bottom-[5px] md:bottom-[10px] left-[37px] md:left-[62px] "
    >
      <ButtonComp
        size="large"
        type="button"
        disabled={activeStep === 0}
        action={handleBack}
        variant="outlined"
        className={`md:!w-[100px] px-1 !text-contained  !mt-0 ${
          activeStep === 0 ? "hidden" : "block"
        } `}
      >
        السابق
      </ButtonComp>
      <ButtonComp
        action={handleNext}
        type="button"
        className={"w-[150px] md:!w-[100px] py-2  px-1 md:py-3 !mt-0 "}
        variant="contained"
        disabled={isSaveDisabled()}
      >
        {activeStep === steps.length - 1 ? "حفظ ومتابعه" : "التالي"}
      </ButtonComp>
    </Grid>
  );
}

export default AfterAndBeforeFacility;
