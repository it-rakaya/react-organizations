import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isValidSaudiID } from "saudi-id-validator";
import * as Yup from "yup";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import { useMutate } from "../../hooks/useMutate";
import { isEmail } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import ModalComp from "../atoms/ModalComp";
import TermsAndCondition from "../molecules/TermsAndCondition";
import RegistrationMainData from "./RegistrationMainData";

export default function RegisterForm() {
  const { login } = useAuth();
  const { orgData } = UseOrg();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const { mutate: sendRegister, isPending } = useMutate({
    endpoint: `register`,
    mutationKey: [`register`],
    onSuccess: (data) => {
      notify("success");
      login(data.data);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const { data: attachments_register } = useFetch({
    endpoint: `attachments-labels/users`,
    queryKey: ["attachments_register"],
  });

  const ValidationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("name is required")),
      national_id: Yup.string()
        .matches(/^\d{10}$/, t("The ID number must be exactly 10 digits"))
        .test({
          name: "isValidSaudiID",
          test: (value) => isValidSaudiID(value),
          message: t("Please enter a valid ID number"),
        })
        .required(t("This field is required")),
      email: Yup.string()
        .required(t("email is required"))
        .matches(isEmail, t("Please enter a valid email address")),
      birthday: Yup.date().required(t("birthday is required")),
      phone: Yup.string()
        .matches(/^\d{9}$/, t("The phone number must be exactly 10 digits"))
        .required(t("This field is required")),
      nationality: Yup.string().trim().required(t("country is required")),
      national_source: Yup.string()
        .trim()
        .required(t("national source is required")),

      national_id_expired: Yup.string()
        .trim()
        .required(t("national ID is required")),
    });
  const initialValues = {
    name: "",
    national_id: "",
    email: "",
    phone: "",
    birthday: "",
    nationality: "",
    national_id_expired: "",
    national_source: "",
    attachments: [],
    organization_id: orgData?.organizations?.id,
  };
  const handleSubmit = (values) => {
    const validAttachments = values.attachments
      .map((file, index) => ({ index, file }))
      .filter((item) => typeof item.file !== "undefined" && item.file !== "deleted")
    const attachments = validAttachments.map((item) => ({
      [`attachments[${item?.index}]`]: item?.file,
    }));

    const combinedObject = {
      ...values,
      ...Object.assign({}, ...attachments),
    };
    delete combinedObject.attachments;
    sendRegister(combinedObject);
  };

  return (
    <div>
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={ValidationSchema}
        initialValues={initialValues}
      >
        <Form>
          <RegistrationMainData
            attachments_register={attachments_register}
            isPending={isPending}
            setOpen={setOpen}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{ mx: 2, color: "text.secondary" }}
              className="text-black dark:text-white"
            >
              {t("Already have an account?")}
            </Typography>
            <Link
              to="/login"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                mx: 2,
              }}
              className=" dark:text-white"
            >
              {t("Login")}
            </Link>
          </Box>
        </Form>
      </Formik>
      <ModalComp
        open={open}
        className="!max-w-[500px] !block  "
        onClose={() => setOpen(false)}
        Children={
          <>
            <TermsAndCondition
              hidden={true}
              style={{ height: "calc(100vh - 20rem)" }}
            />
          </>
        }
      />
    </div>
  );
}
