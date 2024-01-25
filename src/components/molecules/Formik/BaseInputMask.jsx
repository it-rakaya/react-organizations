/* eslint-disable react/display-name */
import { useFormikContext } from "formik";
import { forwardRef, useState } from "react";

const BaseInputMask = forwardRef((props, name) => {
  const { setFieldValue, values, touched, errors, handleBlur } =
  useFormikContext();
  console.log("🚀 ~ BaseInputMask ~ values:", values)
  const [inputValue, setInputValue] = useState(values?.iban);
  const handleInputChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^A-Za-z0-9]/g, "");
    if (sanitizedValue.length <= 24) {
      const formattedValue = sanitizedValue.replace(/(.{4})/g, "$1 ");
      setInputValue(formattedValue);
      setFieldValue("iban", formattedValue);
    }
  };
  return (
    <div className="w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="27*********************"
        name="iban"
        onBlur={handleBlur}
        style={{
          borderColor: !!touched.iban && !!errors.iban ? "red" : "",
          borderRadius: "10px",
        }}
        className={`"my-3 code p-[18px] w-full focus-visible:!outline-none  dark:!text-white" ${
          !!touched.iban && !!errors.iban && "border-red-500 "
        }`}
      />
      {/* <div>{<FormikError name="iban" />}</div> */}
    </div>
  );
});

export default BaseInputMask;
