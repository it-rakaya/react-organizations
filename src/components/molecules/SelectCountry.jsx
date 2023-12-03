/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";

export default function SelectCountry({ name, label, className }) {
  const { setFieldValue } = useFormikContext();
  const { data: countries } = useFetch({
    endpoint: `countries`,
    queryKey: ["countrie"],
    onError(e) {
      console.log("e", e);
    },
  });
  const options = countries?.countries.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));

  return (
    <div className={className}>
      <label>{label}</label>
      {/* <SelectComp
        name={name}
        multi={false}
        data={countries?.countries ? countries?.countries : ["gfv"]}
        className="w-full mt-3"
        placeholder="الدوله"
      /> */}
      <div className="mt-3">
        <Select
          options={options}
          name={name}
          placeholder={t("Chose Country")}
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px",
              borderRadius: " 8px",
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              // background:"white" ,
              color: "black",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#666CFF",
              primary: "#666CFF",
            },
          })}
          // defaultValue={{ value: values[name] , label:values[name] }}
        />
      </div>
    </div>
  );
}
