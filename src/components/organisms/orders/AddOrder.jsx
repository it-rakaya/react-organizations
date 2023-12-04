/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Formik } from "formik";
import { useState } from "react";
import { notify } from "../../../utils/toast";
import MainButton from "../../molecules/Formik/MainButton";
import OrderMainData from "./OrderMainData";
import { useQueryClient } from "@tanstack/react-query";
import { useMutate } from "../../../hooks/useMutate";
import { Button } from "@mui/material";
import ButtonComp from "../../atoms/buttons/ButtonComp";

export default function AddOrder({setOpenAddFaculty}) {
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient()


  const { mutate: AddOrder } = useMutate({
    mutationKey: [`create_new_orders`],
    endpoint: `orders`,
    onSuccess: (data) => {
      queryClient.refetchQueries(["my_orders"])
      notify("success");
      setOpenAddFaculty(false)
    },

    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
    formData:true
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
      
          if (hasFieldStartingWithAnswers.length > 0) {
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
            console.log("🚀 ~ file: AddOrder.jsx:30 ~ AddOrder ~ values:", formData)

          } else {
            console.log("No");
          }
        }}
      >
        <Form>
          <OrderMainData setShow={setShow} show={show} />
          {!show && (
            <div className="flex justify-center gap-5 mt-10">
              <ButtonComp className={'w-auto'}  variant="outlined" action={() => setShow(true)} >رجوع</ButtonComp>
              <ButtonComp className={'w-auto'} type={"submit"}  >حفظ</ButtonComp>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
}
