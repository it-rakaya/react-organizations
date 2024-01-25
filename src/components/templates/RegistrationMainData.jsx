/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonComp from "../atoms/buttons/ButtonComp";
import BaseInputField from "../molecules/Formik/BaseInputField";
import DatePickerComp from "../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import SelectCitiesSaudi from "../molecules/SelectCitiesSaudi";
import SelectCountry from "../molecules/SelectCountry";
import UploadDoc from "../molecules/uploadImage/UploadDoc";

function RegistrationMainData({ attachments_register, setOpen, isPending }) {
  console.log(
    "🚀 ~ RegistrationMainData ~ attachments_register:",
    attachments_register
  );
  const { setFieldValue, values, errors } = useFormikContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (values.national_id.startsWith("1")) {
      setFieldValue("nationality", "192");
    } else {
      setFieldValue("nationality", "");
    }
  }, [values.national_id, setFieldValue]);
  const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  const requiredInputs =
    attachments_register?.attachment_labels
      .filter((item) => item?.is_required === "1")
      .map((item) => item?.id) || [];

  const validAttachments = values.attachments
    .map((file, index) => ({ index, file }))
    .filter((item) => typeof item.file !== "undefined");

  const attachments = validAttachments.map((item) => ({
    [`attachments[${item?.index}]`]: item?.file,
  }));

  const isValid = requiredInputs.every((id) => {
    const attachmentItem = attachments.find(
      (item) => item[`attachments[${id}]`] !== undefined
    );
    return attachmentItem && attachmentItem[`attachments[${id}]`] !== null;
  });

  return (
    <div>
      <BaseInputField
        label={t("registration.nameLabel")}
        placeholder={t("registration.namePleaceholder")}
        name="name"
        required
        showIcon
        messageInfo={t("Please enter the full name of the facility owner")}
      />
      <BaseInputField
        label={t("registration.IDNumberLabel")}
        placeholder="********10"
        name="national_id"
        type="custom"
        maxNum={10}
        required
        showIcon
        messageInfo={t("Please enter the ID number of the facility owner")}
      />
      <PhoneInput2
        name="phone"
        label={t("registration.phoneLabel")}
        required
        showIcon
        messageInfo={t("Please enter the phone number of the facility owner")}
      />
      <BaseInputField
        label={t("registration.emailLabel")}
        placeholder="Example@example.com"
        name="email"
        required
        showIcon
        messageInfo={t("Please enter the email of the facility owner")}
      />

      <SelectCountry
        label={t("registration.countryLabel")}
        name={"nationality"}
        required
        showIcon
        messageInfo={t("Please select the nationality of the facility owner")}
      />
      <SelectCitiesSaudi
        label={t("registration.nationalSource")}
        name={"national_source"}
        required
        showIcon
        messageInfo={t(
          "Please select the identity source for the facility owner"
        )}
      />
      <DatePickerComp
        name="birthday"
        name_hj="birthday_hj"
        label={t("registration.birthdayDateLabel")}
        required
        showIcon
        messageInfo={t("Please enter the date of birth of the facility owner")}
      />
      <DatePickerComp
        name="national_id_expired"
        name_hj="national_id_expired_hj"
        label={t("registration.IDDateLabel")}
        required
        showIcon
        messageInfo={t(
          "Please enter the expiry date of the facility owner's ID"
        )}
      />
      <div>
        {attachments_register?.attachment_labels
          ?.filter((item) => item.id !== 3)
          .map((item) => (
            <UploadDoc
              key={item.id}
              name={`attachments[${item?.id}]`}
              label={item?.placeholder}
              id={item?.id}
              accept={item?.extensions}
              placeholder={item?.placeholder}
              isRequired={item?.is_required == 1 ? true : false}
            />
          ))}
      </div>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        }
        sx={{
          mb: 4,
          mt: 1.5,
          "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
        }}
        label={
          <div>
            <Typography
              variant="body2"
              component="span"
              className="text-black dark:text-white"
            >
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
        disabled={
          !checked ||
          !!Object.entries(errors).length ||
          values.name == "" ||
          !isValid
        }
        className={"!mt-0"}
      >
        {t("Sign up")}
      </ButtonComp>
    </div>
  );
}

export default RegistrationMainData;
