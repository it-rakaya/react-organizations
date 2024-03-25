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
import SelectCountryOrganizations from "../../molecules/Selects/SelectCountryOrganizations";


export default function OrderMainData({
  setShow,
  show,
  isPending,
  uploadProgress,
}) {
  const { values } = useFormikContext();
  const theme = useTheme();
  const { data: extra_questions } = useFetch({
    endpoint: `orders/create?organization_service_id=${values?.organization_service_id}`,
    queryKey: [`extra_questions/`],
    enabled: !!values.organization_service_id,
  });
  
  const requiredQuestionIds =
    extra_questions?.questions
      .filter((item) => item?.is_required === "1")
      .map((item) => item?.id) || [];

  const allRequiredQuestionsFound = requiredQuestionIds?.every(
    (id) =>
      Object.keys(values).includes(`answers${id}`) &&
      values[`answers${id}`] !== ""
  );

  return (
    <div>
      <MainHeader
        title={t("New Order")}
        styleHead={{ color: theme.palette.primary.main }}
      />

      <div className="mt-10 px-5 md:max-h-[26rem]   h-full overflow-y-scroll scroll_main ">
        {show ? (
          <div className="">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-2 ">
              <div className="col-span-2 mb-3 md:col-span-1">
                <SelectFacilities
                  label={t("Facility Name")}
                  name={"facility_id"}
                  required
                />
              </div>
              <div className="col-span-2 mb-3 md:col-span-1">
                <OrganizationServices
                  label={t("Provided Service")}
                  name="organization_service_id"
                  required
                />
              </div>
              <div className="col-span-2 mb-3">
                <SelectCountryOrganizations
                  label={t("Nationalities of Pilgrims")}
                  showIcon
                  name="country_ids"
                />
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <ButtonComp
                variant="contained"
                className={"!w-auto"}
                action={() =>
                  extra_questions?.questions?.length ? setShow(false) : ""
                }
                disabled={
                  values.facility_id == "" ||
                  values.organization_service_id == ""
                }
                loading={isPending}
                type={extra_questions?.questions?.length ? "button" : "submit"}
              >
                {t("Continue")}
              </ButtonComp>
            </div>
          </div>
        ) : extra_questions?.questions?.length ? (
          extra_questions?.questions?.map((item) => (
            <ul key={item?.id}>
              {item?.is_visible == "1" && (
                <>
                  <li className="my-3 font-bold text-black dark:text-white">
                    {item?.content}
                    <span className="text-red-500">
                      {item?.is_required == "1" ? "*" : ""}
                    </span>
                  </li>
                  <QuestionBaseInput
                    type={item?.question_type_name}
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
      {!show && (
        <div className="flex justify-end gap-5 px-3 md:px-8">
          <ButtonComp
            className={"!w-auto"}
            variant="outline"
            action={() => setShow(true)}
          >
            {t("Back")}
          </ButtonComp>
          <ButtonComp
            className={"!w-auto"}
            type={"submit"}
            loading={isPending}
            status={uploadProgress}
            disabled={!allRequiredQuestionsFound}
          >
            {t("Save")}
          </ButtonComp>
        </div>
      )}
    </div>
  );
}
