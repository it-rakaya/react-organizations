/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import Spinner from "../atoms/Spinner";
import CardInfo from "./CardInfo";
import Label from "./Label";
import { useIsRTL } from "../../hooks/useIsRTL";

export default function SelectDistrict({
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
  console.log("🚀 ~ values:", values[name])
  const isRTL = useIsRTL();
  const { data: district, isLoading } = useFetch({
    endpoint: `saudi-districts`,
    queryKey: [`district`],
    // enabled: !!values?.city_id,
  });

  const filteredOptions = district?.districts
  ?.filter((item) => item.city_id == values.city_id)
  ?.map((item) => ({
    value: item.id,
    label: isRTL ? item.name_ar : item.name_en,
    city_id: item.city_id,
  }));
  console.log("🚀 ~ filteredOptions:", filteredOptions)
  const other = district?.districts.find(
    (option) => option?.name_en == "Other"
  );
  if (!filteredOptions || filteredOptions.length === 0) {
    filteredOptions?.push({
      value: other?.id,
      label: other?.name_ar,
      city_id: values.city_id,
    });
  }

  const selectedDistrict = filteredOptions?.find(
    (option) => option?.value == values[name]
  );

  console.log("🚀 ~ selectedDistrict:", selectedDistrict)
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
      <div>
        <Select
          options={filteredOptions}
          name={name}
          value={selectedDistrict ? selectedDistrict : ""}
          isLoading={!!isLoading}
          isDisabled={!values?.city_id}
          noOptionsMessage={() => t("Not Found Data")}
          placeholder={
            isLoading ? (
              <Spinner />
            ) : values?.city_id ? (
              <div className="select-placeholder-text">
                {t("chose District")}
              </div>
            ) : (
              <div className="select-placeholder-text">
                {t("Chose city is first")}
              </div>
            )
          }
          className="$"
          onChange={(option) => setFieldValue(name, option.value)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth: "1px",
              // borderColor:district?.districts?.length ? "red" : "#555d64",
              background: !values?.city_id ? "#cecfcf" : "white",
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
              // ...theme.colors,
              primary25: `#eee`,
              primary: "#eee",
            },
          })}
          classNames={{
            control: () => "dark:bg-dark-primary dark:border-[#555d64]",
            option: () => "dark:bg-dark-primary dark:text-white  ",
            menu: () => " bg-white dark:bg-dark-primary dark:text-white  ",
          }}
        />
      </div>
    </div>
  );
}
