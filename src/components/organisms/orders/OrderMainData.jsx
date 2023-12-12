/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import useFetch from "../../../hooks/useFetch";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import QuestionBaseInput from "../../molecules/Formik/QuestionBaseInput";
import OrganizationServices from "../../molecules/OrganizationServices";
import SelectFacilities from "../../molecules/SelectFacilities";

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
  console.log(
    "🚀 ~ file: OrderMainData.jsx:20 ~ OrderMainData ~ extra_questions:",
    extra_questions
  );

  return (
    <div className="mt-10">
      {show ? (
        <>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="mb-3">
              <SelectFacilities
                label={"اختر اسم المنشأة"}
                name={"facility_id"}
                placeholder={"اختر اسم المنشاه"}
              />
            </div>
            <div className="mb-3">
              <OrganizationServices
                label={"اختر نوع الخدمة المقدمة"}
                name="organization_service_id"
                placeholder={"اختر نوع الخدمة المقدمة"}
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <ButtonComp
              variant="contained"
              className={"w-auto"}
              action={() => setShow(false)}
              disabled={
                values.facility_id == "" || values.organization_service_id == ""
              }
            >
              {t("Continue")}
            </ButtonComp>
          </div>
        </>
      ) : extra_questions?.questions?.length ? (
        extra_questions?.questions?.map((item) => (
          <ul key={item?.id}>
            {item?.is_visible == "1" ? (
              <>
                <li className="my-3 font-bold">
                  {item?.content}{" "}
                  <span className="text-red-500">
                    {item?.is_required == "1" ? "*" : ""}
                  </span>{" "}
                  ؟
                </li>
                <QuestionBaseInput
                  type={item?.question_type?.name}
                  name={item?.id}
                  placeholder={item?.placeholder}
                  idQuestion={item?.id}
                  options={item?.options || []}
                />
              </>
            ) : item?.is_visible == "0" &&
              extra_questions?.questions?.length == 1 ? (
              <div className="my-10 text-3xl font-bold text-center">
                لايوجد اساله
              </div>
            ) : (
              ""
            )}
          </ul>
        ))
      ) : (
        <div className="my-10 text-3xl font-bold text-center">لايوجد اساله</div>
      )}
    </div>
  );
}
