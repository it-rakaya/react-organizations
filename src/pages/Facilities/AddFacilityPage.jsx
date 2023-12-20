/* eslint-disable react/prop-types */
import { useState } from "react";
import StepperCustomDot from "../../components/theme/StepperCustomDot";
import FacilityContent from "./FacilityContent";
import FacilityWrapper from "./FacilityWrapper";

const steps = [
  {
    title: "1. بيانات المنشأة",
    // subtitle: "ادخل بيانات منشاتك",
  },
  {
    title: "2. بيانات العنوان الوطني",
    // subtitle: "ادخل بيانات العنوان الوطني",
  },
  {
    title: "3. بيانات  اضافية",
    // subtitle: "ادخل بيانات العنوان الوطني",
  },

  {
    title: "4. تحميل المستندات",
    // subtitle: "ارفق مستندات منشاتك",
  },
];

const AddFacilityPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="w-full">
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
