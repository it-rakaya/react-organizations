/* eslint-disable react/prop-types */
import { t } from "i18next";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";
import { useTheme } from "@mui/material/styles";
import Line from "../atoms/Line";

function NationalitiesOrder({ data }) {
  const theme = useTheme();

  // تقسيم البيانات إلى صفوف، حيث كل صف يحتوي على 3 عناصر
  const rows = [];
  for (let i = 0; i < data.length; i += 5) {
    rows.push(data.slice(i, i + 5));
  }

  return (
    <div className="mt-5">
      {data?.length ? (
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-3 mb-5">
            {row.map((item, index) => (
              <div
                className="p-1 px-2 rounded-md w-[160px] text-center"
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
