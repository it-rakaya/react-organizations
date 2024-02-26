/* eslint-disable react/prop-types */
import { t } from "i18next";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";
import { useTheme } from "@mui/material/styles";

function NationalitiesOrder({ data }) {
  const theme = useTheme();

  // تقسيم البيانات إلى صفوف، حيث كل صف يحتوي على 3 عناصر
  const rows = [];
  for (let i = 0; i < data.length; i += 4) {
    rows.push(data.slice(i, i + 4));
  }

  return (
    <div className="mt-5">
      {data?.length ? (
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-3 mb-5 md:grid-cols-4 ify-center">
            {row.map((item, index) => (
              <div
                className="col-span-1 p-1 px-2 text-center rounded-md"
                key={index}
                style={{
                  background: theme?.palette?.primary.main,
                  opacity: 0.8,
                }}
              >
                <p className="font-semibold text-black dark:text-white">{item}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="flex flex-col mt-10 text-2xl font-bold justify-center items-center h-[42vh]">
          <TermsConditionIcon />
          <p className="mt-10 text-black dark:text-white">
            {t("There is no nationalities")}
          </p>
        </div>
      )}
    </div>
  );
}

export default NationalitiesOrder;
