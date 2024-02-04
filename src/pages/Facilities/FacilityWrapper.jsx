/* eslint-disable react/prop-types */
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import StepperWrapper from "../../components/theme/stepper";
import { t } from "i18next";
import { useIsRTL } from "../../hooks/useIsRTL";

function FacilityWrapper({ activeStep, steps, StepperCustomDot }) {
  const isRTL = useIsRTL();
  return (
    <StepperWrapper dir={isRTL ? "rtl" : "ltr"}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className=" mt-0 md:mt-10 !bg-transparent  !shadow-none "
        //  dir="ltr"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {steps.map((step, index) => {
          return (
            <Step key={index} dir={isRTL ? "rtl" : "ltr"}>
              <StepLabel StepIconComponent={StepperCustomDot} dir={isRTL ? "rtl" : "ltr"}>
                <div className="step-label">
                  <div>
                    <Typography
                      className={`font-bold text-[12px] !text-black dark:!text-white`}
                    >
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
