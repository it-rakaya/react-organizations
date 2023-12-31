/* eslint-disable react/prop-types */
import { Card, CardContent } from "@mui/material";
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import MainContent from "./MainContent";

function FacilityContent({
  activeStep,
  steps,
  checked,
  setChecked,
  setActiveStep,
}) {
  const initialFormValues = 
    {
      name: "",
      registration_number: "",
      version_date: '',
      version_date_hj: "",
      end_date: '',
      end_date_hj: "",
      registration_source: "",
      license: "",
      license_expired: '',
      license_expired_hj: "",
      address: "",
      tax_certificate: "",
      employee_number: "",
      chefs_number: "",
      kitchen_space: "",
      street_name: "",
      district_id: "",
      city: "",
      building_number: "",
      postal_code: "",
      sub_number: "",
      signature: "",
      capacity: "",
    }


  const validationSchema = (step) => {
    switch (step) {
      case 0:
        return Yup.object({
          name: Yup.string()
            .trim()
            .required(t("the facility name is required")),
          registration_number: Yup.string()
            .trim()
            .required(t("the registration number required"))
            .length(10, t("the registration number must be equal 10 digits")),
          version_date: Yup.string()
            .trim()
            .required(t("the version date required")),
          end_date: Yup.string().trim().required(t("the  end date required")),
          license_expired: Yup.string()
            .trim()
            .required(t("the  license expired required")),
          registration_source: Yup.string()
            .trim()
            .required(t("the registration source required")),
          capacity: Yup.string()
            .trim()
            .required(t("the capacity number required"))
            .length(5, t("the capacity must be equal 5 digits")),

          license: Yup.string()
            .trim()
            .required(t("the license number required"))
            .length(10, t("the license number must be equal 10 digits")),
          // address: Yup.string().trim().required(t("address is  required")),
          tax_certificate: Yup.string()
            .trim()
            .required(t("tax certificate is required"))
            .length(9, t("the tax certificate number must be equal 9 digits")),
        });
      case 1:
        return Yup.object({
          street_name: Yup.string()
            .trim()
            .required(t("the street name required")),
          neighborhood: Yup.string()
            .trim()
            .required(t("the neighborhood required")),
          building_number: Yup.string()
            .trim()
            .required(t("tax building number is required"))
            .length(4, t("the tax building number must be equal 4 digits")),
          postal_code: Yup.string()
            .trim()
            .required(t("tax postal code is required"))
            .length(6, t("the tax postal code must be equal 6 digits")),
          sub_number: Yup.string()
            .trim()
            .required(t("tax sub number is required"))
            .length(6, t("the tax sub number must be equal 6 digits")),
        });
      case 2:
        return Yup.object({
          employee_number: Yup.string()
            .trim()
            .required(t("employee number is required")),
          chefs_number: Yup.string()
            .trim()
            .required(t("chefs number is required")),
          kitchen_space: Yup.string()
            .trim()
            .required(t("kitchen space required")),
        });
      default:
        return Yup.object({});
    }
  };

  return (
    <Card
      sx={{
        mt: 4,
        height: "calc(100vh - 280px)",
        overflowY: "scroll",
      }}
      className="bg-transparent shadow-none scroll_main"
    >
      <CardContent className="h-full pt-0 bg-transparent">
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema(activeStep)}
          onSubmit={() => {}}
        >
          {() => (
            <>
              <Form className="h-full">
                <MainContent
                  activeStep={activeStep}
                  steps={steps}
                  checked={checked}
                  setChecked={setChecked}
                  setActiveStep={setActiveStep}
                  // setFormValues={setFormValues}
                />
              </Form>
            </>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default FacilityContent;
