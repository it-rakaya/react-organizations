/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { FormikError } from "./Formik/FormikError";

export default function SelectCountry({ name, label, className }) {
  const { setFieldValue , errors } = useFormikContext();
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
          placeholder={t("Chose Country")}
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px",
              borderRadius: " 8px",
              borderColor:errors[name] ? "red" :'white',
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
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </div>
  );
}
