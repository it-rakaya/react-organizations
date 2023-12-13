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

  return (
    <div className={`${className} mt-2`}>
      <label>{label}</label>
      {/* <SelectComp
        name={name}
        multi={false}
        data={countries?.countries ? countries?.countries : ["gfv"]}
        className="w-full mt-3"
        placeholder="الدوله"
      /> */}
      <div className="mt-[0.5rem]">
        <Select
          options={options}
          name={name}
          className="border rounded-md"
          placeholder={t("Chose Country")}
          noOptionsMessage={() => t("Not Found Data")}
          onBlur={handleBlur}
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: "10px",
              borderRadius: " 8px",

              borderColor:
                !!touched[name] && !!errors[name]
                  ? "red"
                  : state.isFocused
                  ? "transparent"
                  : "white",
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
          defaultValue={{
            value: values[name] ? values[name] : "",
            label: values?.nationality_name
              ? values?.nationality_name
              : t("Chose Country"),
          }}
        />
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </div>
  );
}
