/* eslint-disable react/prop-types */
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import StepperWrapper from "../../components/theme/stepper";
import { t } from "i18next";

function FacilityWrapper({ activeStep, steps, StepperCustomDot }) {
  return (
    <StepperWrapper dir="rtl">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className=" mt-0 md:mt-10 !bg-transparent  !shadow-none "
        dir="rtl"
      >
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel StepIconComponent={StepperCustomDot}>
                <div className="step-label">
                  <div>
                    <Typography className={`font-bold text-[12px] !text-black dark:!text-white`}>
                      {t(step.title)}
                    </Typography>
                 
                  </div>
                </div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </StepperWrapper>
  );
}

export default FacilityWrapper;
