/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import useFetch from "../../../hooks/useFetch";
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
  const { values } = useFormikContext();
  const { orgData } = UseOrg();

  const { data: countries } = useFetch({
    endpoint: `order-countries?organization_id=${orgData?.organizations?.id}`,
    queryKey: [`order-countries?organization_id=${orgData?.organizations?.id}`],
    enabled: !!orgData?.organizations?.id,
  });
  const options = countries?.country_organization.map((item) => ({
    value: item.id,
    label: item.country_name,
  }));

  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div className={`${className} mt-2 selectOrganization`}>
      <ReactSelect
        options={options}
        selectedValue={selectedCountry}
        placeholder={t("Choose Nationalists")}
        name={name}
        label={label}
        index={index}
        isMulti
        setIndex={setIndex}
        messageInfo={t("Please select the nationalities of the pilgrims you want to serve")}
        setShow={setShow}
        images={images}
        required={required}
        showIcon={showIcon}
        closeMenuOnSelect={false}
      />
    </div>
  );
}
