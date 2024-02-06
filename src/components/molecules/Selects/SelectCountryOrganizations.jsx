/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import Select from "react-select";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import useFetch from "../../../hooks/useFetch";
import Label from "../Label";
import CardInfo from "../CardInfo";
import { FormikError } from "../Formik/FormikError";
import ReactSelect from "./ReactSelect";

export default function SelectCountryOrganizations({
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
  const { setFieldValue, values, handleBlur } = useFormikContext();
  const { orgData } = UseOrg();
  console.log("🚀 ~ orgData:", orgData)

  const { data: countries } = useFetch({
    endpoint: `order-countries?organization_id=${orgData?.organizations?.id}`,
    queryKey: [`order-countries?organization_id=${orgData?.organizations?.id}`],
    enabled: !!orgData?.organizations?.id,
  });
  const options = countries?.country_organization.map((item) => ({
    value: item.country_id,
    label: item.country_name,
  }));

  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div className={`${className} mt-2`}>
  
      <ReactSelect
        options={options}
        selectedValue={selectedCountry}
        placeholder={t("Chose Country")}
        name={name}
        label={label}
        index={index}
        isMulti
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
