/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import useFetch from "../../../hooks/useFetch";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import QuestionBaseInput from "../../molecules/Formik/QuestionBaseInput";
import OrganizationServices from "../../molecules/OrganizationServices";
import SelectFacilities from "../../molecules/SelectFacilities";
import MainHeader from "../../atoms/MainHeader";
import { useTheme } from "@mui/material/styles";

export default function OrderMainData({ setShow, show, isPending }) {
  const { values } = useFormikContext();
  const { data: extra_questions } = useFetch({
    endpoint: `orders/create?organization_service_id=${values.organization_service_id}`,
    queryKey: [`extra_questions/${values.organization_service_id}`],
    enabled: !!values.organization_service_id,
  });
  console.log("🚀 ~ file: OrderMainData.jsx:19 ~ OrderMainData ~ extra_questions:", extra_questions)
  const theme = useTheme();

  return (
    <div className="mt-10">
      <MainHeader
        title={t("Add orders")}
        styleHead={{ color: theme.palette.primary.main }}
      />
      {show ? (
        <>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
            <div className="mb-3">
              <SelectFacilities
                label={t("Choose the facility name")}
                name={"facility_id"}
                placeholder={t("Choose the facility name")}
              />
            </div>
            <div className="mb-3">
              <OrganizationServices
                label={t("Choose the type of service provided")}
                name="organization_service_id"
                placeholder={t("Choose the type of service provided")}
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <ButtonComp
              variant="contained"
              className={"w-auto"}
              action={() =>
                extra_questions?.questions?.length ? setShow(false) : ""
              }
              disabled={
                values.facility_id == "" || values.organization_service_id == ""
              }
              loading={isPending}
              type={extra_questions?.questions?.length ? "button" : "submit"}
            >
              {t("Continue")}
            </ButtonComp>
          </div>
        </>
      ) : extra_questions?.questions?.length ? (
        extra_questions?.questions?.map((item) => (
          <ul key={item?.id}>
            {item?.is_visible == "1" && (
              <>
                <li className="my-3 font-bold">
                  {item?.content}{" "}
                  <span className="text-red-500">
                    {item?.is_required == "1" ? "*" : ""}
                  </span>{" "}
                </li>
                <QuestionBaseInput
                  type={item?.question_type?.name}
                  name={item?.id}
                  placeholder={item?.placeholder}
                  idQuestion={item?.id}
                  options={item?.options || []}
                />
              </>
            )}
          </ul>
        ))
      ) : (
        <div className="my-10 text-3xl font-bold text-center">
          {t("There is no question")}
        </div>
      )}
    </div>
  );
}
