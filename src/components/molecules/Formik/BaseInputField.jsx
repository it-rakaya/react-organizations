/* eslint-disable react/prop-types */
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { FormikError } from "./FormikError";
import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function BaseInputField({
  label,
  placeholder,
  name,
  className,
  type = "text",
  password,
  maxNum,
  setShow,
  required,
  showIcon,
  setIndex,
  index,
  ...props
}) {
  const { setFieldValue, values, touched, errors, handleBlur, handleChange } =
    useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  // !! type custom == type number ==> but im used this type in other name because in type number is MUI is given is problem
  const handleChangeNumber = (e) => {
    let value = e.target.value;
    if (type === "custom") {
      const numericRegex = /^[0-9]+$/;
      if (!numericRegex.test(value)) {
        setFieldValue(name, "");
        return;
      }
      if (value.length > maxNum) {
        value = value.slice(0, maxNum);
      }
    }
    setFieldValue(name, value);
  };

  return (
    <div>
      {password ? (
        <FormControl fullWidth className="m-0">
          <label> {label} </label>

          <OutlinedInput
            label="Password"
            id="auth-login-v2-password"
            type={showPassword ? "text" : "password"}
            className="mt-3"
            name={name}
            helperText={touched[name] && errors[name]}
            error={!!errors[name]}
            onChange={(e) => {
              if (props.value === undefined) {
                // setFieldValueState(e.target.value)
                setFieldValue(name, e.target.value);
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <IconifyIcon
                    icon={
                      showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"
                    }
                  />
                </IconButton>
              </InputAdornment>
            }
          />
          {/* <FormikError name={name} /> */}
        </FormControl>
      ) : (
        <>
          <label className="flex my-[0.75rem] relative">
            {label}
            <span className="mx-1 text-red-500">
              {required == "1" ? "*" : ""}
            </span>
          </label>
          {showIcon && (
          <div
            className="my-1 w-fit"
            onMouseEnter={() => {
              setShow(true);
              setIndex(index);
            }}
          >
            <div className="flex items-center gap-1">
                <>
                  <span className="text-[10px] text-[#80b3f0]">
                    {" "}
                    لمعرفة المرفق اضغط هنا
                  </span>
                  <Icon path={mdiInformationOutline} size={0.7} />
                </>
            </div>
          </div>
              )}
          <TextField
            // autoFocus
            placeholder={placeholder}
            {...props}
            error={touched[name] && !!errors[name]}
            // helperText={!!touched[name] && !!errors[name]}
            fullWidth
            value={values[name]}
            sx={{ background: "white", borderRadius: "10px" }}
            type={type}
            onBlur={handleBlur}
            InputProps={
              type === "custom"
                ? {
                    inputProps: { maxLength: 10 },
                    onChange: handleChangeNumber,
                  }
                : { onChange: handleChange }
            }
            name={name}
            style={{
              borderColor: !!touched[name] && !!errors[name] ? "red" : "",
              borderRadius: "10px",
            }}
            className={`${className} "my-3 code " ${
              !!touched[name] && !!errors[name] && "border-red-500 "
            }`}
          />
          <div>{<FormikError name={name} />}</div>
        </>
      )}
    </div>
  );
}
