/* eslint-disable react/prop-types */
import { t } from "i18next";
import { convertArabicToEnglish } from "../../../utils/helpers";

function DetailsFacilityData({ data, childSection, colorHead, parentSection }) {
  return (
    <div className={parentSection}>
      <div className="block col-span-2 md:hidden">
        <h2 className="text-black dark:text-white" >{t("Facility Information")}</h2>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("facility name")}
        </p>
        <p className="mt-1 dark:text-white">{data?.name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          {t("registration number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.registration_number}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("Commercial Registration Source")}
        </p>
        <p className="mt-1 dark:text-white">{data?.registration_source_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("tax certificate")}
        </p>
        <p className="mt-1 dark:text-white">{data?.tax_certificate}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          {t("Date of issuance of the commercial register in AD")}{" "}
        </p>
        <p className="mt-1 dark:text-white">
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
        <p className="mt-1 dark:text-white">
          {data?.end_date} / {convertArabicToEnglish(data?.end_date_hj)}
        </p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("license")}
        </p>
        <p className="mt-1 dark:text-white">{data?.license}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {" "}
          {t("license expired")}
        </p>
        <p className="mt-1 dark:text-white">
          {data?.license_expired} /{" "}
          {convertArabicToEnglish(data?.license_expired_hj)}
        </p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("capacity")}
        </p>
        <p className="mt-1 dark:text-white">{data?.capacity}</p>
      </div>
    </div>
  );
}

export default DetailsFacilityData;
