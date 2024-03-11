/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import useFetch from "../../hooks/useFetch";
import ReactSelect from "./Selects/ReactSelect";

export default function SelectFacilities({ name, label, required, className }) {
  const { values} = useFormikContext();
  const { data: facilities } = useFetch({
    endpoint: `facilities?select=id,name`,
    queryKey: ["select_facilities"],
  });

  const options = facilities?.user_facilities.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );
  return (
    <div>
      <div className={`${className} mt-2`}>
        <ReactSelect
          options={options}
          selectedValue={selectedCountry}
          placeholder={t("Choose facility")}
          name={name}
          label={label}
          required={required}
        />
      </div>
    </div>
  );
}
