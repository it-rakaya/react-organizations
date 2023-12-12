/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { tv } from "tailwind-variants";
import { FormikError } from "./FormikError";

const PhoneInput2 = ({ label }) => {
  const [phone, setPhone] = useState("");
  const { setFieldValue, errors, handleBlur, values, touched } =
    useFormikContext();

  const handlePhoneChange = (value, selectedCountry, name, number) => {
    const modifiedPhone = +number
      .slice(selectedCountry?.dialCode.length + 2)
      .trim()
      .split(" ")
      .join("");
    setPhone(value);
    setFieldValue("phone", modifiedPhone);
    setFieldValue("phone_code", "+" + selectedCountry?.dialCode);
  };

  const phoneInput = tv({
    variants: {
      error: {
        true: "border-red-500  !border rounded-md",
      },
    },
  });

  return (
    <div className="col-span-1 my-2">
      <div className="flex flex-col gap-1 ">
        <label className="mb-[0.5rem]"> {label} </label>

        <PhoneInput
          country={"sa"}
          onlyCountries={["sa"]}
          value={values?.phone ? values.phone_code + values.phone : phone}
          onChange={handlePhoneChange}
          // enableSearch
          placeholder="رقم الجوال"
          onBlur={handleBlur}          
          countryCodeEditable={false}
          masks={{ sa: ".. ... ....", at: ".. ... ...." }}
          showDropdown={false}
          disableCountryCode={false}
          name="phone"
          disableDropdown={true}
          className={phoneInput({
            error: !!touched.phone && !!errors.phone,
          })}
        />
      </div>

      <div>
        {" "}
        <FormikError name={"phone"} />{" "}
      </div>
    </div>
  );
};

export default PhoneInput2;
