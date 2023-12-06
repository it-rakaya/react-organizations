import { FormControlLabel, Radio } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import StepperWrapper from "src/@core/styles/mui/stepper";
import success from "../../../../public/images/sucess.svg";
import warning from "../../../../public/images/worning.svg";
import StepperCustomDot from "../../../@core/StepperCustomDot";
import ModalComp from "../../Modal";
import AddFacility from "./AddFacility";
import Signature from "./Signature";
import StepTwo from "../../organisms/MyFacilities/add_facility/StepTwo";

const steps = [
  {
    title: "بيانات المنشأة",
  },
  {
    title: "تحميل المستندات",
  },
  {
    title: "التعهد",
  },
];

const StepperFacility = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSecundModal, setSecundModal] = useState(false);
  const router = useRouter();

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success("Form Submitted");
      setOpen(true);
    }
  };

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
            <StepTwo />
          </Fragment>
        );
      case 2:
        return (
          <Fragment key={step}>
            <Signature />
          </Fragment>
        );
      default:
        return "Unknown Step";
    }
  };

  const renderContent = () => {
    return (
      <div spacing={5}>
        {getStepContent(activeStep)}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "end", gap: "5px" }}
          mt={5}
          className="!sticky !left-0 !bottom-2"
        >
          <Button
            size="large"
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            className="!border !border-solid !rounded-md  "
          >
            السابق
          </Button>
          <Button
            size="large"
            onClick={handleNext}
            className="!bg-[#787EFF] text-white !rounded-md "
          >
            {activeStep === steps.length - 1 ? "حفظ ومتابعه" : "التالي"}
          </Button>
        </Grid>
      </div>
    );
  };

  return (
    <div className="w-full">
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel className="mt-10">
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className="step-label">
                    <div>
                      <Typography className={`font-bold  `}>
                        {step.title}
                      </Typography>
                      {/* <Typography className='step-subtitle'>{step.subtitle}</Typography> */}
                    </div>
                  </div>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </StepperWrapper>
      <Card
        sx={{ mt: 4 }}
        className="!overflow-y-scroll !shadow-none h-[27rem]  scroll_main m-3"
      >
        <CardContent>
          <Formik
            initialValues={""}
            onSubmit={(values) => console.log("values", values)}
          >
            {() => <Form>{renderContent()}</Form>}
          </Formik>
        </CardContent>
      </Card>

      <ModalComp
        open={open}
        className="!max-w-[500px]  "
        onClose={() => setOpen(false)}
        Children={
          <div className="flex flex-col items-center justify-center gap-5 p-3">
            <Image src={warning} width={50} height={50} alt="success" />
            <h1 className="font-bold">الشروط والأحكام</h1>
            <p>
              أقر بأن جميع البيانات صحيحة أقر بأن جميع البيانات صحيحة أقر بأن
              جميع البيانات صحيحة أقر بأن جميع البيانات صحيحة
            </p>
            <FormControlLabel
              value="checked"
              control={<Radio />}
              label="قرأت جميع الشروط والأحكام"
            />
            <Button
              className="!w-2/3 !px-10 !text-white !border !border-solid !rounded-md !bg-gold !border-gold"
              onClick={() => {
                setOpen(false);
                setSecundModal(true);
              }}
            >
              حفظ وتقديم
            </Button>
          </div>
        }
      />

      <ModalComp
        open={openSecundModal}
        onClose={() => setSecundModal(true)}
        Children={
          <div className="flex flex-col items-center justify-center gap-5 p-3">
            <Image src={success} width={50} height={50} alt="success" />
            <h1 className="font-bold"> تم إضافة منشأتك</h1>

            <Button
              className="!w-2/3 !text-white !rounded-md !bg-primary !hover:!bg-gold"
              onClick={() => router.push("/panel/chosen_organization")}
            >
              تقديم طلب
            </Button>
            <Button
              className="!w-2/3 !px-10 !border !border-solid !rounded-md !text-primary !border-primary"
              onClick={() => router.push("/dashboards/analytics")}
            >
              الرجوع للصفحة الرئيسية
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default StepperFacility;
