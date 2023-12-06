/* eslint-disable react/prop-types */
import FacilityIcon from "../../atoms/icons/FaciltyIcon";

export default function DetailsFacility({ data }) {
  console.log(
    "🚀 ~ file: DetailsFacility.jsx:4 ~ DetailsFacility ~ data:",
    data
  );

  return (
    <div>
      {/* <MainHeader title={` تفاصيل المنشأه : ${data?.name} `} /> */}

      <div className="grid grid-cols-2 p-4 gap-y-4">
        <div className="flex flex-col items-center justify-center col-span-2 m-auto text-center">
          {/* <img
            width="70"
            height="70"
            src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/external-company-town-xnimrodx-lineal-xnimrodx-4.png"
            alt="external-company-town-xnimrodx-lineal-xnimrodx-4"
          /> */}
          <FacilityIcon/>
          <p className="mt-2 text-2xl font-bold">{data?.name}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained">الاسم:</p>
          <p>{data?.name}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained">العنوان:</p>
          <p>{data?.address}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained">رقم الطهاة:</p>
          <p>{data?.chefs_number}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> تاريخ الإصدار:</p>
          <p>{data?.version_date}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> تاريخ الإصدار بالهجري :</p>
          <p>{data?.version_date_hj}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> رقم الموظف:</p>
          <p>{data?.employee_number}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> تاريخ الانتهاء:</p>
          <p>{data?.end_date}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> تاريخ الانتهاء بالهجري:</p>
          <p>{data?.end_date_hj}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> مساحة المطبخ:</p>
          <p>{data?.kitchen_space}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> الرخصه:</p>
          <p>{data?.license}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> تاريخ انتهاء الرخصه:</p>
          <p>{data?.license_expired}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained">
            {" "}
            تاريخ انتهاء الرخصه بالهجري:
          </p>
          <p>{data?.license_expired_hj}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> رقم التسجيل:</p>
          <p>{data?.registration_number}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> مصدر التسجيل:</p>
          <p>{data?.city}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> شهادة الضرائب:</p>
          <p>{data?.tax_certificate}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> الحي:</p>
          <p>{data?.neighborhood}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> الشارع:</p>
          <p>{data?.street_name}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained"> الرقم الفرعي</p>
          <p>{data?.sub_number}</p>
        </div>
        <div className="flex gap-2 point">
          <p className="font-bold text-contained">رمز البريد </p>
          <p>{data?.postal_code}</p>
        </div>
      </div>
    </div>
  );
}
