/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import CardInfo from "./CardInfo";
import Label from "./Label";
import { useIsRTL } from "../../hooks/useIsRTL";

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
  const isRTL = useIsRTL();
  const { data: cities } = useFetch({
    endpoint: `saudi-cities`,
    queryKey: ["saudi-cities"],
  });
  const options = cities?.cities.map((item) => ({
    value: item.id,
    label: isRTL ? item.name_ar : item?.name_en,
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
          // placeholder={t("Chose city")}
          placeholder={<div className="select-placeholder-text">{t("Choose City")}</div>} 
          onChange={(option) => setFieldValue(name, option.value)}
          noOptionsMessage={() => t("Not Found Data")}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth: "1px",
              background: "white",
              margin: "0",
              height: "59px",
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
