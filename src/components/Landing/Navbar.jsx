import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../hooks/useMutate";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const linkStyle =
    "text-primaryText transition-all hover:text-primary duration-300";
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { orgData } = UseOrg();
  const { logout, user } = useAuth();

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
            className="animated-box w-[30px] "
          />
          {/* Logo */}
        </a>
        {!!user && (
          <Link href="#" onClick={handleLogout} className={linkStyle}>
            Logout
          </Link>
        )}
        <Link href="/" className={linkStyle}>
          Contact us
        </Link>
      </div>
      <button
        onClick={() => {
          i18n.changeLanguage(language == "ar" ? "en" : "ar");
        }}
        className={`text-3xl`}
      >
        <Icon
          icon="icon-park-outline:translate"
          className="duration-300 text-primary transition-color hover:text-primaryText"
        />
      </button>
    </nav>
  );
}

export default Navbar;
