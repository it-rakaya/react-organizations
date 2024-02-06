import { t } from "i18next";
import React from "react";
import ExcuseMeIcon from "../atoms/icons/ExcuseMeIcon";

function RegistrationClosed() {
  return (
    <div>
      {" "}
      <div className="mt-5 h-[259px]">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="">
            <ExcuseMeIcon className={""} />
          </div>
        </div>

        <div
          className="main_content max-h-[450px] overflow-y-scroll scroll_main mt-5  flex items-center justify-center"
          style={{ height: "calc(100% - 120px)" }}
        >
          <p className="p-0 m-0 text-xl font-bold text-center text-black dark:text-white">
            {t("Sorry , Registration period is closed")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationClosed;
