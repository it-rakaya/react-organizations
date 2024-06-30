/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import useFetch from "../../../hooks/useFetch";
import { useIsRTL } from "../../../hooks/useIsRTL";
import ReactSelect from "./ReactSelect";

export default function SelectBank({
  name,
  label,
  className,
  required,
  showIcon,
  index,
  messageInfo,
  setIndex,
  setShow,
  images,
}) {
  const { values } = useFormikContext();
  const isRTL = useIsRTL();

  const { data: banks } = useFetch({
    endpoint: `banks`,
    queryKey: ["banks"],
  });
  const options = banks?.banks.map((item) => ({
    value: item.id,
    label: isRTL ? item.name_ar : item?.name_en,
  }));

  const selectedBack = options?.find((option) => option?.value == values[name]);

  return (
    <div className={`${className} mt-2`}>
      <ReactSelect
        options={options}
        selectedValue={selectedBack}
        placeholder={t("Choose Bank")}
        name={name}
        label={label}
        index={index}
        setIndex={setIndex}
        messageInfo={messageInfo}
        setShow={setShow}
        images={images}
        required={required}
        showIcon={showIcon}
      />
    </div>
  );
}
