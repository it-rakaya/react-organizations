/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import PreviewImage from "../PreviewImage";
import UploadImageIcon from "../../atoms/icons/UploadImageIcon";
import CheckIcon from "../../atoms/icons/CheckIcon";
import PdfIcon from "../../atoms/icons/PdfIcon";

export default function QuestionBaseInput({
  label,
  placeholder,
  name,
  className,
  type = "password" ||
    "select" ||
    "radio" ||
    "number" ||
    "text" ||
    "textarea" ||
    "email" ||
    "multiple_select",
  idQuestion,
  options,
  required = true,

  ...props
}) {
  const { setFieldValue, values, errors } = useFormikContext();
  console.log("🚀 ~ file: QuestionBaseInput.jsx:46 ~ values:", values);
  const [showPassword, setShowPassword] = useState(false);
  const [valueRadio, setValueRadio] = useState("");
  const [files, setFiles] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);

  //select
  const handleChange = (options) => {
    // setValue(event.target.value);
    //
  };
  //radio
  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
    setFieldValue(`answers${name}`, event.target.value);
  };
  //checkbox
  const handleChangeCheckbox = (event) => {
    const selectedValues = [...checkboxValue];
    setCheckboxValue(selectedValues);
    // Check if the checkbox is checked or unchecked
    if (event.target.checked) {
      // If checked, add the value to the array
      selectedValues.push(event.target.value);
    } else {
      // If unchecked, remove the value from the array
      const index = selectedValues.indexOf(event.target.value);
      if (index !== -1) {
        selectedValues.splice(index, 1);
      }
    }

    setFieldValue(`answers${name}`, selectedValues);
  };
  //file
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ["image/*", ".pdf", ".doc", ".docx"],

    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      setFieldValue(`answers${name}`, acceptedFiles[0]); // استخدم acceptedFiles بدلاً من files[0]
    },
  });
  const isLargeFile = files?.length && files[0]?.size > 524288000;

  const multiSelectOptions = options?.map((item) => ({
    value: item?.content,
    label: item?.content,
  }));
  const selectOptions = options?.map((item) => ({
    value: item?.content,
    label: item?.content,
  }));
  return (
    <div>
      {type == "password" ? (
        <FormControl fullWidth>
          <label> {label} </label>

          <OutlinedInput
            label="Password"
            id="auth-login-v2-password"
            type={showPassword ? "text" : "password"}
            name={name}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
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
        </FormControl>
      ) : type == "select" ? (
        <Select
          options={selectOptions}
          onChange={(option) => setFieldValue(`answers${name}`, option?.value)}
          className="border rounded-md"
          placeholder={t("Chose Country")}
          noOptionsMessage={() => t("Not Found Data")}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: "10px",
              borderRadius: " 8px",
              borderColor: "white",
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              // background:"white" ,
              // borderColor:"#eee",
              color: "black",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,

            colors: {
              ...theme.colors,
              primary25: `#eee`,
              primary: "#eee",
              // borderColor: "red",
            },
          })}
        />
      ) : type == "radio" ? (
        <>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valueRadio}
              onChange={handleChangeRadio}
            >
              {options?.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option?.content}
                  control={<Radio />}
                  label={option?.content}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      ) : type == "number" ? (
        <div>
          <label> {label} </label>
          <TextField
            autoFocus
            {...props}
            fullWidth
            value={values[name]}
            sx={{ mb: 4 }}
            placeholder={placeholder}
            name={name}
            className={className}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "text" ? (
        <div>
          <TextField
            autoFocus
            // error
            {...props}
            fullWidth
            value={values[name]}
            sx={{ mb: 4 }}
            placeholder={placeholder}
            name={name}
            className={className}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "textarea" ? (
        <div>
          <label> {label} </label>
          <TextareaAutosize
            minRows={4}
            placeholder={placeholder}
            // defaultValue="tetarea"
            className="w-full p-2 border rounded-md"
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "email" ? (
        <div>
          <label> {label} </label>
          <TextField
            autoFocus
            {...props}
            fullWidth
            value={values[name]}
            sx={{ mb: 4 }}
            placeholder={placeholder}
            name={name}
            className={className}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "file" ? (
        <div className="relative my-4">
          <div className="relative items-center gap-1 mt-3 cursor-pointer">
            <Box {...getRootProps({ className: "dropzone" })} cl>
              {/* <label> {label} </label> */}

              <input {...getInputProps()} className="cursor-pointer" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: ["column", "column", "row"],
                  alignItems: "center",
                }}
              >
                <div
                  style={{ cursor: "pointer", lineHeight: "52px" }}
                  className={` rounded-[10px]  relative
              cursor-pointer pr-10 h-[56px] border 
              text-[#4c4e6478]  border-[#4c4e6478)] bg-[#ebebee73] w-full ${
                !!errors[name] && "border-red-500 "
              }`}
                >
                  {files.length
                    ? t("The file was downloaded successfully")
                    : placeholder}
                  {!files.length ? (
                    <div className="absolute top-[3px] right-[5px]">
                      <UploadImageIcon className={`w-[30px]`} />
                    </div>
                  ) : (
                    <div className="absolute top-[3px] right-[5px]">
                      <CheckIcon className={`w-[25px]`} />
                    </div>
                  )}
                </div>
              </Box>
            </Box>
            <div className="flex justify-start w-full rounded-md ">
              {!isLargeFile && files[0]?.type.startsWith("image/") ? (
                <div className="flex justify-start">
                  <PreviewImage files={files ? files : []} />
                </div>
              ) : files[0]?.type.startsWith("application/") ? (
                <a
                  href={URL.createObjectURL(files[0])}
                  download={files[0].name}
                  className=""
                >
                  <PdfIcon />
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : type == "checkbox" ? (
        <FormGroup row onChange={handleChangeCheckbox}>
          {options?.map((option) => (
            <FormControlLabel
              key={option?.id}
              label={option?.content}
              control={<Checkbox value={option?.content} />}
            />
          ))}
        </FormGroup>
      ) : type == "multiple_select" ? (
        <Select
          options={multiSelectOptions}
          onChange={(options) =>
            setFieldValue(
              `answers${name}`,
              options.map((item) => item?.value)
            )
          }
          isMulti
          className="border rounded-md"
          placeholder={t("Chose Country")}
          noOptionsMessage={() => t("Not Found Data")}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: "10px",
              borderRadius: " 8px",
              borderColor: "white",
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              // background:"white" ,
              // borderColor:"#eee",
              color: "black",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,

            colors: {
              ...theme.colors,
              primary25: `#eee`,
              primary: "#eee",
              // borderColor: "red",
            },
          })}
        />
      ) : (
        ""
      )}
    </div>
  );
}
