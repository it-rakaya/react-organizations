/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-extra-boolean-cast */
import { t } from "i18next";
import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
};

const STYLES = {
  success: "text-mainGreen",
  error: "bg-red-500 text-white",
  info: "bg-blue-300 text-white",
};

export const notify = (type = "success", msg, position = "top-right") => {
  let message = msg || t("operation accomplished successfully");

  if (type === "error" && !!!msg) {
    message = "حدث خطأ ما ، حاول لاحقاً";
  }
  const className = STYLES[type];

  toast[type](message, {
    ...toastOptions,
    className,
    position,
  });
};
