/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../hooks/useMutate";
import { useSettings } from "../../hooks/useSettings";
import ModeToggler from "../organisms/Navbar/ModeToggler";

function Navbar({ hidden }) {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { orgData } = UseOrg();
  const { logout, token } = useAuth();
  const theme = useTheme();
  const { settings, saveSettings } = useSettings();

  const { mutate: LogOut } = useMutate({
    mutationKey: [`Log_out`],
    endpoint: `logout`,
  });
  const handleLangItemClick = (lang) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.dir = language == "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute(
      "dir",
      language == "ar" ? "rtl" : "ltr"
    );
  }, [language]);

  useEffect(() => {
    if (settings.mode == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [settings.mode]);

  const handleLogout = () => {
    logout();
    LogOut();
  };
  //
  //
  const handleLanguage = () => {
    i18n.changeLanguage(language == "ar" ? "en" : "ar");
    document.documentElement.setAttribute(
      "dir",
      language == "ar" ? "rtl" : "ltr"
    );
    handleLangItemClick();
  };

  return (
    <nav
      className="flex justify-between w-full px-5 py-3  bg-w layout-navbar dark:bg-dark-primary"
      dir={i18n.dir(language)}
    >
      {hidden ? (
        ""
      ) : (
        <div className="flex gap-10">
          <a href="">
            <img
              alt=""
              // srcset={bg2}
              src={orgData?.organizations?.logo}
              className="animated-box w-[30px] rounded-xl"
            />
            {/* Logo */}
          </a>
        </div>
      )}

      <div className="flex items-center gap-5">
        {!!token && (
          <Typography className="text-black dark:text-white">
            <Link href="#" onClick={handleLogout}>
              {t("Logout")}
            </Link>
          </Typography>
        )}
        <Typography className="text-black dark:text-white">
          <a href={`https://wa.me/${orgData?.organizations?.phone}/`}>
            {t("landing.contactUs")}
          </a>
        </Typography>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <button
          onClick={handleLanguage}
          //
          className={`text-3xl`}
        >
          <Icon
            icon="icon-park-outline:translate"
            className="duration-300 transition-all hover:!text-primaryText"
            style={{
              color: theme?.palette?.primary?.main,
            }}
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
