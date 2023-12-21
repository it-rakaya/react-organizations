/* eslint-disable react/prop-types */
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import StepperWrapper from "../../components/theme/stepper";

function FacilityWrapper({ activeStep, steps, StepperCustomDot }) {
  return (
    <StepperWrapper>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="mt-10 !bg-transparent"
      >
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel StepIconComponent={StepperCustomDot}>
                <div className="step-label">
                  <div>
                    <Typography className={`font-bold  `}>
                      {step.title}
                    </Typography>
                    <Typography variant="caption" component="p">
                      {step.subtitle}
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