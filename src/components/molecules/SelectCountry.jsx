/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { FormikError } from "./Formik/FormikError";

export default function SelectCountry({ name, label, className }) {
  const { setFieldValue, errors, values, touched, handleBlur } =
    useFormikContext();
  const { data: countries } = useFetch({
    endpoint: `countries`,
    queryKey: ["countries"],
  });
  const options = countries?.countries.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));
  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div className={`${className} mt-2`}>
      <label>{label}</label>
      <div className="mt-[0.5rem]">
        <Select
          options={options}
          name={name}
          value={selectedCountry}
          placeholder={t("Chose Country")}
          noOptionsMessage={() => t("Not Found Data")}
          onBlur={handleBlur}
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 12px",

              borderColor:
                !!touched[name] && !!errors[name]
                  ? "red"
                  : state.isFocused
                  ? "#d8d8dd"
                  : "#d8d8dd",
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
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
            },
          })}
        />
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </div>
  );
}
