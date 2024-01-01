/* eslint-disable react/prop-types */
import { useState } from "react";
import StepperCustomDot from "../../components/theme/StepperCustomDot";
import FacilityContentEdit from "./FacilityContentEdit";
import FacilityWrapper from "./FacilityWrapper";
import { useParams } from "react-router-dom";

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

const EditFacilityPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  return (
    <>
      <div className="w-full">
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
