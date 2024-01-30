/* eslint-disable react/prop-types */
import { useState } from "react";
import StepperCustomDot from "../../components/theme/StepperCustomDot";
import FacilityContent from "./FacilityContent";
import FacilityWrapper from "./FacilityWrapper";

const steps = [
  {
    title: `1.Facility Data`,
  },
  {
    title: "2.National Adress",
  },
  {
    title: "3.Aditional Information",
  },

  {
    title: "4.Upload Files",
  },
];

const AddFacilityPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="w-full px-2">
        <FacilityWrapper
          steps={steps}
          activeStep={activeStep}
          StepperCustomDot={StepperCustomDot}
        />
        <FacilityContent
          activeStep={activeStep}
          steps={steps}
          setActiveStep={setActiveStep}
        />
      </div>
    </>
  );
};

export default AddFacilityPage;
