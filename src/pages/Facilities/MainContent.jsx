/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import AddFacility from "../../components/organisms/MyFacilities/AddFacility";
import AdditionalInfo from "../../components/organisms/MyFacilities/AdditionalInfo";
import NationalAddressData from "../../components/organisms/MyFacilities/NationalAddressData";
import StepTwo from "../../components/organisms/MyFacilities/StepTwo";
import AfterAndBeforeFacility from "./AfterAndBeforeFacility";
import FacilityControl from "./FacilityControl";
import useFetch from "../../hooks/useFetch";

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
      <div spacing={5} className="flex flex-col justify-between h-full mt-10 ">
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
