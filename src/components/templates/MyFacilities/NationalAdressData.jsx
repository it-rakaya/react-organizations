/* eslint-disable react/prop-types */

import { t } from "i18next";

function NationalAdressData({ data, childSection, colorHead, parentSection }) {
  return (
    <div className={parentSection}>
       <div className="block col-span-2 md:hidden">
        <h2 className="text-black dark:text-white" >{t("National address")}</h2>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("street name")}
        </p>
        <p className="mt-1 dark:text-white">{data?.street_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("District name")}
        </p>
        <p className="mt-1 dark:text-white">{data?.district}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("city")}
        </p>
        <p className="mt-1 dark:text-white">{data?.city}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("building number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.building_number}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("postal code")}
        </p>
        <p className="mt-1 dark:text-white">{data?.postal_code}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("sub number")}
        </p>
        <p className="mt-1 dark:text-white">{data?.sub_number}</p>
      </div>
    </div>
  );
}

export default NationalAdressData;
