/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch"
import SelectComp from "./Formik/SelectComp"

export default function SelectFacilities({ name,  label }) {
  const {
    data: facilities,
  } = useFetch({
    endpoint: `facilities?select=id,name`,
    queryKey: ['select_facilities'],
    onError(e) {
      console.log('e', e)
    }
  })



  return (
    <div>
      <label className="block mb-3">{label}</label>

      <SelectComp
        name={name}
        multi={false}
        data={facilities?.user_facilities ? facilities?.user_facilities : []}
        className='w-full'
        placeholder='الدوله'
        idValue={true}
      />
    </div>
  )
}
