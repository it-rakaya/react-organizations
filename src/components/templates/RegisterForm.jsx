import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import RegistrationMainData from "./RegistrationMainData";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import ModalComp from "../atoms/ModalComp";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";
import { isValidSaudiID } from "saudi-id-validator";

export default function RegisterForm() {
  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));
  const { login } = useAuth();
  const [checked, setChecked] = useState(false);
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
      birthday: Yup.string().trim().required(t("birthday is required")),
      phone: Yup.string()
        .matches(/^\d{9}$/, t("The phone number must be exactly 10 digits"))
        .required(t("This field is required")),
      nationality: Yup.string().trim().required(t("country is required")),
      national_id_expired: Yup.string()
        .trim()
        .required(t("birthday is required")),
    });
  const initialValues = {
    name: "",
    national_id: "",
    email: "",
    phone: "",
    birthday: Date(),
    nationality: "",
    national_id_expired: Date(),
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
          <RegistrationMainData />

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            sx={{
              mb: 4,
              mt: 1.5,
              "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
            }}
            label={
              <div>
                <Typography variant="body2" component="span">
                  {t("I agree to ")}
                </Typography>
                <LinkStyled
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  {t("Terms & condition ")}
                </LinkStyled>
              </div>
            }
          />
          <ButtonComp
            type={"submit"}
            loading={isPending}
            disabled={!checked}
            className={"!mt-0"}
          >
            {t("Sign up")}
          </ButtonComp>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Typography sx={{ mr: 2, color: "text.secondary" }}>
              {t("Already have an account?")}
            </Typography>
            <Link
              to="/login"
              sx={{ color: "primary.main", textDecoration: "none" }}
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
            <div className="relative mt-10 ">
              <div className="flex flex-col items-center justify-center gap-2 mb-3 ">
                <TermsConditionIcon />
                <h2> {t("Terms & condition ")}</h2>
              </div>
            </div>
            <div
              className="main_content max-h-[450px] overflow-y-scroll scroll_main"
              dangerouslySetInnerHTML={{
                __html: orgData?.organizations?.policies,
              }}
            ></div>
          </>
        }
      />
    </div>
  );
}
