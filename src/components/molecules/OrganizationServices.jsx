/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import ReactSelect from "./Selects/ReactSelect";

export default function OrganizationServices({
  name,
  label,
  className,
  required,
}) {
  const { orgData } = UseOrg();
  const { values } = useFormikContext();

  const { data: Org_services } = useFetch({
    endpoint: `organization-services?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["select_service_organization"],
  });
  const options = Org_services?.organization_services.map((item) => ({
    value: item.id,
    label: item.service_name,
  }));

  const selectedValue = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div>
      <div className={`${className} mt-2`}></div>
      <ReactSelect
        options={options}
        selectedValue={selectedValue}
        placeholder={t("Choose The Provided Service")}
        name={name}
        label={label}
        required={required}
      />
    </div>
  );
}
