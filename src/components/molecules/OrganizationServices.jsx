/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import SelectComp from "./Formik/SelectComp";
import Label from "./Label";
import Select from "react-select";
import { t } from "i18next";
import { FormikError } from "./Formik/FormikError";

export default function OrganizationServices({
  name,
  label,
  className,
  required,
}) {
  const { orgData } = UseOrg();
  const { values, setFieldValue, handleBlur, touched, errors } =
    useFormikContext();

  const { data: Org_services } = useFetch({
    endpoint: `organization-services?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["select_service_organization"],
  });
  const options = Org_services?.organization_services.map((item) => ({
    value: item.id,
    label: item.service_name,
  }));

  const selectedCountry = options?.find(
    (option) => option?.value == values[name]
  );

  return (
    <div>
      <div className={`${className} mt-2`}>
        <Label>
          {label}
          <span className="mx-1 text-red-500">
            {required == "1" ? "*" : ""}
          </span>
        </Label>
        <div className="mt-[0.5rem]">
          <Select
            options={options}
            name={name}
            value={selectedCountry}
            // placeholder={t("Chose service")}
            placeholder={
              <div className="select-placeholder-text">
                {t("Chose service")}
              </div>
            }
            noOptionsMessage={() => t("Not Found Data")}
            onBlur={handleBlur}
            onChange={(option) => setFieldValue(name, option.value)}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                padding: "9.5px 0",
                borderRadius: " 8px",
                borderWidth: "1px",
                background: "white",
                margin: "0",
                height: "59px",

              }),
              option: (baseStyles) => ({
                ...baseStyles,
                background: "white",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,

              colors: {
                // ...theme.colors,
                primary25: `#eee`,
                primary: "#eee",
              },
            })}
            classNames={{
              control: () => "dark:bg-transparent dark:!border-[#555d64] border border-solid !border-[#d7d7d7]",
              option: () => "dark:bg-dark-primary dark:text-white  ",
            }}
          />
          <div>
            <FormikError name={name} />
          </div>
        </div>
      </div>
      {/* <label className="block my-3">{label}</label>

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
      /> */}
    </div>
  );
}
