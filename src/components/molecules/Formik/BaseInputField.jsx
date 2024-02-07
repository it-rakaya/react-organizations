/* eslint-disable react/prop-types */
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useRef, useState } from "react";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import CardInfo from "../CardInfo";
import Label from "../Label";
import { FormikError } from "./FormikError";
import BaseInputMask from "./BaseInputMask";

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
  messageInfo,
  images,
  ...props
}) {
  const { setFieldValue, values, touched, errors, handleBlur, handleChange } =
    useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const ibanRef = useRef();

  // !! type custom == type number ==> but im used this type in other name because in type number is MUI is given is problem
  const handleChangeNumber = (e) => {
    let value = e.target.value;
    if (type === "custom") {
      const numericRegex = /^[0-9]+$/;
      value = value.replace(/^0+/, ''); 
      if (!numericRegex.test(value) || value === '') {
        setFieldValue(name, "");
        return;
      }
    }
    if (maxNum && value.length > maxNum) {
      value = value.slice(0, maxNum);
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
          <Label>
            {label}
            <span className="mx-1 text-red-500">
              {required == "1" ? "*" : ""}
            </span>
          </Label>
          {/* </label> */}
          {showIcon && (
            <CardInfo
              index={index}
              setIndex={setIndex}
              messageInfo={messageInfo}
              setShow={setShow}
              images={images}
            />
          )}
          <TextField
            placeholder={placeholder}
            {...props}
            error={touched[name] && !!errors[name]}
            fullWidth
            value={values[name]}
            sx={{
              background: "transparent",
              "& .MuiInputBase-input::placeholder": {
                opacity: 1,
              },
            }}
            type={type}
            onBlur={handleBlur}
            InputProps={
              type === "custom"
                ? {
                    inputProps: { maxLength: maxNum || 10 },
                    onChange: handleChangeNumber,
                  }
                : type === "IBAN"
                ? {
                    inputComponent: BaseInputMask,
                    inputProps: { ref: ibanRef },
                    onChange: handleChangeNumber,
                  }
                : { onChange: handleChange }
            }
            name={name}
            style={{
              borderColor: !!touched[name] && !!errors[name] ? "red" : "",
              height: "59px",

            }}
            sty
            className={`${className} d "my-3 code " ${
              !!touched[name] && !!errors[name] && "border-red-500 "
            }`}
          />
          <div>{<FormikError name={name} />}</div>
        </>
      )}
    </div>
  );
}
