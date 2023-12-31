/* eslint-disable react/prop-types */
import { t } from "i18next";
import BaseInputField from "../molecules/Formik/BaseInputField";
import DatePickerComp from "../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import SelectCountry from "../molecules/SelectCountry";
import UploadImage from "../molecules/uploadImage/UploadImage";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import SelectCitiesSaudi from "../molecules/SelectCitiesSaudi";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import ButtonComp from "../atoms/buttons/ButtonComp";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

function RegistrationMainData({ attachments_register, setOpen, isPending }) {
  const { setFieldValue, values, errors } = useFormikContext();
  console.log(
    "🚀 ~ file: RegistrationMainData.jsx:18 ~ RegistrationMainData ~ values:",
    values
  );
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
  console.log(
    "🚀 ~ file: RegistrationMainData.jsx:60 ~ isValid ~ isValid:",
    isValid
  );

  return (
    <div>
      <BaseInputField
        label={t("registration.nameLabel")}
        placeholder={t("registration.namePleaceholder")}
        name="name"
        required
      />
      <BaseInputField
        label={t("registration.IDNumberLabel")}
        placeholder="********10"
        name="national_id"
        type="custom"
        maxNum={10}
        required
      />
      <PhoneInput2 name="phone" label={t("registration.phoneLabel")} required />
      <BaseInputField
        label={t("registration.emailLabel")}
        placeholder="Example@example.com"
        name="email"
        required
      />

      <SelectCountry
        label={t("registration.countryLabel")}
        name={"nationality"}
        required
      />
      <SelectCitiesSaudi
        label={t("registration.nationalSource")}
        name={"national_source"}
        required
      />
      <DatePickerComp
        name="birthday"
        label={t("registration.birthdayDateLabel")}
        required
      />
      <DatePickerComp
        name="national_id_expired"
        name_hj="national_id_expired_hj"
        label={t("registration.IDDateLabel")}
        required
      />
      <div>
        {attachments_register?.attachment_labels?.map((item) => (
          <UploadImage
            key={item.id}
            name={`attachments[${item?.id}]`}
            label={item?.placeholder}
            // id={item?.id}
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
