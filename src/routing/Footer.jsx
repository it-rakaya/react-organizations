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
      style={{ backgroundColor: theme?.palette?.primary?.main }}
      className=" w-[100%]  mt-5 rounded-md"
    >
      <div className="w-[98%] overflow-hidden m">
        <div className={` flex  justify-center  p-2 gap-1`}>
          <h2 className="text-white">{t("landing.rights")}</h2>
          <span className="text-white">&copy;</span>
          <h2 className="text-white">
            {`${t(
              "landing.for"
            )}${organizationName} ${new Date().getUTCFullYear()}`}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
