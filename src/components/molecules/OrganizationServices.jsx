/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch"
import SelectComp from "./Formik/SelectComp"

export default function OrganizationServices({ name,  label }) {
  const {
    data: Org_services,
} = useFetch({
    endpoint: `organization-services`,
    queryKey: ['select_service_organization'],
    onError(e) {
      console.log('e', e)
    }
})
  return (
    <div>
      <label>{label}</label>

      <SelectComp
        name={name}
        multi={false}
        data={Org_services?.organization_services ? Org_services?.organization_services : []}
        className='w-full'
        placeholder='الدوله'
        idValue={true}
      />
    </div>
  )
}
