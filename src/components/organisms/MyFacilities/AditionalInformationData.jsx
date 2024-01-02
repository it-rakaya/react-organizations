/* eslint-disable react/prop-types */

function AdditionalInformationData({
  data,
  childSection,
  colorHead,
  parentSection,
}) {
  return (
    <div className={parentSection}>
      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          عدد الطهاة على راس العمل في المنشاة{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.chefs_number}</p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          عدد الموظفين بموجب التامينات الاجتماعية{" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.employee_number}</p>
      </div>

      <div className={childSection}>
        <p className="font-medium " style={{ color: colorHead }}>
          مساحة المطبخ ( بالمتر المربع){" "}
        </p>
        <p className="mt-1 dark:text-white">{data?.kitchen_space}</p>
      </div>
    </div>
  );
}

export default AdditionalInformationData;
