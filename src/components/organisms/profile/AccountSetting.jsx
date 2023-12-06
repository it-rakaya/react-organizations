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

export default function AccountSetting({ userData, refetch , setEditUser }) {
  console.log("🚀 ~ file: AccountSetting.jsx:15 ~ AccountSetting ~ userData:", userData)
  const initialValue = {
    name: userData?.user?.name,
    national_id: userData?.user?.national_id,
    phone: userData?.user?.phone,
    phone_code: userData?.user?.phone_code,
    email: userData?.user?.email,
    nationality: userData?.user?.nationality,
    birthday: userData?.user?.birthday,
    photo: userData?.user?.photo,
    national_id_expired: userData?.user?.national_id_expired,
    favourit_organizations: userData?.user?.favourit_organizations,
  };

  const { mutate: UpdateUser, isPending } = useMutate({
    mutationKey: [`users_update`],
    endpoint: `users/update`,
    onSuccess: () => {
      notify("success", "تم التعديل بنجاح");
      setEditUser(false)
      refetch()
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });
  console.log("🚀 ~ file: AccountSetting.jsx:41 ~ AccountSetting ~ isPending:", isPending)

  return (
    <div >
      <MainHeader title={`  تعديل البيانات `} />
      <Formik
        initialValues={initialValue}
        onSubmit={(value) => UpdateUser(value)}
      >
        <Form>
          <div className="grid items-center grid-cols-2 gap-2 !overflow-y-scroll !shadow-none h-[27rem]  scroll_main m-3 p-5">
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
              <label> رقم الهاتف </label>
              <PhoneInput2 name="phone" />
            </div>
            <div>
              <BaseInputField
                label="البريد الإلكتروني"
                placeholder="Example@example.com"
                name="email"
              />
            </div>
            <div>
              <SelectCountry label={"الدوله"} name={"nationality"} />
            </div>
            <div className="flex flex-col col-span-1 gap-3 my-3">
              <DatePickerComp name="birthday" label={"تاريخ  الميلاد"} />
            </div>
      
            {/* <div>
              <UploadImage name="photo" />
            </div> */}

            <div className="flex flex-col col-span-1 gap-3 my-3">
              <DatePickerComp
                name="national_id_expired"
                label={"تاريخ انتهاء الاقامه"}
              />
            </div>
            {/* <div>
              <SelectOrganizations name={"favourit_organizations"} />
            </div> */}
            <div className="flex justify-end col-span-2">
              <ButtonComp className="w-auto" loading={isPending } action={()=>refetch}>تعديل</ButtonComp>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
