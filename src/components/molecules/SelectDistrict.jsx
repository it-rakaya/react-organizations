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
  images
}) {
  const { setFieldValue, values } = useFormikContext();

  const { data: district, isLoading } = useFetch({
    endpoint: `saudi-districts?city_id=${values?.city_id}`,
    queryKey: [`district/${values?.city_id}`],
    enabled: !!values?.city_id,
  });
  const options = district?.districts?.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));
  const selectedDistrict = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div className={className}>
     <Label>
            {label}
            <span className="mx-1 text-red-500">
              {required == "1" ? "*" : ""}
            </span>
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
          options={options}
          name={name}
          value={selectedDistrict ? selectedDistrict : ""}
          isLoading={!!isLoading}
          isDisabled={!district?.districts?.length}
          placeholder={
            isLoading ? (
              <Spinner />
            ) : district?.districts?.length ? (
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
              borderWidth:"1px",
              // borderColor:district?.districts?.length ? "red" : "#555d64",
              background: !district?.districts?.length ? "#cecfcf" : "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              background:"white" ,
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
          }}
        />
      </div>
    </div>
  );
}
