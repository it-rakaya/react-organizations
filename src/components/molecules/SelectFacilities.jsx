/* eslint-disable react/prop-types */
import useFetch from "../../hooks/useFetch";
import SelectComp from "./Formik/SelectComp";

export default function SelectFacilities({ name, label, placeholder }) {
  const { data: facilities } = useFetch({
    endpoint: `facilities?select=id,name`,
    queryKey: ["select_facilities"],
  });

  return (
    <div>
      <label className="block my-3">{label}</label>

      <SelectComp
        name={name}
        multi={false}
        data={facilities?.user_facilities ? facilities?.user_facilities : []}
        className="w-full"
        placeholder={"placeholder"}
        idValue={true}
      />
    </div>
  );
}
