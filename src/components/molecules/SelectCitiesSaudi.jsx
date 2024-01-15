/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import CardInfo from "./CardInfo";
import Label from "./Label";

export default function SelectCitiesSaudi({
  name,
  label,
  className,
  required,
  showIcon,
  setShow,
  setIndex,
  index,
  messageInfo,
  images,
}) {
  const { setFieldValue, values } = useFormikContext();
  const { data: cities } = useFetch({
    endpoint: `saudi-cities`,
    queryKey: ["saudi-cities"],
  });
  const options = cities?.cities.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));
  const selectedCity = options?.find((option) => option?.value == values[name]);

  return (
    <div className={className}>
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
          value={selectedCity}
          placeholder={t("Chose city")}
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth: "1px",
              // borderColor:"#555d64",
              background: "white",
              margin: "0",
              // zIndex:"9999999"
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
          // defaultValue={{ value: values[name] , label:values[name] }}
        />
      </div>
    </div>
  );
}
