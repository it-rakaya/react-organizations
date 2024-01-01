/* eslint-disable react/prop-types */
import BaseInputField from "../../molecules/Formik/BaseInputField";
import PhoneInput2 from "../../molecules/Formik/PhoneInput2";
import SelectCountry from "../../molecules/SelectCountry";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import UploadImage from "../../molecules/uploadImage/UploadImage";

function AccountSettingMainData({ userData }) {
  return (
    <div className="grid items-start grid-cols-2 gap-2 !overflow-y-scroll !shadow-none h-[27rem]  scroll_main m-3 p-5">
      <div>
        <BaseInputField
          label="الاسم الكامل "
          placeholder="محمد احمد محمد"
          name="name"
        />
      </div>
      <div>
        <BaseInputField
          label=" رقم الهوية "
          placeholder="10********"
          name="national_id"
        />
      </div>
      <div>
        <PhoneInput2 name="phone" label={"رقم الهاتف"} />
      </div>
      <div>
        <BaseInputField
          label="البريد الإلكتروني"
          placeholder="Example@example.com"
          name="email"
        />
      </div>
      <div>
        <SelectCountry label={"الدولة"} name={"nationality"} />
      </div>
      <div className="flex flex-col col-span-1 gap-3 ">
        <DatePickerComp
          name="birthday"
          label={"تاريخ  الميلاد"}
          name_hj="birthday_hj"
        />
      </div>

      <div className="flex flex-col col-span-2 gap-3 ">
        <DatePickerComp
          name="national_id_expired"
          label={"تاريخ انتهاء الاقامه"}
          name_hj="national_id_expired_hj"
        />
      </div>
      {userData?.attachmentUrl?.map((item) => (
        <div className="flex flex-col col-span-1 gap-3 " key={item.id}>
          <UploadImage
            name={`attachments[${item?.attachment_id}]`}
            label={item?.attachment_label?.placeholder}
            placeholder={item?.attachment_label?.placeholder}
            nameValue={item?.attachment_id}
          />
        </div>
      ))}
      
    </div>
  );
}

export default AccountSettingMainData;
