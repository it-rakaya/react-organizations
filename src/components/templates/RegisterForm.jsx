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
import { useUser } from "../../context/user provider/UserContext";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import BaseInputField from "../molecules/Formik/BaseInputField";
import DatePickerComp from "../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import SelectCountry from "../molecules/SelectCountry";
import UploadImage from "../molecules/UploadImage";

export default function RegisterForm() {
  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));
  const { refetch } = useUser();
  const [checked, setChecked] = useState(false);

  const { mutate: sendRegister, isPending } = useMutate({
    endpoint: `register`,
    mutationKey: [`register`],
    onSuccess: () => {
      notify("success");
      // login(data.data);
      refetch();
    },

    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
  });
  const ValidationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("name is required")),
      national_id: Yup.string()
        .matches(/^\d{10}$/, t("The ID number must be exactly 10 digits"))
        .required("This field is required"),
      email: Yup.string().trim().required(t("email is required")),
      birthday: Yup.string().trim().required(t("birthday is required")),
      nationality: Yup.string().trim().required(t("birthday is required")),
      national_id_expired: Yup.string()
        .trim()
        .required(t("birthday is required")),
    });

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          console.log("values", { ...values });
          sendRegister({ ...values });
        }}
        validationSchema={ValidationSchema}
        initialValues={{
          name: "",
          national_id: "",
          email: "",
          birthday: Date(),
          nationality: "",
          national_id_expired: Date(),
          organization_id: "1",
        }}
      >
        <Form>
          <BaseInputField
            label="الاسم الكامل "
            placeholder="محمد احمد محمد"
            name="name"
          />
          <BaseInputField
            label=" رقم الهوية "
            placeholder="10********"
            name="national_id"
            type="number"
            maxNum={10}
          />
          <PhoneInput2 name="phone" label="رقم الهاتف" />
          <BaseInputField
            label="البريد الإلكتروني"
            placeholder="Example@example.com"
            name="email"
          />

          <SelectCountry label={"الدوله"} name={"nationality"} />
          <DatePickerComp name="birthday" label={"تاريخ  الميلاد"} />

          <DatePickerComp
            name="national_id_expired"
            label={"تاريخ انتهاء الاقامه"}
          />
          <UploadImage
            name="photo"
            label={"صورة  الهوية  الوطنية "}
            placeholder={t("Upload yor photo")}
          />

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
              <>
                <Typography variant="body2" component="span">
                  I agree to{" "}
                </Typography>
                <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
                  privacy policy & terms
                </LinkStyled>
              </>
            }
          />
          <ButtonComp type={"submit"} loading={isPending} disabled={!checked}>
            Sign up
          </ButtonComp>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop:"10px"
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
    </div>
  );
}
