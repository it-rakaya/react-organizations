/* eslint-disable react/prop-types */
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const SelectComp = ({
  name,
  data,
  label,
  className,
  placeholder,
  multi,
  idValue,
  ...props
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();

  const handleChange = (event) => {
    setPersonName(event.target.value);
    const selectedValues = event.target.value;
    const selectedItemsWithId = data.filter((item) =>
      selectedValues.includes(item.name_ar)
    );
    const selectedIds = selectedItemsWithId.map((item) => item.id);
    setFieldValue(name, selectedIds);
  };

  return (
    <>
      {multi ? (
        <FormControl fullWidth>
          <InputLabel
            id="demo-multiple-chip-label"
            style={{ color: theme.palette.primary?.main }}
          >
            {label}
          </InputLabel>
          <Select
            multiple
            label={label}
            value={personName}
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
            {data?.map((name) => (
              <MenuItem key={name.id} value={name.name_ar}>
                {name.name_ar}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl className={className}>
          <InputLabel
            id="controlled-select-label"
            style={{ color: theme.palette.primary?.main }}
          >
            {label}
          </InputLabel>
          <Select
            value={values[name]}
            label={label}
            id="controlled-select"
            onChange={(event) => {
              if (values[name] !== undefined) {
                setFieldValue(name, event.target.value);
              }
            }}
            labelId="controlled-select-label"
            placeholder={placeholder}
          >
            {data?.map((item) => (
              <MenuItem
                key={item.id}
                value={idValue ? item?.id : item?.name_ar}
              >
                {item?.name_ar}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default SelectComp;
