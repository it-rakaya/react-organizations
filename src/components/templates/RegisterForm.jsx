import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { notify } from "../../utils/toast";
import ModalComp from "../atoms/ModalComp";
import TermsAndCondition from "../molecules/TermsAndCondition";
import RegistrationMainData from "./RegistrationMainData";

export default function RegisterForm() {
  const { login } = useAuth();
  const { orgData } = UseOrg();
  const [open, setOpen] = useState(false);

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
          message: t("Invalid Saudi ID"),
        })
        .required(t("This field is required")),
      email: Yup.string().trim().required(t("email is required")),
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
        .required(t("birthday is required")),
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

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          const validAttachments = values.attachments
            .map((file, index) => ({ index, file }))
            .filter((item) => typeof item.file !== "undefined");
          const attachments = validAttachments.map((item) => ({
            [`attachments[${item?.index}]`]: item?.file,
          }));

          const combinedObject = {
            ...values,
            ...Object.assign({}, ...attachments),
          };
          delete combinedObject.attachments;
          sendRegister(combinedObject);
        }}
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
              sx={{ mr: 2, color: "text.secondary" }}
              className=" dark:text-white"
            >
              {t("Already have an account?")}
            </Typography>
            <Link
              to="/login"
              sx={{ color: "primary.main", textDecoration: "none" }}
              className=" dark:text-white"
            >
              {t("Sign in instead")}
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
            <TermsAndCondition hidden={true} />
          </>
        }
      />
    </div>
  );
}
