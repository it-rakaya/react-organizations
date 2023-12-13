/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import CheckCode from "../organisms/checkCode";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

export default function VerifyUser({ userData, dataValue, setOpen , sendOTP }) {
  const [valuesForm, setValuesForm] = useState("");
  const { setUser } = useAuth();
  const [valueOTP , setValueOTP] = useState('')
  const { orgData } = UseOrg();

  const { mutate: verify_user, isLoading: loadingVerify } = useMutate({
    mutationKey: [`verify_user`],
    endpoint: `verify`,
    onSuccess: (data) => {
      setUser(data?.data?.user);
      notify("success" , t('Activation completed successfully'));
      setOpen(false);
    },

    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          setValuesForm(values);
          verify_user({
            phone: userData?.phone,
            phone_code: userData?.phone_code,
            otp: valueOTP,
            organization_id: orgData?.organizations?.id,
          });
        }}
        initialValues={{ phone: "", phone_code: "", otp: "" }}
      >
        <Form>
          <div className="flex flex-col w-1/2 m-auto text-center ">
            <CheckCode number={dataValue?.value} valuesForm={valuesForm} setValueOTP={setValueOTP}  sendOTP={sendOTP} />
            <ButtonComp
              loading={!!loadingVerify}
              type="submit"
              variant="contained"
            >
              {t("تفعيل")}
            </ButtonComp>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
