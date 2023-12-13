/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";

export default function SelectCitiesSaudi({ name, label, className , required }) {
  const { setFieldValue } = useFormikContext();
  const { data: cities } = useFetch({
    endpoint: `saudi-cities`,
    queryKey: ["saudi-cities"],
  });
  const options = cities?.cities.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <div className={className}>
      <label className="block my-[0.75rem]">{label}
      <span className="mx-1 text-red-500">{required == "1" ? "*" : ""}</span>
      </label>
      <div className="mt-3">
        <Select
          options={options}
          name={name}
          placeholder={t("Chose city")}
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
              primary25: `#eee`,
              primary:'#eee' 
            },
          })}
          // defaultValue={{ value: values[name] , label:values[name] }}
        />
      </div>
    </div>
  );
}
