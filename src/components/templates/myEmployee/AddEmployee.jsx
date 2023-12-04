/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import EmployeeMainData from "./EmployeeMainData";
import * as Yup from "yup";
import { t } from "i18next";

export default function AddEmployee({
  facultyID,
  setOpenAddEmployee,
  refetch,
}) {
  const { mutate: AddEmployee, isLoading: loadingEmployee } = useMutate({
    mutationKey: [`facility_employees`],
    endpoint: `facility-employees`,
    onSuccess: () => {
      notify("success");
      setOpenAddEmployee(false);
      refetch();
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const validationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("employee name is required")),
      position: Yup.string().trim().required(t("position name is required")),
      work_card_photo: Yup.string()
        .trim()
        .required(t("work card photo is required")),
      health_photo: Yup.string().trim().required(t("health photo is required")),
    });

  return (
    <div>
      <Formik
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          AddEmployee({ ...values, facility_id: facultyID });
        }}
      >
        <Form>
          <EmployeeMainData />
          <div className="flex justify-end">
            <ButtonComp
              loading={loadingEmployee}
              type="submit"
              variant="contained"
              className=" !rounded-md  w-auto "
            >
              اضافة
            </ButtonComp>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
