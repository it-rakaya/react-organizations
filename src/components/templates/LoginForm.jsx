import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { useUser } from "../../context/user provider/UserContext";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import CheckCode from "../organisms/checkCode";
import { useOrg } from "../../context/organization provider/OrganizationProvider";

export default function LoginForm() {
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [valuesForm, setValuesForm] = useState("");
  const { login } = useAuth();
  const [dataValue, setDataValue] = useState();
  const [valueOTP , setValueOTP] = useState()
  const { refetch  } = useUser();
  const { orgData  } = useOrg();
  console.log("🚀 ~ file: LoginForm.jsx:23 ~ LoginForm ~ orgData:", orgData)



  const { mutate: LoginData, isPending: loadingLogin } = useMutate({
    mutationKey: [`login_data`],
    formData: true,
    endpoint: `login`,
    onSuccess: (data) => {
      login(data.data);
      // setToken(data?.data)
      refetch()
      notify("success", `مربحا بك يا ${data?.data?.user.name}`);

    },

    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
  });

  const { mutate: sendOTP  } = useMutate({
    mutationKey: [`send-otp`],
    endpoint: `send-otp`,
    onSuccess: (data) => {
      notify("success", "التحقق من الهاتف ");
      setDataValue(data?.data?.verification);
      setVerifyPhone(true);
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
  });

  const ValidationSchema = () =>
    Yup.object({
      phone:  Yup.string().trim().required(t("phone is required"))
    });
  return (
    <div>
      <Formik
        onSubmit={(values) => {
          console.log("xxx:", values);
          setValuesForm(values);

          !verifyPhone
            ? sendOTP({ ...values, organization_id: "1" })
            : LoginData({
                ...values,
                otp: valueOTP,
                organization_id: "1",
              });
        }}
        initialValues={{ phone: "", phone_code: "", otp: "" }}
        validationSchema={ValidationSchema}
      >
        <Form>
          {!verifyPhone && (
            <>
              <PhoneInput2 name="phone" />
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {/* <FormControlLabel
                  label={`${t("Remember Me")}`}
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                /> */}
                {/* <Typography
                  variant="body2"
                  component={Link}
                  href="/forgot-password"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {t("Forgot Password ?")}
                </Typography> */}
              </Box>
            </>
          )}
          {verifyPhone && (
            <CheckCode number={dataValue?.value} valuesForm={valuesForm}  setValueOTP={setValueOTP}/>
          )}

          <ButtonComp loading={loadingLogin}>{t("LOGIN")}</ButtonComp>
        </Form>
      </Formik>
    </div>
  );
}
