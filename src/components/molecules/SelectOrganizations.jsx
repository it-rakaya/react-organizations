/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch"
import SelectComp from "./Formik/SelectComp"

export default function SelectOrganizations({

  name,
  multi,
  label
}) {
  const {
    data: organizations,
  } = useFetch({
    endpoint: `organizations`,
    queryKey: ['organizations'],
    onSuccess() {
    },
  })

  // const countriesOptions = countries?.map(state => ({
  //   value: state.id,
  //   label: state.name_ar
  // }))

  return (
    <div>
      <SelectComp
        multi={multi ? true : false}
        name={name}
        data={organizations?.organizations ? organizations?.organizations : []}
        label={label}
        idValue
        className='w-full'
        placeholder='المنظمه'
      />
    </div>
  )
}
