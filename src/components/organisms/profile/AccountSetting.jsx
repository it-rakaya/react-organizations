/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { useMutate } from "../../../hooks/useMutate";
import { convertToHijri } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import MainHeader from "../../atoms/MainHeader";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import AccountSettingMainData from "./AccountSettingMainData";
import { t } from "i18next";

export default function AccountSetting({ userData, setEditUser, setUser }) {
  const initialValue = {
    name: userData?.name,
    national_id: userData?.national_id,
    phone: userData?.phone,
    phone_code: userData?.phone_code,
    email: userData?.email,
    nationality: userData?.nationality,
    birthday: userData?.birthday,
    photo: userData?.photo,
    national_id_expired: userData?.national_id_expired,
    national_id_expired_hj: convertToHijri(
      userData?.national_id_expired !== "0000-00-00" ? userData?.national_id_expired : "0"
    ),
    favourit_organizations: userData?.favourit_organizations,
    birthday_hj: convertToHijri(userData?.birthday),
  };

  const { mutate: UpdateUser, isPending } = useMutate({
    mutationKey: [`users_update`],
    endpoint: `users/update`,
    onSuccess: (data) => {
      notify("success", "تم التعديل بنجاح");
      setEditUser(false);
      setUser(data?.data?.user);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });
  const theme = useTheme();

  return (
    <div>
      <MainHeader
        title={`  تعديل البيانات `}
        styleHead={{ color: theme.palette.primary.main }}
      />
      <Formik
        initialValues={initialValue}
        onSubmit={(value) => UpdateUser(value)}
      >
        <Form>
          <AccountSettingMainData userData={userData} />
          <div className="flex justify-end col-span-2 px-8">
            <ButtonComp className="!w-auto" loading={isPending}>
              {t("Edit")}
            </ButtonComp>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
