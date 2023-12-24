/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";

function AfterAndBeforeFacility({
  activeStep,
  setActiveStep,
  setOpen,
  steps,
  setFormValues,
}) {
  const { values, errors } = useFormikContext();

  const hasErrors = Object.keys(errors).length > 0;

  const handleBack = () => {
    // setFormValues(values);
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
      // Handle validation errors (e.g., show a notification)
      // notify("Validation errors. Please fill in the required fields.");
      return
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
    address: "",
    tax_certificate: "",
  };
  console.log(
    "🚀 ~ file: AfterAndBeforeFacility.jsx:44 ~ AfterAndBeforeFacility ~ initialCase0:",
    initialCase0
  );
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

  console.log(
    "test",
    Object.keys(initialCase0).some((key) => values[key] === "" || errors[key])
  );
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
      default:
        return false;
    }
  };

  const isButtonDisabled = isSaveDisabled();
  console.log(
    "🚀 ~ file: AfterAndBeforeFacility.jsx:118 ~ isButtonDisabled:",
    isButtonDisabled
  );

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "end",
        gap: "5px",
      }}
      className="fixed bottom-[10px] left-[62px] "
    >
      <ButtonComp
        size="large"
        type="button"
        disabled={activeStep === 0}
        action={handleBack}
        variant="outlined"
        className={`! w-[100px] px-1 !text-contained ${
          activeStep === 0 ? "hidden" : "block"
        } `}
      >
        السابق
      </ButtonComp>
      <ButtonComp
        action={ handleNext}
        type="button"
        className={"! w-[100px] px-1 py-3 "}
        variant="contained"
        disabled={isSaveDisabled()}
      >
        {activeStep === steps.length - 1 ? "حفظ ومتابعه" : "التالي"}
      </ButtonComp>
    </Grid>
  );
}

export default AfterAndBeforeFacility;
