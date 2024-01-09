/* eslint-disable react/prop-types */

import { t } from "i18next";

function AdditionalInformationData({
  data,
  childSection,
  colorHead,
  parentSection,
}) {
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
    </div>
  );
}

export default AdditionalInformationData;
