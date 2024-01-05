/* eslint-disable react/prop-types */
import { t } from "i18next";
import BaseInputField from "../molecules/Formik/BaseInputField";
import DatePickerComp from "../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import SelectCountry from "../molecules/SelectCountry";
import UploadImage from "../molecules/uploadImage/UploadImage";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import SelectCitiesSaudi from "../molecules/SelectCitiesSaudi";

function RegistrationMainData({ attachments_register }) {
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    if (values.national_id.startsWith("1")) {
      setFieldValue("nationality", "192");
    } else {
      setFieldValue("nationality", "");
    }
  }, [values.national_id, setFieldValue]);
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
    </div>
  );
}

export default RegistrationMainData;
