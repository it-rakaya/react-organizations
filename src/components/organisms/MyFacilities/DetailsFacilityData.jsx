/* eslint-disable react/prop-types */
import { t } from "i18next";
import { convertArabicToEnglish } from "../../../utils/helpers";
import { Divider } from "@mui/material";
import { useIsRTL } from "../../../hooks/useIsRTL";

function DetailsFacilityData({ data, childSection, colorHead, parentSection }) {
  console.log("🚀 ~ DetailsFacilityData ~ data:", data)
  const isRTL = useIsRTL();

  return (
    <div className={parentSection}>
      <div className="block col-span-2 md:hidden">
        <h2 className="text-black dark:text-white">{t("Facility Information")}</h2>
      </div>
      <div className="col-span-2">
        <h1 className="flex items-center col-span-12 gap-1 pt-5 pb-3 font-medium md:text-xl dark:text-white">
          {t("Commercial Registration Information")}:
        </h1>
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
      <div className="col-span-2 pt-10 pb-8">
        <Divider />
      </div>

      <div className="col-span-2">
        <h1 className="flex items-center col-span-12 gap-1 pt-2 pb-3 font-medium md:text-xl dark:text-white">
          {/* {t("Commercial activity license data")}: */}
          {t("Commercial activity license data (my country)")}:
        </h1>
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
      <div className="col-span-2 pt-10 pb-8">
        <Divider />
      </div>

      <div className="col-span-2">
        <h1 className="flex items-center col-span-12 gap-1 pt-2 pb-3 font-medium md:text-xl dark:text-white">
          {t("Bank data of the facility")}:
        </h1>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("account name")}
        </p>
        <p className="mt-1 dark:text-white">
          {data?.bank_information?.account_name}
        </p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("IBAN number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.bank_information?.iban}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("Bank name")}
        </p>
        <p className="mt-1 dark:text-white">
          {isRTL
            ? data?.bank_information?.bank?.name_ar
            : data?.bank_information?.bank?.name_en}
        </p>
      </div>
    </div>
  );
}

export default DetailsFacilityData;
