/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { UseOrg } from "../context/organization provider/OrganizationProvider";

const Footer = () => {
  const theme = useTheme();
  const { orgData } = UseOrg();
  const organizationName = !orgData?.organizations?.name_ar
    ? t("landing.organizationName")
    : orgData?.organizations?.name_ar;

  return (
    <div className=" w-[100%]  mt-5 rounded-md ">
      <div className="w-[98%] overflow-hidden m">
        <div
          className={` flex  justify-center flex-col md:flex-row items-center  p-2 gap-1`}
        >
          <h2 className="text-sm text-center text-black md:text-base dark:text-white">
            <span className=" text-[14px]">
              {t("landing.rights")} لدى شركة ركايا
            </span>
            <span></span>{" "}
            <span className="text-xs text-black dark:text-white  text-[14px]">
              &copy;
            </span>
            <span className=" text-[14px]">{new Date().getUTCFullYear()}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
