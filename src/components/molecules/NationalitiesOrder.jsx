/* eslint-disable react/prop-types */
import { t } from "i18next";

function NationalitiesOrder({ data }) {
  return (
    <div>
      {data?.length ? (
        data?.map((item) => (
          <>
            <ul>
              <li className="m-5 font-semibold text-black dark:text-white" style={{listStyle:"disc"}}>
                <p className="font-semibold text-black dark:text-white">
                  {item}
                </p>
              </li>
            </ul>
          </>
        ))
      ) : (
        <div className="mt-10 text-2xl font-bold text-black dark:text-white">
          {" "}
          {t("There is no nationalities")}
        </div>
      )}
    </div>
  );
}

export default NationalitiesOrder;
