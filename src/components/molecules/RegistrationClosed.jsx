import { t } from "i18next";
import ExcuseMeIcon from "../atoms/icons/ExcuseMeIcon";

function RegistrationClosed() {
  return (
    <div className="">
      {" "}
      <div className="mt-5 h-[160px] flex flex-col justify-center items-center" >
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="">
            <ExcuseMeIcon className={""} />
          </div>
        </div>

        <div
          className="flex items-center justify-center mt-5 overflow-y-scroll main_content scroll_main"
          style={{ height: "calc(100% - 111px)" }}
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
