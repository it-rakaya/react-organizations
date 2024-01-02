/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { FormikError } from "./Formik/FormikError";
import Label from "./Label";

export default function SelectPositions({ name, label, className ,required }) {
  const { setFieldValue,  values,  handleBlur } =
    useFormikContext();

  const { data: positions } = useFetch({
    endpoint: `employees-positions`,
    queryKey: ["employees-positions"],
  });
  const options = positions?.positions.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  console.log("🚀 ~ file: SelectPositions.jsx:21 ~ options ~ options:", options)

  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div className={`${className} mt-2`}>
        <Label>
            {label}
            <span className="mx-1 text-red-500">
              {required == "1" ? "*" : ""}
            </span>
          </Label>
      <div className="mt-[0.5rem]">
        <Select
          options={options}
          name={name}
          value={selectedCountry}
          placeholder={t("Chose position")}
          noOptionsMessage={() => t("Not Found Data")}
          onBlur={handleBlur}
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth:"1px",
              borderColor:"#555d64",
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
              primary: "#eee",
            },
          })}
          classNames={{
            control: () => "dark:bg-dark-primary",
            option: () => "dark:bg-dark-primary dark:text-white  ",
          }}
        />
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </div>
  );
}
