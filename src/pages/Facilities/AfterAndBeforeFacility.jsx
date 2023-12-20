/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import { useFormikContext } from "formik";
import { notify } from "../../utils/toast";
import { t } from "i18next";

function AfterAndBeforeFacility({ activeStep, setActiveStep, setOpen, steps }) {
  const { values, errors } = useFormikContext();
  const hasErrors = Object.keys(errors).length > 0;

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOpen(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const isSaveDisabled = () => {
    switch (activeStep) {
      case 0:
        return values.name === "" || hasErrors;
      case 1:
        return values.street_name === "" || hasErrors;
      case 2:
        return values.employee_number === "" || hasErrors;
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
        action={
          hasErrors
            ? () => notify("worning", t("please complete filed empty"))
            : handleNext
        }
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
