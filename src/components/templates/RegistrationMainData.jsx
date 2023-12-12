import useFetch from "../../hooks/useFetch";
import BaseInputField from "../molecules/Formik/BaseInputField";
import DatePickerComp from "../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../molecules/Formik/PhoneInput2";
import SelectCountry from "../molecules/SelectCountry";
import UploadImage from "../molecules/UploadImage";

function RegistrationMainData() {
  const { data: attachments_register } = useFetch({
    endpoint: `attachments-labels/users`,
    queryKey: ["attachments_register"],

  });

  return (
    <div>
      <BaseInputField
        label="الاسم الكامل "
        placeholder="محمد احمد محمد"
        name="name"
      />
      <BaseInputField
        label=" رقم الهوية "
        placeholder="10********"
        name="national_id"
        type="number"
        maxNum={10}
      />
      <PhoneInput2 name="phone" label="رقم الهاتف" />
      <BaseInputField
        label="البريد الإلكتروني"
        placeholder="Example@example.com"
        name="email"
      />

      <SelectCountry label={"الدوله"} name={"nationality"} />
      <DatePickerComp name="birthday" label={"تاريخ  الميلاد"} />

      <DatePickerComp
        name="national_id_expired"
        name_hj="national_id_expired_hj"
        label={"تاريخ انتهاء الاقامه"}
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
