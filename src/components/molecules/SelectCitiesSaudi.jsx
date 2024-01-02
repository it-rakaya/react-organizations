/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
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
      {/* <label className="block my-[0.75rem]">
        {label}
        <span className="mx-1 text-red-500">{required == "1" ? "*" : ""}</span>
      </label> */}
      <Label>
        {label}
        <span className="mx-1 text-red-500">{required == "1" ? "*" : ""}</span>
      </Label>
      {showIcon && (
        <div
          className="my-1 cursor-pointer w-fit"
          onClick={() => {
            setShow(true);
            setIndex(index);
          }}
        >
          <div className="flex items-center gap-1">
            <>
              <span className="text-[10px] text-[#80b3f0]">
                {" "}
                لمعرفة المرفق اضغط هنا
              </span>
              <Icon path={mdiInformationOutline} size={0.7} />
            </>
          </div>
        </div>
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
          // defaultValue={{ value: values[name] , label:values[name] }}
        />
      </div>
    </div>
  );
}
