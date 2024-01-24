/* eslint-disable react/prop-types */

import { t } from "i18next";
import { useIsRTL } from "../../../hooks/useIsRTL";

function AdditionalInformationData({
  data,
  childSection,
  colorHead,
  parentSection,
}) {
  const isRTL = useIsRTL()
  return (
    <div className={parentSection}>
          <div className="block col-span-2 md:hidden">
        <h2 className="text-black dark:text-white" >{t("Additional information")}</h2>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("chefs number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.chefs_number}</p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("employee number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.employee_number}</p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("kitchen space")}
        </p>
        <p className="mt-1 dark:text-white">{data?.kitchen_space}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("account name")}
        </p>
        <p className="mt-1 dark:text-white">{data?.bank_information?.account_name}</p>
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
        <p className="mt-1 dark:text-white">{isRTL ? data?.bank_information?.bank?.name_ar : data?.bank_information?.bank?.name_en }</p>
      </div>
    </div>
  );
}

export default AdditionalInformationData;
