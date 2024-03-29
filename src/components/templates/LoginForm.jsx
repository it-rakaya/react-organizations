/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import CheckCode from "../organisms/checkCode";

export default function LoginForm({ setHideSection }) {
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [valuesForm, setValuesForm] = useState("");
  const { login } = useAuth();
  const [dataValue, setDataValue] = useState();
  const [valueOTP, setValueOTP] = useState();
  const { orgData } = UseOrg();

  const { mutate: LoginData, isPending: loadingLogin } = useMutate({
    mutationKey: [`login_data`],
    formData: true,
    endpoint: "login/providor",
    onSuccess: (data) => {
      login(data.data);
      notify("success", ` ${t("Welcome")} ${data?.data?.user.name}`);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });

  const {
    mutate: sendOTP,
    isPending,
    uploadProgress,
  } = useMutate({
    mutationKey: [`send-otp`],
    endpoint: `send-otp`,
    onSuccess: (data) => {
      notify("success", data?.data?.message);
      setDataValue(data?.data?.verification);
      setVerifyPhone(true);
      setHideSection(true);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });

  const ValidationSchema = () =>
    Yup.object({
      phone: Yup.string().trim().required(t("phone is required")),
    });
  const handleSubmit = (values) => {
    setValuesForm(values);

    !verifyPhone
      ? sendOTP({
          ...values,
          organization_id: orgData?.organizations?.id,
        })
      : LoginData({
          ...values,
          otp: valueOTP,
          organization_id: orgData?.organizations?.id,
        });
  };
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <Formik
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{ phone: "", phone_code: "", otp: "" }}
          validationSchema={ValidationSchema}
        >
          {(formik) => (
            <Form
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.isDefaultPrevented()) {
                  e.preventDefault();
                  formik.handleSubmit();
                }
              }}
            >
              {!verifyPhone && <PhoneInput2 name="phone" />}
              {verifyPhone && (
                <CheckCode
                  number={dataValue?.value}
                  valuesForm={valuesForm}
                  setValueOTP={setValueOTP}
                  sendOTP={sendOTP}
                  login={true}
                  LoginData={LoginData}
                />
              )}
              <div className="bg-transparent rounded-xl">
                <ButtonComp
                  type="submit"
                  loading={loadingLogin || isPending}
                  disabled={valueOTP && valueOTP?.length != 4 ? true : false}
                  className={"ltr:!mt-5 "}
                  status={uploadProgress}
                >
                  {t("Login")}
                </ButtonComp>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
