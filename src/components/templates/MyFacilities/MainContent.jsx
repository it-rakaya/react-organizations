/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import AddFacility from "./AddFacility";
import AdditionalInfo from "./AdditionalInfo";
import NationalAddressData from "./NationalAddressData";
import StepTwo from "./StepTwo";
import AfterAndBeforeFacility from "./AfterAndBeforeFacility";
import useFetch from "../../../hooks/useFetch";
import FacilityControl from "./FacilityControl";

function MainContent({
  activeStep,
  steps,
  setActiveStep,
  DetailsFacilities,
  update,
  idFacility,
}) {
  const [open, setOpen] = useState(false);
  const { data: attachments_facilities } = useFetch({
    endpoint: `attachments-labels/facilities`,
    queryKey: ["attachments_facilities"],
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <AddFacility />
          </Fragment>
        );
      case 1:
        return (
          <Fragment key={step}>
            <NationalAddressData />
          </Fragment>
        );
      case 2:
        return (
          <Fragment key={step}>
            <AdditionalInfo />
          </Fragment>
        );
      case 3:
        return (
          <Fragment key={step}>
            <StepTwo
              attachments_facilities={attachments_facilities}
              DetailsFacilities={DetailsFacilities}
            />
          </Fragment>
        );
      default:
        return "Unknown Step";
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between h-full md:mt-5 ">
        {getStepContent(activeStep)}
        <AfterAndBeforeFacility
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setOpen={setOpen}
          steps={steps}
          attachments_facilities={attachments_facilities}
          update={update}
        />
      </div>
      <FacilityControl
        open={open}
        setOpen={setOpen}
        update={update}
        idFacility={idFacility}
      />
    </div>
  );
}

export default MainContent;
