import { Typography } from "@mui/material";
import BaseInputField from "../../molecules/Formik/BaseInputField";
import SelectCitiesSaudi from "../../molecules/SelectCitiesSaudi";

function NationalAddressData() {
  return (
    <div className="grid items-start grid-cols-2">
      <div className="">
        <Typography className={`font-bold  `}>
          2. بيانات العنوان الوطني
        </Typography>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <SelectCitiesSaudi label={"اسم المدينة "} name="city" required />
        </div>

        <div className="w-full md:w-1/2">
          <BaseInputField
            label=" اسم الحي"
            placeholder="حي النقع الشرقي"
            name="neighborhood"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label=" اسم الشارع"
            placeholder="شارع الهدى والنور"
            name="street_name"
            required
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="رقم المبنى"
            placeholder="3654"
            name="building_number"
            type="custom"
            maxNum="4"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap items-start col-span-12 gap-2 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="الرمز البريدي"
            placeholder="568750"
            name="postal_code"
            type="custom"
            maxNum="6"
            required
          />
        </div>
        <div className="w-full md:w-1/2">
          <BaseInputField
            label="الرقم الفرعي"
            placeholder="698547"
            name="sub_number"
            type="custom"
            maxNum="6"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default NationalAddressData;
