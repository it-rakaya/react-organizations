import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../hooks/useMutate";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";

function Navbar() {
  const linkStyle =
    "text-primaryText transition-all hover:text-primary duration-300";
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { orgData } = UseOrg();
  const { logout, user } = useAuth();
  const theme = useTheme();

  const { mutate: LogOut } = useMutate({
    mutationKey: [`Log_out`],
    endpoint: `logout`,
    onError: (err) => {
      console.log("err", err);
    },
  });

  const handleLogout = () => {
    logout();
    LogOut();
  };

  return (
    <nav
      className="flex justify-between w-full px-5 py-3 layout-navbar"
      dir={i18n.dir(language)}
    >
      <div className="flex gap-10">
        <a href="" className={linkStyle}>
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
          <Link href="#" onClick={handleLogout} className={linkStyle}>
            Logout
          </Link>
        )}
        <Link href="/" className={linkStyle}>
          {t('landing.contactUs')}
        </Link>
        <button
          onClick={() => {
            i18n.changeLanguage(language == "ar" ? "en" : "ar");
          }}
          className={`text-3xl`}
        >
          <Icon
            icon="icon-park-outline:translate"
            className="duration-300 transition-color hover:text-primaryText"
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
