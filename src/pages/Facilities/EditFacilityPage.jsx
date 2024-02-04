/* eslint-disable react/prop-types */
import { useState } from "react";
import StepperCustomDot from "../../components/theme/StepperCustomDot";
import FacilityContentEdit from "./FacilityContentEdit";
import FacilityWrapper from "./FacilityWrapper";
import { useParams } from "react-router-dom";

const steps = [
  {
    title: `1.Facility Information`,
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

const EditFacilityPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  return (
    <>
      <div className="w-full px-2">
        <FacilityWrapper
          steps={steps}
          activeStep={activeStep}
          StepperCustomDot={StepperCustomDot}
        />
        <FacilityContentEdit
          activeStep={activeStep}
          steps={steps}
          idFacility = {id}
          setActiveStep={setActiveStep}
        />
      </div>
    </>
  );
};

export default EditFacilityPage;
