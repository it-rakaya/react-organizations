/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import StepperCustomDot from "../../theme/StepperCustomDot";
import StepperWrapper from "../../theme/stepper";
import AddFacility from "./AddFacility";
import Signature from "./Signature";
import StepTwo from "./add_facility/StepTwo";
import * as Yup from "yup";
import { t } from "i18next";
import ModalComp from "../../atoms/ModalComp";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";

const steps = [
  {
    title: "بيانات المنشأة",
  },
  {
    title: "تحميل المستندات",
  },
  // {
  //   title: "التعهد",
  // },
];

const StepperFacility = ({ setOpenAddFaculty, resetForm, updateData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [checked, setChecked] = useState(false);
  console.log("🚀 ~ file: StepperFacility.jsx:52 ~ StepperFacility ~ checked:", checked)
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOpen(true);
      //   console.log("Performing form submission logic");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const queryClient = useQueryClient();

  const { mutate: addFacility, isPending: loadingAddFacility } = useMutate({
    mutationKey: [`add_facilities`],
    endpoint: `facilities`,
    onSuccess: () => {
      queryClient.refetchQueries(["facilities"]);
      notify("success");
      setOpenAddFaculty(false);
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  const initialValues = {
    name: !resetForm ? updateData?.name : "",
    registration_number: !resetForm ? updateData?.registration_number : "",
    version_date: !resetForm ? updateData?.version_date : new Date(),
    version_date_hj: !resetForm ? updateData?.version_date_hj : "",
    end_date: !resetForm ? updateData?.end_date : new Date(),
    end_date_hj: !resetForm ? updateData?.end_date_hj : "",
    registration_source: !resetForm ? updateData?.registration_source : "",
    license: !resetForm ? updateData?.license : "",
    license_expired: !resetForm ? updateData?.license_expired : new Date(),
    license_expired_hj: !resetForm ? updateData?.license_expired_hj : "",
    address: !resetForm ? updateData?.address : "",
    tax_certificate: !resetForm ? updateData?.tax_certificate : "",
    employee_number: !resetForm ? updateData?.employee_number : "",
    chefs_number: !resetForm ? updateData?.chefs_number : "",
    kitchen_space: !resetForm ? updateData?.kitchen_space : "",
    street_name: !resetForm ? updateData?.street_name : "",
    neighborhood: !resetForm ? updateData?.neighborhood : "",
    city: !resetForm ? updateData?.city : "",
    building_number: !resetForm ? updateData?.building_number : "",
    postal_code: !resetForm ? updateData?.postal_code : "",
    sub_number: !resetForm ? updateData?.sub_number : "",
    signature: !resetForm ? updateData?.signature : "",
  };
  const validationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("the facility name is required")),
      registration_number: Yup.string()
        .trim()
        .required(t("the registration number required")),
      version_date: Yup.string()
        .trim()
        .required(t("the registration number required")),
      end_date: Yup.string()
        .trim()
        .required(t("the registration number required")),
      license_expired: Yup.string()
        .trim()
        .required(t("the registration number required")),
      registration_source: Yup.string()
        .trim()
        .required(t("the registration source required")),
      license: Yup.string().trim().required(t("the license number required")),
      address: Yup.string().trim().required(t("address is  required")),
      tax_certificate: Yup.string()
        .trim()
        .required(t("tax certificate is required")),
      employee_number: Yup.string()
        .trim()
        .required(t("employee number is required")),
      chefs_number: Yup.string().trim().required(t("chefs number is required")),
      kitchen_space: Yup.string()
        .trim()
        .required(t("kitchen space is required")),
      street_name: Yup.string().trim().required(t("street name is required")),
      neighborhood: Yup.string().trim().required(t("neighborhood is required")),
      city: Yup.string().trim().required(t("city is required")),
      building_number: Yup.string()
        .trim()
        .required(t("building number required")),
      postal_code: Yup.string().trim().required(t("postal code required")),
      sub_number: Yup.string().trim().required(t("sub number required")),
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
            <StepTwo />
          </Fragment>
        );
      // case 2:
      //   return (
      //     <Fragment key={step}>
      //       <Signature name="signature" />
      //     </Fragment>
      //   );
      default:
        return "Unknown Step";
    }
  };

  return (
    <>
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
          className="!overflow-y-scroll scroll_main !shadow-none h-[27rem]  scroll_main m-3"
        >
          <CardContent className="h-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("value", {
                  ...values,
                  // "attachments[registration]": values["registration"],
                  // "attachments[national_address]": values["national_address"],
                });
                addFacility({
                  ...values,
                  // "attachments[registration]": values["registration"],
                  // "attachments[national_address]": values["national_address"],
                });
              }}
            >
              {({ errors, values }) => (
                <Form className="h-full">
                  <div
                    spacing={5}
                    className="flex flex-col justify-between h-full"
                  >
                    {getStepContent(activeStep)}
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "5px",
                      }}
                      mt={5}
                      className=""
                    >
                      <ButtonComp
                        size="large"
                        type="button"
                        disabled={activeStep === 0}
                        action={handleBack}
                        variant="outlined"
                        className={`! w-auto !text-contained ${
                          activeStep === 0 ? "hidden" : "block"
                        } `}
                      >
                        السابق
                      </ButtonComp>
                      <ButtonComp
                        action={
                          Object.keys(errors).length < 0
                            ? () =>
                                notify("warning", t("please complete field"))
                            : handleNext
                        }
                        type="button"
                        className={"w-auto"}
                        variant="contained"
                        // disabled={values.name == ""}
                      >
                        {activeStep === steps.length - 1
                          ? "حفظ ومتابعه"
                          : "التالي"}
                      </ButtonComp>
                    </Grid>
                  </div>
                  <ModalComp
                    open={open}
                    className="!max-w-[500px]  "
                    onClose={() => setOpen(false)}
                    Children={
                      <div className="pt-10 !flex gap-3 !items-center !justify-center !flex-col">
                        <div>
                          <TermsConditionIcon />
                        </div>
                        <h2>{t("Terms and Conditions")}</h2>

                        <p>
                          {t(
                            "I confirm that all data is correct. I confirm that all data is correct"
                          )}
                        </p>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            // value={value}
                            // onChange={handleChange}
                          >
                            <FormControlLabel
                              value="female"
                              control={
                                <Radio
                                onClick={() => setChecked(!checked)}
                                  checked={checked}
                                />
                              }
                              label={t("I have read all terms and conditions")}
                            />
                          </RadioGroup>
                        </FormControl>
                        <ButtonComp
                          type={"submit"}
                          action={() =>
                            addFacility({
                              ...values,
                              // "attachments[registration]": values["registration"],
                              // "attachments[national_address]": values["national_address"],
                            })
                          }
                          loading={loadingAddFacility}
                          className={"w-auto"}
                          disabled={!checked}
                          variant="contained"
                        >
                          {t("Save")}
                        </ButtonComp>
                      </div>
                    }
                  />
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StepperFacility;
