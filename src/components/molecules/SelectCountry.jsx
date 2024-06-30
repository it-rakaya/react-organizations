/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";
import ReactSelect from "./Selects/ReactSelect";

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
  setShow,
}) {
  const { values } = useFormikContext();
  const isRTL = useIsRTL();

  const { data: countries } = useFetch({
    endpoint: `countries`,
    queryKey: ["countries"],
  });
  const options = countries?.countries.map((item) => ({
    value: item.id,
    label: isRTL ? item.name_ar : item?.name_en,
  }));

  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div className={`${className} mt-2`}>
      <ReactSelect
        options={options}
        selectedValue={selectedCountry}
        placeholder={t("Choose Country")}
        name={name}
        label={label}
        index={index}
        setIndex={setIndex}
        messageInfo={messageInfo}
        setShow={setShow}
        images={images}
        required={required}
        isDisabled={values.national_id.startsWith("1")}
        showIcon={showIcon}
      />
    </div>
  );
}
