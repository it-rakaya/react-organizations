/* eslint-disable react/prop-types */
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { Fragment, useState } from "react";
import * as Yup from "yup";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ModalComp from "../../components/atoms/ModalComp";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import TermsConditionIcon from "../../components/atoms/icons/TermsConditionIcon";
import StepperCustomDot from "../../components/theme/StepperCustomDot";
import StepperWrapper from "../../components/theme/stepper";
import AddFacility from "../../components/organisms/MyFacilities/AddFacility";
import StepTwo from "../../components/organisms/MyFacilities/StepTwo";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "بيانات المنشأة",
  },
  {
    title: "تحميل المستندات",
  },
];

const AddFacilityPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOpen(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const { mutate: addFacility, isPending: loadingAddFacility } = useMutate({
    mutationKey: [`add_facilities`],
    endpoint: `facilities`,
    onSuccess: () => {
      notify("success");
      navigate("/dashboard/facilities");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  const initialValues = {
    name: "",
    registration_number: "",
    version_date: new Date(),
    version_date_hj: "",
    end_date: new Date(),
    end_date_hj: "",
    registration_source: "",
    license: "",
    license_expired: new Date(),
    license_expired_hj: "",
    address: "",
    tax_certificate: "",
    employee_number: "",
    chefs_number: "",
    kitchen_space: "",
    street_name: "",
    neighborhood: "",
    city: "",
    building_number: "",
    postal_code: "",
    sub_number: "",
    signature: "",
  };
  const validationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("the facility name is required")),
      registration_number: Yup.string()
        .trim()
        .required(t("the registration number required"))
        .length(10, t("the registration number must be equal 10 digits")),
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
      license: Yup.string()
        .trim()
        .required(t("the license number required"))
        .length(10, t("the license number must be equal 10 digits")),
      address: Yup.string().trim().required(t("address is  required")),
      tax_certificate: Yup.string()
        .trim()
        .required(t("tax certificate is required")),
      // .length(9, t("the tax certificate number must be equal 9 digits")),
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
      // .length(4, t("the building number number must be equal 4 digits")),

      postal_code: Yup.string().trim().required(t("postal code required")),
      // .length(4, t("the building number number must be equal 4 digits")),
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
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>

        <Card
          sx={{
            mt: 4,
            boxShadow: "0 4px 24px -1px #0000001A",
            height: "calc(100vh - 280px)",
          }}
          className="!overflow-y-scroll scroll_main  px-3 py-2  rounded-xl scroll_main m-3 bg-transparent"
        >
          <CardContent className="h-full pt-0">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                addFacility({
                  ...values,
                });
              }}
            >
              {({ errors, values }) => (
                <>
                  <Form className="h-full">
                    <div
                      spacing={5}
                      className="flex flex-col justify-between h-full "
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
                        mt={10}
                        className="fixed bottom-[12px] left-[35px]"
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
                            Object.keys(errors).length > 0
                              ? () =>
                                  notify("warning", t("please complete field"))
                              : handleNext
                          }
                          type="button"
                          className={"!w-auto text-xl px-10 py-3 "}
                          variant="contained"
                          disabled={
                            values.name == "" || Object.keys(errors).length
                          }
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
                                    className="pt-0 pb-0"
                                  />
                                }
                                label={t(
                                  "I have read all terms and conditions"
                                )}
                              />
                            </RadioGroup>
                          </FormControl>
                          <ButtonComp
                            type={"submit"}
                            action={() => {
                              const validAttachments = values?.attachments
                                .map((file, index) => ({ index, file }))
                                .filter(
                                  (item) => typeof item.file !== "undefined"
                                );
                              const attachments = validAttachments.map(
                                (item) => ({
                                  [`attachments[${item?.index}]`]: item?.file,
                                })
                              );

                              const combinedObject = {
                                ...values,
                                ...Object.assign({}, ...attachments),
                              };
                              delete combinedObject.attachments;
                              addFacility(combinedObject);
                            }}
                            loading={loadingAddFacility}
                            className={"w-auto mt-1"}
                            disabled={!checked}
                            variant="contained"
                          >
                            {t("Save")}
                          </ButtonComp>
                        </div>
                      }
                    />
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddFacilityPage;
