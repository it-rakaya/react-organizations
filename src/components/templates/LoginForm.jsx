import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import CheckCode from "../organisms/checkCode";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

export default function LoginForm() {
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [valuesForm, setValuesForm] = useState("");
  const { login } = useAuth();
  const [dataValue, setDataValue] = useState();
  const [valueOTP, setValueOTP] = useState();
  console.log("🚀 ~ file: LoginForm.jsx:20 ~ LoginForm ~ valueOTP:", valueOTP);
  const { orgData } = UseOrg();
  console.log("🚀 ~ file: LoginForm.jsx:22 ~ LoginForm ~ orgData:", orgData)

  const { mutate: LoginData, isPending: loadingLogin } = useMutate({
    mutationKey: [`login_data`],
    formData: true,
    endpoint: `login`,
    onSuccess: (data) => {
      login(data.data);
      // setToken(data?.data)
      notify("success", `مربحا بك يا ${data?.data?.user.name}`);
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
  });

  const { mutate: sendOTP, isPending } = useMutate({
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
      phone: Yup.string().trim().required(t("phone is required")),
    });
  return (
    <div className="w-full">
      <Formik
        onSubmit={(values) => {
          console.log(
            "values:sssssssssssssssssssssssssssssssssssssssss",
            { ...values, organization_id: orgData?.organizations?.id }
          );
          setValuesForm(values);

          !verifyPhone
            ? sendOTP({ ...values, organization_id: orgData?.organizations?.id })
            : LoginData({
                ...values,
                otp: valueOTP,
                organization_id: orgData?.organizations?.id,
              });
        }}
        initialValues={{ phone: "", phone_code: "", otp: "" }}
        validationSchema={ValidationSchema}
      >
        <Form>
          {!verifyPhone && (
            <>
              <PhoneInput2 name="phone" />
            </>
          )}
          {verifyPhone && (
            <CheckCode
              number={dataValue?.value}
              valuesForm={valuesForm}
              setValueOTP={setValueOTP}
              sendOTP={sendOTP}
            />
          )}

          <ButtonComp loading={loadingLogin || isPending}>
            {t("LOGIN")}
          </ButtonComp>
        </Form>
      </Formik>
    </div>
  );
}
