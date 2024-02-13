/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// ** React Imports
import { forwardRef } from "react";

// ** MUI Imports
import TextField from "@mui/material/TextField";
import { t } from "i18next";

const PickersComponent = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props;

  return (
    <TextField
      sx={{
        background: "transparent",
        "& .MuiInputBase-input::placeholder": {
          opacity: 1,
        },
      }}
      inputRef={ref}
      {...props}
      label={label || t("")}
      {...(readOnly && { inputProps: { readOnly: true } })}
    />
  );
});

export default PickersComponent;
