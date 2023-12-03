/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import MainButton from "../../molecules/Formik/MainButton";
import OrganizationServices from "../../molecules/OrganizationServices";
import SelectFacilities from "../../molecules/SelectFacilities";
import useFetch from "../../../hooks/useFetch";
import QuestionBaseInput from "../../molecules/Formik/QuestionBaseInput";

export default function OrderMainData({ setShow, show }) {
  const { values } = useFormikContext();
  const { data: extra_questions } = useFetch({
    endpoint: `orders/create?organization_service_id=${values.organization_service_id}`,
    queryKey: [`extra_questions/${values.organization_service_id}`],
    onError(e) {
      console.log("e", e);
    },
    enabled: !!values.organization_service_id,
  });

  return (
    <div className="mt-10">
      {show ? (
        <>
          <div className="mb-3">
            <SelectFacilities label={"اختر اسم المنشأة"} name={"facility_id"} />
          </div>
          <div className="mb-3">
            <OrganizationServices
              label={"اختر نوع الخدمة المقدمة"}
              name="organization_service_id"
            />
          </div>
          <div className="flex justify-end mt-10">
            <MainButton text={"متابعه"} action={() => setShow(false)} />
          </div>
        </>
      ) : extra_questions?.questions?.length ? (
        extra_questions?.questions?.map((item) => (
          <ul key={item?.id}>
            {item?.is_visible == "1" && (
              <>
                <li className="font-bold">
                  {item?.content}{" "}
                  <span className="text-red-500">
                    {item?.is_required == "1" ? "*" : ""}
                  </span>{" "}
                  ؟
                </li>
                <QuestionBaseInput
                  type={item?.question_type?.name}
                  name={item?.id}
                  idQuestion={item?.id}
                  options={item?.options || []}
                />
              </>
            )}
          </ul>
        ))
      ) : (
        <div className="my-10 text-3xl font-bold text-center">لايوجد اساله</div>
      )}
    </div>
  );
}
