import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function Navbar() {
  const linkStyle =
    "text-primaryText transition-all hover:text-primary duration-300";
    const {i18n} = useTranslation();
    const language = i18n.language;
  return (
    <nav className="layout-navbar w-full flex justify-between py-3 px-5" dir={i18n.dir(language)}>
      <div className="flex gap-10">
        <a href="" className={linkStyle}>
          Logo
        </a>
        <a href="" className={linkStyle}>
          Contact us
        </a>
      </div>
      <button onClick={() => {i18n.changeLanguage(language == 'ar'?'en':'ar')}} className={`text-3xl`}>
        <Icon icon="icon-park-outline:translate" className="text-primary transition-color hover:text-primaryText duration-300" />
      </button>
    </nav>
  );
}

export default Navbar;
