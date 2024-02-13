/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import Loading from "../components/molecules/Loading";
import AppBarContent from "../components/organisms/Navbar/AppBarContent";
import LayoutAppBar from "../components/organisms/Navbar/appBar/LayoutAppBar";
import { SideBar } from "../components/organisms/Sidebar/Sidebar";
import { useAuth } from "../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../context/organization provider/OrganizationProvider";
import { useSettings } from "../hooks/useSettings";
import Footer from "./Footer";

export const Root = ({ props }) => {
  const [openSide, setOpenSide] = useState(false);
  const [, setShowOverlay] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const token = Cookies.get("token");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setShowOverlay(openSide);
  }, [openSide]);

  const handleClickOutside = () => {
    // document.body.removeAttribute("drawer-aside-bar");
    setOpenSide(false);
  };

  useEffect(() => {
    setShowOverlay(openSide);
  }, [openSide]);

  const handleCollapsedSideBar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  const { orgData , isSuccess, isRefetching  } = UseOrg();
  const { settings, saveSettings, contentWidth } = useSettings();


  const [navVisible, setNavVisible] = useState(false);



  useEffect(() => {
    if (!token) {
      navigate("/");
      logout();
    }
  }, [navigate, token]);

  const toggleNavVisibility = () => setNavVisible(!navVisible);

  if (!isSuccess || isRefetching) return <Loading />;
  if (token) {
    return (
      <div
        // style={{height: isFacilityRoute ? "calc(100vh - 64px)" : ""}}
        className={
          `${
            toggled
              ? "flex"
              : // : collapsed
                "flex"
          } `
          // : "grid grid-cols-12 w-full"
        }
      >
        {user?.is_verified && (
          <div
            className={
              toggled ? "w-[20%]" : collapsed ? "w-[6%]" : " md:w-[23%]"
            }
          >
            <OutsideClickHandler onOutsideClick={handleClickOutside}>
              <div className="fixed z-[9999] md:z-[999]">
                <SideBar
                  handleClickItem={handleClickOutside}
                  isSidebarCollapsed={isSidebarCollapsed}
                  handleCollapsedSideBar={handleCollapsedSideBar}
                  setCollapsed={setCollapsed}
                  collapsed={collapsed}
                  setToggled={setToggled}
                  toggled={toggled}
                />
              </div>
            </OutsideClickHandler>
            {/* {showOverlay && <Overlay zIndex={1100} />} */}
          </div>
        )}

        <div
          className={` main_container ${
            collapsed ? "w-full" : user?.is_verified ? "w-full" : "w-full"
          }`}
        >
          <div className={`h-full flex`} >
            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0,
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
              }}
            >
              <LayoutAppBar
                toggleNavVisibility={toggleNavVisibility}
                settings={settings}
                appBarContent={
                  <AppBarContent
                    settings={settings}
                    isSidebarCollapsed={isSidebarCollapsed}
                    toggled={toggled}
                    setSidebarCollapsed={setSidebarCollapsed}
                    saveSettings={saveSettings}
                    setToggled={setToggled}
                    {...props}
                  />
                }
              />
              <main
             
                className="flex p-6  flex-col justify-between !pb-1 layout-page-content  md:max-h-[91vh] lg:max-w-full overflow-scroll md:max-w-screen-lg flex-grow w-full mx-auto transition-padding"
              >
                <Outlet />
                <Footer />
              </main>
            </Box>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
};

// return <Loading mainTitle={t('loading')} />;
