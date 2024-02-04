/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import Spinner from "../atoms/Spinner";
import CardInfo from "./CardInfo";
import Label from "./Label";
import { useIsRTL } from "../../hooks/useIsRTL";
import { useEffect } from "react";

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
  const isRTL = useIsRTL();
  const { data: district, isLoading } = useFetch({
    endpoint: `saudi-districts`,
    queryKey: [`district`],
    // enabled: !!values?.city_id,
  });

  useEffect(() => {
    if (district && district.districts && values.city_id) {
      const districtsInCity = district.districts.filter(
        (item) => item.city_id == values.city_id
      );

      if (districtsInCity.length === 0) {
        const otherDistrict = district.districts.find(
          (item) => item.name_en.toLowerCase() === "other"
        );
        if (otherDistrict) {
          setFieldValue(name, otherDistrict.id);
        }
      } else {
        const districtExists = districtsInCity.some(
          (item) => item.id == values[name]
        );
        if (!districtExists) {
          setFieldValue(name, "");
        }
      }
    }
  }, [values.city_id, district, setFieldValue, name, values[name], isRTL]);


  const filteredOptions = district?.districts
    ?.filter((item) => item.city_id == values.city_id)
    ?.map((item) => ({
      value: item.id,
      label: isRTL ? item.name_ar : item.name_en,
      city_id: item.city_id,
    }));
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
                {t("Choose City is first")}
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
