/* eslint-disable react/prop-types */

function NationalAdressData({ data, childSection, colorHead, parentSection }) {
  return (
    <div className={parentSection}>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الشارع{" "}
        </p>
        <p className="mt-1">{data?.street_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الحي{" "}
        </p>
        <p className="mt-1">{data?.neighborhood_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          اسم المدينة{" "}
        </p>
        <p className="mt-1">{data?.city_name}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          رقم المبنى{" "}
        </p>
        <p className="mt-1">{data?.building_number}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          رمز البريد{" "}
        </p>
        <p className="mt-1">{data?.postal_code}</p>
      </div>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          الرقم الفرعي
        </p>
        <p className="mt-1">{data?.sub_number}</p>
      </div>
    </div>
  );
}

export default NationalAdressData;
