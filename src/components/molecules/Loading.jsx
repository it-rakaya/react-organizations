/* eslint-disable react/prop-types */

import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { Rings } from "react-loader-spinner";

function Loading({ title }) {
  const theme = useTheme();

  return (
    <div
      className="absolute flex flex-col items-center justify-center z-[999999999999] loading"
      // style={{ left: "calc(50% - 100px )", top: "calc(50% - 50px)" }}
    >
      <div>
        <Rings
          visible={true}
          height="80"
          width="80"
          color={theme?.palette?.primary?.main || "#9F9685"}
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold dark:!text-white">
          {title ? (
            title
          ) : (
            <p className="text-black dark:!text-white"> {t("Loading")}</p>
          )}
        </h1>
      </div>
    </div>
  );
}

export default Loading;
