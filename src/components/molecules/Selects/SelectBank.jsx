/* eslint-disable react/prop-types */
import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import useFetch from "../../../hooks/useFetch";
import { FormikError } from "../Formik/FormikError";
import Label from "../Label";
import { useIsRTL } from "../../../hooks/useIsRTL";

export default function SelectBank({
  name,
  label,
  className,
  required,
  showIcon,
  messageInfo,
}) {
  const { setFieldValue, values, handleBlur } = useFormikContext();
  const isRTL = useIsRTL()

  const { data: banks } = useFetch({
    endpoint: `banks`,
    queryKey: ["banks"],
  });
  const options = banks?.banks.map((item) => ({
    value: item.id,
    label:isRTL ? item.name_ar : item?.name_en,
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
        <div className="my-1 cursor-pointer w-fit">
          <div className="flex items-center gap-1">
            <>
              <span className="text-[10px] text-[#80b3f0]">
                {messageInfo ? messageInfo : " لمعرفة المرفق اضغط هنا"}
              </span>
              <Icon path={mdiInformationOutline} size={0.7} />
            </>
          </div>
        </div>
      )}
      <div className="mt-[0.5rem]">
        <Select
          options={options}
          name={name}
          value={selectedCountry}
          placeholder={t("Chose bank")}
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
          maxMenuHeight={250}
          menuShouldScrollIntoView
        />
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </div>
  );
}
