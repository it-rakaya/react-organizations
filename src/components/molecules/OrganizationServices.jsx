/* eslint-disable react/prop-types */
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import SelectComp from "./Formik/SelectComp";

export default function OrganizationServices({ name, label }) {
  const { orgData } = UseOrg();

  const { data: Org_services } = useFetch({
    endpoint: `organization-services?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["select_service_organization"],

  });
  console.log("🚀 ~ file: OrganizationServices.jsx:14 ~ OrganizationServices ~ Org_services:", Org_services)
  return (
    <div>
      <label className="block my-3">{label}</label>

      <SelectComp
        name={name}
        multi={false}
        data={
          Org_services?.organization_services
            ? Org_services?.organization_services
            : []
        }
        className="w-full"
        placeholder="الدوله"
        idValue={true}
      />
    </div>
  );
}
