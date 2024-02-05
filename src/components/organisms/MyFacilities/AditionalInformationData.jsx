/* eslint-disable react/prop-types */

import { t } from "i18next";
import { useIsRTL } from "../../../hooks/useIsRTL";

function AdditionalInformationData({
  data,
  childSection,
  colorHead,
  parentSection,
}) {
  return (
    <div className={parentSection}>
          <div className="block col-span-2 md:hidden">
        <h2 className="text-black dark:text-white" >{t("Additional Information")}</h2>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("Chefs Number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.chefs_number}</p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("Number Of Employees")}
        </p>
        <p className="mt-1 dark:text-white">{data?.employee_number}</p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("Kitchen Space")}
        </p>
        <p className="mt-1 dark:text-white">{data?.kitchen_space}</p>
      </div>

    </div>
  );
}

export default AdditionalInformationData;
