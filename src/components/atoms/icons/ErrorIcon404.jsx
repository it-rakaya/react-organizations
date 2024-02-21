import { t } from "i18next";

function ErrorIcon404() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl text-center text-black dark:text-white">{t("Server Error")}</h1>
        <img src="/404.png" className="w-1/3 h-full m-auto" />
      </div>
    </div>
  );
}

export default ErrorIcon404;
