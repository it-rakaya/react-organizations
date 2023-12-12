/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/avatars/1.png";
import { useLanguageContext } from "../../../context/language";
import { useIsRTL } from "../../../hooks";
import DarkModeIcon from "../../atoms/icons/DarkModeIcon";
import NotificationIcon from "../../atoms/icons/NotificationIcon";
import TranslateIcon from "../../atoms/icons/TranslateIcon";

const NavBar = ({
  setOpenSide,
  openSide,

  changeStyle,
}) => {

  const [dropDown, setDropDown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const handleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (!isDarkMode) {
      document.body.classList.remove("dark");
    }
    if (isDarkMode === null) {
      localStorage.setItem("darkMode", "false");
    }
    if (isDarkMode) {
      setIsDarkMode(savedMode === "true");
      document.body.classList.add("dark");
    }
  }, []);

  const { t } = useTranslation();
  const handleDropDown = () => {
    setDropDown((prevState) => !prevState);
  };

  const handleClickOutside = () => {
    setDropDown(false);
  };

  const isRTL = useIsRTL();

  const { changeLang } = useLanguageContext();

  const handleToggleSideBar = () => {
    if (!openSide) {
      document.body.setAttribute("drawer-aside-bar", "on");
      setOpenSide(!openSide);
    } else {
      document.body.removeAttribute("drawer-aside-bar");
      setOpenSide(!openSide);
    }
  };
  // const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    Cookies.remove("token");
  };

  // const { user } = useAuth();
  // useEffect(() => {}, [user]);

  return (
    <div
      className={
       
        ` ${changeStyle && "rounded-b-xl transition-all " } flex items-center justify-between h-16 p-2 w-100 bg-[#f7f7f9]`
      }
      style={{boxShadow: changeStyle && "0px 4px 8px -4px rgba(76, 78, 100, 0.42)" }}
    >
      <div className="flex items-center py-6 w-100">
        {/* <img src="" className="object-contain w-12 h-12 ms-3" alt="logo" /> */}
        <div
          className="cursor-pointer sidebar_mobile_toggle"
          onClick={handleToggleSideBar}
        >
          <FaBars className="text-[15px] mx-5 text-mainBlue " />
        </div>

        {/* <Breadcrumbs isSidebarCollapsed={isSidebarCollapsed} /> */}
      </div>

      {/* <Settings /> */}

      <div className="relative flex items-center gap-4 me-2">
        <div className="flex dark-light-mode-style">
          <DarkModeIcon />
        </div>

        <button
          type="button"
          onClick={(e) =>
            changeLang(
              e.currentTarget.firstElementChild?.getAttribute("data-lang")
            )
          }
        >
          <TranslateIcon />
        </button>
        <button
          type="button"
          onClick={(e) =>
            changeLang(
              e.currentTarget.firstElementChild?.getAttribute("data-lang")
            )
          }
        >
          <NotificationIcon />
        </button>

        <OutsideClickHandler onOutsideClick={handleClickOutside}>
          <div
            className="relative flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleDropDown}
          >
            <img
              src={logo}
              className="object-contain w-10 h-10 rounded-full"
              alt="logo"
            />
          </div>
          {/* drop-down */}

          {dropDown && (
            <div
              className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary font-bold py-4 text-sm w-275 show absolute m-0 left-0 top-[55px] inset-[0px 0px auto auto] z-105 dark:bg-dark-tertiary"
              data-kt-menu="true"
              data-popper-placement="bottom-end"
            >
              <div className="px-3 menu-item">
                <div className="flex items-center px-3 menu-content">
                  <div className="symbol symbol-50px me-5">
                    <img
                      className="w-[50px] h-[50px] rounded-full"
                      alt="avatar"
                      src={logo}
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center text-base font-bold">
                      <span className="text-[14px]">
                        {" "}
                        {/* {user?.data?.data?.name} */}
                      </span>
                      <span className="bg-[#43916d] text-[#f5f8fa] rounded-md font-bold text-[0.70rem] px-[0.3rem] mr-2 py-[0.10rem] ml-2">
                        {/* {user?.data?.data?.user_type} */}

                        {/* {t("Super Admin")} */}
                      </span>
                    </div>

                    <a
                      href="#"
                      className="font-bold text-[#a1a5b7] hover:text-[#009ef7] text-xs "
                    >
                      {/* {user?.data?.data?.phone} */}
                    </a>
                  </div>
                </div>
              </div>

              <div className="my-2 separator"></div>

              <div className="px-5 my-1 menu-item">
                <Link
                  to="/setting"
                  className="menu-link inline-block w-full py-[.65rem] px-[1rem] text-[#009ef7] hover:bg-[rgba(245,248,250,.8)] hover:rounded-[.475rem] dark:!text-dark-textWhite dark:hover:bg-dark-primary"
                >
                  {t("Account Setting")}
                </Link>
              </div>

              <div className="px-5 my-1 menu-item">
                <span
                  onClick={handleLogOut}
                  className="menu-link inline-block w-full py-[.65rem] px-[1rem] text-[#009ef7] hover:bg-[rgba(245,248,250,.8)] hover:rounded-[.475rem] cursor-pointer dark:!text-dark-textWhite dark:hover:bg-dark-primary"
                >
                  {t("Logout")}
                </span>
              </div>
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default NavBar;
