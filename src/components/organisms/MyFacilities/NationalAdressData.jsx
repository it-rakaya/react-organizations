/* eslint-disable react/prop-types */

import { t } from "i18next";

function NationalAdressData({ data, childSection, colorHead, parentSection }) {
  console.log(
    "🚀 ~ file: NationalAdressData.jsx:4 ~ NationalAdressData ~ data:",
    data
  );
  return (
    <div className={parentSection}>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("street name")}
        </p>
        <p className="mt-1 dark:text-white">{data?.street_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          {t("district")}
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
