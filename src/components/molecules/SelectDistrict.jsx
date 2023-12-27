/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useEffect } from "react";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import Spinner from "../atoms/Spinner";

export default function SelectDistrict({ name, label, className, required }) {
  const { setFieldValue, values } = useFormikContext();
  console.log(
    "🚀 ~ file: SelectDistrict.jsx:9 ~ SelectDistrict ~ values:",
    values
  );
  const { data: district, isLoading } = useFetch({
    endpoint: `saudi-districts?city_id=${values?.city}`,
    queryKey: [`district/${values?.city}`],
    enabled: !!values?.city,
  });
  const options = district?.districts?.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));
  const selectedCity = options?.find((option) => option?.value == values[name]);
  console.log(
    "🚀 ~ file: SelectDistrict.jsx:24 ~ SelectDistrict ~ selectedCity:",
    selectedCity
  );
  useEffect(() => {
    setFieldValue(name, "");
  }, [values?.city, name, setFieldValue]);

  return (
    <div className={className}>
      <label className="block my-[0.75rem]">
        {label}
        <span className="mx-1 text-red-500">{required == "1" ? "*" : ""}</span>
      </label>
      <div className="mt-3">
        <Select
          options={options}
          name={name}
          value={selectedCity ? selectedCity : ""}
          isLoading={!!isLoading}
          isDisabled={!district?.districts?.length}
          placeholder={
            isLoading
              ? <Spinner />
              : district?.districts?.length
              ? t("chose District")
              : t("Chose city is first")
          }
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles , { isDisabled }) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              background: isDisabled ? "#cfcece" : "white", // Set red background when disabled

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
        />
      </div>
    </div>
  );
}
