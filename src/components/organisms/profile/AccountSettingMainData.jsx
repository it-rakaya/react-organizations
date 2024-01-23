/* eslint-disable react/prop-types */
import { mdiAccountBoxOutline, mdiFileDocumentOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { t } from "i18next";
import useFetch from "../../../hooks/useFetch";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import DatePickerComp from "../../molecules/Formik/DatePickerComp";
import PhoneInput2 from "../../molecules/Formik/PhoneInput2";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";
import SelectCountry from "../../molecules/SelectCountry";
import UploadDoc from "../../molecules/uploadImage/UploadDoc";

function AccountSettingMainData({ userData }) {
  const { data: attachments_register } = useFetch({
    endpoint: `attachments-labels/users`,
    queryKey: ["attachments_register"],
  });

  return (
    <div className="grid items-start grid-cols-2 gap-2 !overflow-y-scroll   !overflow-x-hidden !shadow-none h-[27rem]  scroll_main m-3 md:p-5">
      <h1 className="flex items-center col-span-2 gap-1 py-2 text-xl font-medium dark:text-white">
        <Icon path={mdiAccountBoxOutline} size={1} />
        {t("personal Data")}:
      </h1>
      <div className="col-span-2 md:col-span-1 ">
        <BaseInputField
          label={t("Name")}
          placeholder="محمد احمد محمد"
          name="name"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1 ">
        <BaseInputField
          label={t("National ID")}
          placeholder="10********"
          name="national_id"
          type="custom"
          maxNum={10}
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1 ">
        <PhoneInput2 name="phone" label={t("phone number")} />
      </div>
      <div className="col-span-2 md:col-span-1 ">
        <BaseInputField
          label={t("Email")}
          placeholder="Example@example.com"
          name="email"
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1 ">
        <SelectCountry label={t("Country")} name={"nationality"} required />
      </div>
      <div className="col-span-2 md:col-span-1 ">
        <SelectCitiesSaudi
          label={t("registration.nationalSource")}
          name={"national_source"}
          required
        />
      </div>
      <div className="col-span-2 md:col-span-1 ">
        <DatePickerComp
          name="birthday"
          label={t("Birthday")}
          name_hj="birthday_hj"
          required
        />
      </div>

      <div className="flex flex-col col-span-2 gap-3 md:col-span-1 ">
        <DatePickerComp
          name="national_id_expired"
          label={t("National ID Expired")}
          name_hj="national_id_expired_hj"
          required
        />
      </div>
      <div className="flex flex-col col-span-2 gap-3 pt-5 ">
        <h1 className="flex gap-1 pb-3 text-xl font-medium item-center dark:text-white">
          <Icon path={mdiFileDocumentOutline} size={1} />
          {t("attachments")}:
        </h1>
      </div>

      {attachments_register?.attachment_labels?.map((attachmentLabel) => {
        const userAttachment = userData?.attachmentUrl?.find(
          (ua) => ua.attachment_label_id === attachmentLabel.id
        );
        return (
          <UploadDoc
            key={attachmentLabel.id}
            name={`attachments[${attachmentLabel.id}]`}
            label={attachmentLabel.placeholder}
            nameValue={attachmentLabel?.id}
            id={attachmentLabel.id}
            accept={attachmentLabel.extensions}
            placeholder={attachmentLabel.placeholder}
            isRequired={attachmentLabel.is_required == "1"}
            value={userAttachment ? userAttachment.value : null}
            nameLabel={userAttachment?.name}
          />
        );
      })}
    </div>
  );
}

export default AccountSettingMainData;
