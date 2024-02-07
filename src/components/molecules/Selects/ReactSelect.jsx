/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import CardInfo from "../CardInfo";
import { FormikError } from "../Formik/FormikError";
import Label from "../Label";
import { useTheme } from "@mui/material/styles";

export default function ReactSelect({
  name,
  label,
  className,
  required,
  showIcon,
  index,
  messageInfo,
  setIndex,
  setShow,
  images,
  options,
  selectedValue,
  isMulti,
  placeholder,
}) {
  const { setFieldValue, handleBlur } = useFormikContext();
  const theme = useTheme();

  return (
    <div className={`${className} mt-2`}>
      <Label>
        {label}
        <span className="mx-1 text-red-500">{required == "1" ? "*" : ""}</span>
      </Label>
      {showIcon && (
        <CardInfo
          index={index}
          setIndex={setIndex}
          messageInfo={messageInfo}
          setShow={setShow}
          images={images}
        />
      )}
      <div className="">
        <Select
          options={options}
          name={name}
          value={selectedValue}
          placeholder={
            <div className="capitalize select-placeholder-text">{placeholder}</div>
          }
          noOptionsMessage={() => t("Not Found Data")}
          isMulti={isMulti}
          clos
          onBlur={handleBlur}
          onChange={(option) =>
            isMulti
              ? setFieldValue(
                  name,
                  option.map((item) => item.value)
                )
              : setFieldValue(name, option.value)
          }
          styles={{
            control: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              padding: "10px 5px",
              borderRadius: " 8px",
              borderWidth: "1px",
              //   borderColor:"#555d64" ,
              background: "white",
              margin: "0",
              height: "59px",
              width: "100%",
            }),

            option: (defaultStyles, { isFocused, isSelected }) => ({
              ...defaultStyles,
              padding: "10px 10px",
              width: "100%",
              background: isSelected
                ? theme.palette.primary?.main
                : isFocused
                ? "#eee"
                : "000",
              color: isSelected ? "white" : "black",
              ":active": {
                ...defaultStyles[":active"],
                backgroundColor: isSelected
                  ? theme.palette.primary?.main
                  : defaultStyles[":active"].backgroundColor,
              },
            }),
            multiValueLabel: (styles, { data }) => ({
              ...styles,
              background:theme.palette.primary?.main,
              color:"white"
            }),
            multiValueRemove: (styles, { data }) => ({
              ...styles,
              color: 'white',
              background:theme.palette.primary?.main,
              ':hover': {
                backgroundColor: data.color,
                color: 'white',
              },
            }),
          }}
          theme={(theme) => ({
            ...theme,
            backgroundColor: "red",
            colors: {
              ...theme.colors,
              primary25: `#eee`,
              primary: "#eee",
            },
          })}
          
          classNames={{
            control: () => "dark:bg-transparent  dark:border-[#555d64]",
            option: () => "dark:bg-dark-primary dark:text-white  ",
            menu: () =>
              " bg-white dark:bg-dark-primary dark:text-white border rounded-md ",
          }}
          maxMenuHeight={250}
          menuShouldScrollIntoView
        />
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </div>
  );
}
