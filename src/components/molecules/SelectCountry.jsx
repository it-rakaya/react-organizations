/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import CardInfo from "./CardInfo";
import { FormikError } from "./Formik/FormikError";
import Label from "./Label";

export default function SelectCountry({
  name,
  label,
  className,
  required,
  showIcon,
  messageInfo,
  setIndex,
  index,
  images,
  setShow
}) {
  const { setFieldValue, values, handleBlur } = useFormikContext();

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
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth: "1px",
              // borderColor:"#555d64" ,
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              background: "white",
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
            control: () => "dark:bg-dark-primary dark:border-[#555d64]",
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
