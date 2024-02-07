/* eslint-disable react/display-name */
import { useFormikContext } from "formik";
import { forwardRef, useState } from "react";

const BaseInputMask = forwardRef(() => {
  const { setFieldValue, values, touched, errors, handleBlur } =
    useFormikContext();
console.log(values?.iban)
  const formatIban = (value) => {
    const hasSpaces = /\s/.test(value);
    if (hasSpaces) {
      return value;
    }
    return value.replace(/(.{4})/g, "$1 ").trim();
  };
  const [inputValue, setInputValue] = useState(formatIban(values?.iban));

  const handleInputChange = (event) => {
    const oldValue = inputValue.replace(/ /g, "");
    const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");

    if (oldValue.length > newValue.length) {
      // User is deleting
      const isDeletingSpace = inputValue[inputValue.length - 1] === " ";
      if (isDeletingSpace) {
        setInputValue(formatIban(newValue));
        setFieldValue("iban", formatIban(newValue));
        return;
      }
    }

    if (newValue.length <= 24) {
      setInputValue(formatIban(newValue));
      setFieldValue("iban", formatIban(newValue));
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
        name="iban"
        onBlur={handleBlur}
        style={{
          borderColor: !!touched.iban && !!errors.iban ? "red" : "",
          // borderRadius: "9px",
          height: "59px",

        }}
        className={`"my-3 code p-[18px] w-full focus-visible:!outline-none  dark:!text-white rounded-[8px] dark:!border dark:!border-solid !border-[#555d64] " ${
          !!touched.iban && !!errors.iban && "border-red-500 "
        }`}
      />
      {/* <div>{<FormikError name="iban" />}</div> */}
    </div>
  );
});

export default BaseInputMask;
