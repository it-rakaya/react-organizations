/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import MainHeader from "../../atoms/MainHeader";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../../molecules/Formik/PhoneInput2";
import SelectCountry from "../../molecules/SelectCountry";
import UploadImage from "../../molecules/uploadImage/UploadImage";

export default function AccountSetting({ userData, setEditUser, setUser }) {
  console.log("🚀 ~ file: AccountSetting.jsx:14 ~ AccountSetting ~ userData:", userData)
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
    favourit_organizations: userData?.favourit_organizations,
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

  return (
    <div>
      <MainHeader title={`  تعديل البيانات `} />
      <Formik
        initialValues={initialValue}
        onSubmit={(value) => UpdateUser(value)}
      >
        <Form>
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
              <DatePickerComp name="birthday" label={"تاريخ  الميلاد"} />
            </div>

            <div className="flex flex-col col-span-2 gap-3 ">
              <DatePickerComp
                name="national_id_expired"
                
                label={"تاريخ انتهاء الاقامه"}
              />
            </div>
            <div>
              {userData?.attachments?.map((item) => (
                <UploadImage
                  key={item.id}
                  name={`attachments[${item?.id}]`}
                  label={item?.attachment_label?.placeholder}
                  placeholder={item?.attachment_label?.placeholder}
                />
              ))}
            </div>

            <div className="flex justify-end col-span-2">
              <ButtonComp className="w-auto" loading={isPending}>
                تعديل
              </ButtonComp>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
