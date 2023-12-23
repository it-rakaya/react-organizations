import useFetch from "../../hooks/useFetch";
import BaseInputField from "../molecules/Formik/BaseInputField";
import DatePickerComp from "../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import SelectCountry from "../molecules/SelectCountry";
import UploadImage from "../molecules/UploadImage";
import { t } from "i18next";


function RegistrationMainData() {
  const { data: attachments_register } = useFetch({
    endpoint: `attachments-labels/users`,
    queryKey: ["attachments_register"],
  });

  return (
    <div>
      <BaseInputField
        label={t('registration.nameLabel')}
        placeholder={t('registration.namePleaceholder')}
        name="name"
      />
      <BaseInputField
        label={t('registration.IDNumberLabel')}
        placeholder="10********"
        name="national_id"
        type="custom"
        maxNum={10}
      />
      <PhoneInput2 name="phone" label={t('registration.phoneLabel')} />
      <BaseInputField
        label={t('registration.emailLabel')}
        placeholder="Example@example.com"
        name="email"
      />

      <SelectCountry label={t('registration.countryLabel')} name={"nationality"} />
      <DatePickerComp name="birthday" label={t('registration.birthdayDateLabel')} />

      <DatePickerComp
        name="national_id_expired"
        name_hj="national_id_expired_hj"
        label={t('registration.IDDateLabel')}
      />
      {/* <FieldArray name="attachments">
        {() => ( */}
      <div>
        {attachments_register?.attachment_labels?.map((item) => (
          <UploadImage
            key={item.id}
            name={`attachments[${item?.id}]`}
            label={item?.placeholder}
            // id={item?.id}
            placeholder={item?.placeholder}
          />
        ))}
      </div>
      {/* )} */}
      {/* </FieldArray> */}
    </div>
  );
}

export default RegistrationMainData;
