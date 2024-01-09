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
    <div
      className=" w-[100%]  mt-5 rounded-md bg-white dark:bg-darkModeColor footer_shadow"
    >
      <div className="w-[98%] overflow-hidden m">
        <div className={` flex  justify-center  p-2 gap-1`}>
          <h2 className="text-black dark:text-white">{t("landing.rights")}</h2>
          <h2 className="text-black dark:text-white">
            {`${t("landing.for")}دى شركة  ركايا 
            `}
            <span className="text-black dark:text-white">&copy;</span>
            {new Date().getUTCFullYear()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
