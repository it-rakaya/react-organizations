/* eslint-disable react/prop-types */
import { t } from "i18next";
import { convertArabicToEnglish } from "../../../utils/helpers";

function DetailsFacilityData({ data, childSection, colorHead, parentSection }) {
  return (
    <div className={parentSection}>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الاسم
        </p>
        <p className="mt-1">{data?.name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          رقم السجل التجاري
        </p>
        <p className="mt-1">{data?.registration_number}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          مصدر السجل التجاري{" "}
        </p>
        <p className="mt-1">{data?.registration_source_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          شهادة الرقم الضريبي{" "}
        </p>
        <p className="mt-1">{data?.tax_certificate}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          {t("Date of issuance of the commercial register in AD")}{" "}
        </p>
        <p className="mt-1">
          {data?.version_date} / {convertArabicToEnglish(data?.version_date_hj)}
        </p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          {t(
            "Commercial registration expiration date in Gregorian calendar"
          )}{" "}
        </p>
        <p className="mt-1">
          {data?.end_date} / {convertArabicToEnglish(data?.end_date_hj)}
        </p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          رقم رخصة مزاولة المهنة{" "}
        </p>
        <p className="mt-1">{data?.license}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          تاريخ انتهاء رخصة مزاولة المهنة
        </p>
        <p className="mt-1">
          {data?.license_expired} /{" "}
          {convertArabicToEnglish(data?.license_expired_hj)}
        </p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الطاقه الاستيعابية للمنشأة
        </p>
        <p className="mt-1">{data?.capacity}</p>
      </div>
    </div>
  );
}

export default DetailsFacilityData;
