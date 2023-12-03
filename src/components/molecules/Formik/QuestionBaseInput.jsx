/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import PreviewImage from "../PreviewImage";
import { MenuItem } from "react-pro-sidebar";
import IconifyIcon from "../../atoms/icons/IconifyIcon";

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
  console.log("🚀 ~ file: QuestionBaseInput.jsx:45 ~ options:", options)
  const { setFieldValue, values, errors } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [value, setValue] = useState("female");


  const handleChange = (event) => {
    setValue(event.target.value);
    setFieldValue(`answers${name}`, value);
  };
  console.log("🚀 ~ file: UploadImage.jsx:10 ~ UploadImage ~ values:", values);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      setFieldValue(`answers${name}`, acceptedFiles[0]); // استخدم acceptedFiles بدلاً من files[0]
    },
  });
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
        <TextField
          id="outlined-select-currency-native"
          select
          // label="Native select"
          className="w-full"
          defaultValue="EUR"
          onChange={(e) => {
            // if (values[name] !== undefined) {
            // setFieldValueState(e.target.value)
            setFieldValue(`answers${name}`, e.target.value);
            // }
          }}
          SelectProps={{
            native: true,
          }}
          // helperText="Please select your currency"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.content}
            </option>
          ))}
        </TextField>
      ) : type == "radio" ? (
        <>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
            placeholder="Maximum 4 rows"
            defaultValue="tetarea"
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
          <Box {...getRootProps({ className: "dropzone" })}>
            <label> {label} </label>

            <input {...getInputProps()} />

            <Box
              sx={{
                display: "flex",
                flexDirection: ["column", "column", "row"],
                alignItems: "center",
              }}
            >
              <TextField
                // value={files[0]?.name}
                fullWidth
                placeholder="الرجاء ارفاق صورة الهوية *"
                className="bg-white rounded-[10px]"
              />
            </Box>
            {/* {img} */}
          </Box>
          <div className="absolute top-[8px] left-[10px] rounded-md">
            <PreviewImage files={files ? files : []} />
          </div>
        </div>
      ) : type == "checkbox" ? (
        <FormGroup row>
          <FormControlLabel
            label="Checked"
            control={<Checkbox defaultChecked name="basic-checked" />}
          />
          <FormControlLabel
            label="Unchecked"
            control={<Checkbox name="basic-unchecked" />}
          />
        </FormGroup>
      ) : type == "multiple_select" ? (
        <Select
          multiple
          label={label}
          value={personName}
          className="w-full"
          {...props}
          // MenuProps={MenuProps}

          id="demo-multiple-chip"
          onChange={handleChange}
          labelId="demo-multiple-chip-label"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ m: 0.75 }} />
              ))}
            </Box>
          )}
        >
          {options?.map((name) => (
            <MenuItem key={name.id} value={name.name_ar}>
              {name.name_ar}
            </MenuItem>
          ))}
        </Select>
      ) : (
        ""
      )}
    </div>
  );
}
