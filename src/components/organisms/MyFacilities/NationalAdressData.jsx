/* eslint-disable react/prop-types */

function NationalAdressData({ data, childSection, colorHead, parentSection }) {
  console.log("🚀 ~ file: NationalAdressData.jsx:4 ~ NationalAdressData ~ data:", data)
  return (
    <div className={parentSection}>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الشارع{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.street_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الحي{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.district}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          اسم المدينة{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.city}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          رقم المبنى{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.building_number}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          رمز البريد{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.postal_code}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الرقم الفرعي
        </p>
        <p className="mt-1 dark:text-white">{data?.sub_number}</p>
      </div>
    </div>
  );
}

export default NationalAdressData;
