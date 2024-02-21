/* eslint-disable react/prop-types */
import { useState } from "react";
import StepperCustomDot from "../../components/theme/StepperCustomDot";
import { useParams } from "react-router-dom";
import FacilityWrapper from "../../components/templates/MyFacilities/FacilityWrapper";
import FacilityContentEdit from "../../components/templates/MyFacilities/FacilityContentEdit";

const steps = [
  {
    title: `1.Facility Info`,
  },
  {
    title: "2.National Address Info",
  },
  {
    title: "3.Additional Info",
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
