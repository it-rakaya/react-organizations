import { t } from "i18next";
import { Link } from "react-router-dom";
import ButtonComp from "../components/atoms/buttons/ButtonComp";
import ErrorIcon404 from "../components/atoms/icons/ErrorIcon404";

export const ErrorPage = () => {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="d">
          <div className="flex flex-col justify-center w-auto gap-x-3">
            <div className="w-full">
              <ErrorIcon404 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
