/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import OrderMainData from "./OrderMainData";

export default function AddOrder({ setOpenAddFaculty }) {
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: AddOrder, isPending } = useMutate({
    mutationKey: [`create_new_orders`],
    endpoint: `orders`,
    onSuccess: (data) => {
      queryClient.refetchQueries(["my_orders"]);
      notify("success");
      setOpenAddFaculty(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  return (
    <div>
      <Formik
        initialValues={{ facility_id: "", organization_service_id: "" }}
        onSubmit={(values) => {
          const answers = {};
          const hasFieldStartingWithAnswers = Object.keys(values).filter(
            (fieldName) => fieldName.startsWith("answers")
          );

          // if (hasFieldStartingWithAnswers.length > 0) {
            hasFieldStartingWithAnswers.forEach((fieldName) => {
              const answerIndex = fieldName.slice(7); // Get the index from the field name
              answers[`answers[${answerIndex}]`] = values[fieldName];
            });
            const formData = {
              facility_id: values.facility_id,
              organization_service_id: values.organization_service_id,
              ...answers,
            };
            AddOrder(formData);
          // } else {
            console.log("No");
          // }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <OrderMainData setShow={setShow} show={show} />
            {!show && (
              <div className="flex justify-center gap-5 mt-10">
                <ButtonComp
                  className={"w-auto"}
                  variant="outlined"
                  action={() => setShow(true)}
                >
                  رجوع
                </ButtonComp>
                <ButtonComp
                  className={"w-auto"}
                  type={"submit"}
                  loading={isPending}
                >
                  حفظ
                </ButtonComp>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
