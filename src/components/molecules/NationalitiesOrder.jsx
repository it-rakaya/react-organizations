/* eslint-disable react/prop-types */
import { t } from "i18next";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";

function NationalitiesOrder({ data }) {
  return (
    <div>
      {data?.length ? (
        data?.map((item) => (
          <>
            <ul>
              <li
                className="m-5 font-semibold text-black dark:text-white"
                style={{ listStyle: "disc" }}
              >
                <p className="font-semibold text-black dark:text-white">
                  {item}
                </p>
              </li>
            </ul>
          </>
        ))
      ) : (
        <div className="flex flex-col mt-10 text-2xl font-bold justify-center items-center h-[42vh] ">
          <div>
            <TermsConditionIcon />
          </div>
          <p className="mt-10 text-black dark:text-white ">
            {" "}
            {t("There is no nationalities")}
          </p>
        </div>
      )}
    </div>
  );
}

export default NationalitiesOrder;
