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
  const initialFormValues = {
    name: "",
    registration_number: "",
    version_date: "",
    version_date_hj: "",
    end_date: "",
    end_date_hj: "",
    registration_source: "",
    license: "",
    license_expired: "",
    license_expired_hj: "",
    address: "",
    tax_certificate: "",
    employee_number: "",
    chefs_number: "",
    kitchen_space: "",
    street_name: "",
    district_id: "",
    building_number: "",
    postal_code: "",
    sub_number: "",
    capacity: "",
    account_name:"",
    iban:"",
    bank_id:""
    
  };

  const validationSchema = (step) => {
    switch (step) {
      case 0:
        return Yup.object({
          name: Yup.string()
            .trim()
            .required(t("the facility name is required")),
          registration_number: Yup.string()
            .trim()
            .required(t("the Commercial Registration Number required"))
            .length(10, t("the registration number must be equal 10 digits")),
          version_date: Yup.string()
            .trim()
            .required(t("the version date required")),
          end_date: Yup.string().trim().required(t("the  end date required")),
          license_expired: Yup.string()
            .trim()
            .required(t("the  licence expired required")),
          registration_source: Yup.string()
            .trim()
            .required(t("the registration source required")),
          capacity: Yup.string()
            .trim()
            .required(t("the capacity number required"))
            .min(1, t("the capacity must be from 1 to 5 numbers"))
            .max(5, t("the capacity must be from 1 to 5 numbers")),

            license: Yup.string()
            .trim()
            .required(t("the Licence number required"))
            .min(10, t("the Licence number must be between 10 and 11 digits"))
            .max(11, t("the Licence number must be between 10 and 11 digits")),
          // address: Yup.string().trim().required(t("address is  required")),
          tax_certificate: Yup.string()
            .trim()
            .required(t("Vat Registration Number is required"))
            .length(15, t("the Vat Registration Number must be equal 15 digits")),
            account_name: Yup.string()
            .trim()
            .required(t("the account name required")),
            iban: Yup.string()
            .trim()
            .required(t("this field is required"))
            .length(29, t("the IBAN number must be equal 24 digits")),
        });
      case 1:
        return Yup.object({
          street_name: Yup.string()
            .trim()
            .required(t("the street name required")),
            district_id: Yup.string()
            .trim()
            .required(t("the street name required")),
          building_number: Yup.string()
            .trim()
            .required(t("Building Number is required"))
            .length(4, t("the Building Number must be equal 4 digits")),
          postal_code: Yup.string()
            .trim()
            .required(t("postal code is required"))
            .length(5, t("the postal code must be equal 5 digits")),
          sub_number: Yup.string()
            .trim()
            .required(t("Secondary Number is required"))
            .length(4, t("the Secondary Number must be equal 4 digits")),
        });
      case 2:
        return Yup.object({
          employee_number: Yup.string()
            .trim()
            .required(t("Number Of Employees is required")),
          chefs_number: Yup.string()
            .trim()
            .required(t("Chefs Number is required")),
          kitchen_space: Yup.string()
            .trim()
            .required(t("Kitchen Space required")),
          
        });
      default:
        return Yup.object({});
    }
  };

  return (
    <Card
      sx={{
        mt: 4,
        height: {  md: "calc(100vh - 282px)" },
        overflowY: "scroll",
      }}
      className="!bg-transparent !shadow-none scroll_main"
    >
      <CardContent className="h-full !px-0 pt-0 bg-transparent  ">
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
