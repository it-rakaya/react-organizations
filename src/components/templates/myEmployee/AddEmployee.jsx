/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { t } from "i18next";
import { isValidSaudiID } from "saudi-id-validator";
import * as Yup from "yup";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import useFetch from "../../../hooks/useFetch";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import EmployeeMainData from "./EmployeeMainData";

export default function AddEmployee({
  facultyID,

  setSecundModal,
  showSelectFacility,
  refetch,
  setOpenAddEmployee,
}) {
  const { orgData } = UseOrg();

  const {
    mutate: AddEmployee,
    isPending: loadingEmployee,
    uploadProgress,
  } = useMutate({
    mutationKey: [`facility_employees`],
    endpoint: `facility-employees`,
    onSuccess: () => {
      notify("success", t("An employee has been added successfully"));

      if (showSelectFacility) {
        setOpenAddEmployee(false);
        refetch();
      } else {
        setSecundModal(true);
      }
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const { data: attachments_facility_employees } = useFetch({
    endpoint: `attachments-labels/facility_employees`,
    queryKey: ["attachments_facility_employees"],
  });

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("employee name is required")),
      facility_employee_position_id: Yup.string()
        .trim()
        .required(t("position name is required")),
      facility_id: showSelectFacility
        ? Yup.string().trim().required(t("facility name is required"))
        : Yup.string().trim(),
      national_id: Yup.string()
        ?.matches(/^\d{10}$/, t("The ID number must be exactly 10 digits"))
        ?.test({
          name: "isValidSaudiID",
          test: (value) => isValidSaudiID(value),
          message: t("Please enter a valid ID number"),
        }),
    });
  const handleSubmit = (values) => {
    const validAttachments = values?.attachments
      .map((file, index) => ({ index, file }))
      .filter(
        (item) => typeof item.file !== "undefined" && item.file !== "deleted"
      );
    const attachments = validAttachments.map((item) => ({
      [`attachments[${item?.index}]`]: item?.file,
    }));

    const combinedObject = {
      ...values,
      facility_id: showSelectFacility ? values?.facility_id : facultyID,
      organization_id: orgData?.organizations?.id,
      ...Object.assign({}, ...attachments),
    };
    delete combinedObject.attachments;
    AddEmployee(combinedObject);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          facility_employee_position_id: "",
          national_id: "",
          facility_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <>
            <Form>
              <EmployeeMainData
                showSelectFacility={showSelectFacility}
                attachments_facility_employees={attachments_facility_employees}
                loadingEmployee={loadingEmployee}
                uploadProgress={uploadProgress}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
