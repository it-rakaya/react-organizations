/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import EmployeeMainData from "./EmployeeMainData";
import { isValidSaudiID } from "saudi-id-validator"

export default function AddEmployee({ facultyID, setSecundModal }) {
  const { mutate: AddEmployee, isPending: loadingEmployee } = useMutate({
    mutationKey: [`facility_employees`],
    endpoint: `facility-employees`,
    onSuccess: () => {
      notify("success");
      setSecundModal(true);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  const validationSchema = () =>
    Yup.object({
      name: Yup.string().trim().required(t("employee name is required")),
      position: Yup.string().trim().required(t("position name is required")),
      national_id: Yup.string()
      .matches(/^\d{10}$/, t("The ID number must be exactly 10 digits"))
      .test({
        name: 'isValidSaudiID',
        test: (value) => isValidSaudiID(value),
        message: t('Invalid Saudi ID'),
      })
    });

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          position: "",
          national_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const validAttachments = values?.attachments
            .map((file, index) => ({ index, file }))
            .filter((item) => typeof item.file !== "undefined");
          const attachments = validAttachments.map((item) => ({
            [`attachments[${item?.index}]`]: item?.file,
          }));

          const combinedObject = {
            ...values,
            facility_id: facultyID,
            ...Object.assign({}, ...attachments),
          };
          delete combinedObject.attachments;
          AddEmployee(combinedObject);
        }}
      >
        <Form>
          <EmployeeMainData />
          <div className="flex justify-end">
            <ButtonComp
              loading={loadingEmployee}
              type="submit"
              variant="contained"
              className=" !rounded-md  !w-auto  mt-5"
            >
              {t("Add")}
            </ButtonComp>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
