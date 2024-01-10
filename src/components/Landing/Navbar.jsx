import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../hooks/useMutate";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import Typography from "@mui/material/Typography";
import { useSettings } from "../../hooks/useSettings";
import { useEffect } from "react";

function Navbar() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { orgData } = UseOrg();
  const { logout, user } = useAuth();
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
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);
  // Set dark mode class on page load

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
    // handleLangItemClick("en");
    i18n.changeLanguage(language == "ar" ? "en" : "ar");
    saveSettings({ ...settings, direction: language == "ar" ? "ltr" : "rtl" });
    handleLangItemClick();
  };

  return (
    <nav
      className="flex justify-between w-full px-5 py-3 layout-navbar"
      dir={i18n.dir(language)}
    >
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

      <div className="flex items-center gap-5">
        {!!user && (
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
