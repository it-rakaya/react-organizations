/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { isValidSaudiID } from "saudi-id-validator";
import * as Yup from "yup";
import useFetch from "../../../hooks/useFetch";
import { useMutate } from "../../../hooks/useMutate";
import { convertToHijri } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import MainHeader from "../../atoms/MainHeader";
import AccountSettingMainData from "./AccountSettingMainData";

export default function AccountSetting({
  userData,
  setEditUser,
  setUser,
  refetch,
}) {
  const { data: attachments_register } = useFetch({
    endpoint: `attachments-labels/users`,
    queryKey: ["attachments_register"],
  });

  const AllAttachmentsId = attachments_register?.attachment_labels?.map(
    (item) => item?.id
  );

  const initialValue = {
    name: userData?.name,
    national_id: userData?.national_id,
    phone: userData?.phone,
    phone_code: userData?.phone_code,
    email: userData?.email,
    nationality: userData?.nationality,
    national_source: userData?.national_source,
    birthday: userData?.birthday,
    birthday_hj: convertToHijri(userData?.birthday),
    // photo: userData?.photo,
    national_id_expired: userData?.national_id_expired,
    national_id_expired_hj: convertToHijri(
      userData?.national_id_expired !== "0000-00-00"
        ? userData?.national_id_expired
        : "0"
    ),
    // favourit_organizations: userData?.favourit_organizations,
  };

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
  const { mutate: UpdateUser, isPending } = useMutate({
    mutationKey: [`users_update`],
    endpoint: `users/update`,
    onSuccess: (data) => {
      refetch();
      notify("success", t("Modified successfully"));
      setEditUser(false);
      setUser(data?.data?.user);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const theme = useTheme();
  const handleSubmit = (values) => {
    const validAttachments =
      values?.attachments
        ?.map((file, index) => ({ index, file }))
        .filter(
          (item) => typeof item?.file !== "undefined" && item.file !== "deleted"
        ) || [];

    const attachments =
      validAttachments?.map((item) => ({
        [`attachments[${item?.index}]`]: item?.file,
      })) || [];

    const attachmentsToDelete = values?.attachments
      ?.map((file, index) => ({ file, index }))
      ?.filter(
        (item) =>
          item.file == "deleted" && AllAttachmentsId.includes(item.index)
      )
      .map((item) => ({
        [`del_attachments[${item?.index}]`]: item.index,
      }));

    let combinedObject = {
      ...values,
      ...Object?.assign({}, ...attachments),
    };

    if (attachmentsToDelete?.length > 0) {
      combinedObject = {
        ...combinedObject,
        ...Object?.assign({}, ...attachmentsToDelete),
      };
    }

    delete combinedObject?.attachments;

    UpdateUser(combinedObject);
  };

  return (
    <div>
      <MainHeader
        title={t("Edit personal information")}
        styleHead={{ color: theme.palette.primary.main }}
      />
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={ValidationSchema}
      >
        <Form>
          <AccountSettingMainData
            userData={userData}
            isPending={isPending}
            attachments_register={attachments_register}
          />
        </Form>
      </Formik>
    </div>
  );
}
