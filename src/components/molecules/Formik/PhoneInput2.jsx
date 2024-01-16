/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { tv } from "tailwind-variants";
import Label from "../Label";
import { FormikError } from "./FormikError";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import CardInfo from "../CardInfo";

const PhoneInput2 = ({ label, required, showIcon, messageInfo }) => {
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
    <div className="col-span-1 ">
      <div className="flex flex-col ">
        <Label>
          {label}
          <span className="mx-1 text-red-500">
            {required == "1" ? "*" : ""}
          </span>
        </Label>
        {/* {showIcon && (
            <div
              className="my-1 cursor-pointer w-fit"
            >
              <div className="flex items-center gap-1">
                <>
                  <span className="text-[10px] text-[#80b3f0]">
                    {messageInfo ? messageInfo : " }
                  </span>
                  <Icon path={mdiInformationOutline} size={0.7} />
                </>
              </div>
            </div>
          )} */}
        {showIcon && <CardInfo messageInfo={messageInfo} />}

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
