/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import ButtonComp from "../atoms/buttons/ButtonComp";
import CheckCode from "../organisms/checkCode";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";

export default function VerifyUser({ userData, dataValue, setOpen }) {
  const [valuesForm, setValuesForm] = useState("");
  const { setUser } = useAuth();

  const { mutate: verify_user, isLoading: loadingVerify } = useMutate({
    mutationKey: [`verify_user`],
    endpoint: `verify`,
    onSuccess: (data) => {
      setUser(data?.data);
      notify("success");
      setOpen(false);
    },

    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
  });

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          console.log("xxx:", values);
          setValuesForm(values);
          verify_user({
            phone: userData?.user?.phone,
            phone_code: userData?.user?.phone_code,
            otp: dataValue?.value,
            organization_id: "1",
          });
        }}
        initialValues={{ phone: "", phone_code: "", otp: "" }}
      >
        <Form>
          <div className="flex flex-col w-1/2 m-auto text-center gap-y-5">
            <CheckCode number={dataValue?.value} valuesForm={valuesForm} />
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
