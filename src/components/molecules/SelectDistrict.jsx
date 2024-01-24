/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import Spinner from "../atoms/Spinner";
import CardInfo from "./CardInfo";
import Label from "./Label";

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
  console.log(values?.city_id);
  const { data: district, isLoading } = useFetch({
    endpoint: `saudi-districts`,
    queryKey: [`district`],
    // enabled: !!values?.city_id,
  });

  const filteredOptions = district?.districts
    ?.filter((item) => item.city_id == values.city_id)
    ?.map((item) => ({
      value: item.id,
      label: item.name_ar,
      city_id: item.city_id,
    }));

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
              t("chose District")
            ) : (
              t("Chose city is first")
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
