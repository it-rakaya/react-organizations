/* eslint-disable react/prop-types */
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import SelectComp from "./Formik/SelectComp";

export default function OrganizationServices({ name, label }) {
  const { orgData } = UseOrg();

  const { data: Org_services } = useFetch({
    endpoint: `organization-services?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["select_service_organization"],
    onError(e) {
      console.log("e", e);
    },
  });
  return (
    <div>
      <label className="block mb-3">{label}</label>

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
