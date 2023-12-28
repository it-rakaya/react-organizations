/* eslint-disable react/prop-types */
import { Box, styled } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import AppBarContent from "../components/organisms/Navbar/AppBarContent";
import LayoutAppBar from "../components/organisms/Navbar/appBar/LayoutAppBar";
import { SideBar } from "../components/organisms/Sidebar/Sidebar";
import { useAuth } from "../context/auth-and-perm/AuthProvider";
import { useSettings } from "../hooks/useSettings";

export const Root = ({ props }) => {
  const [openSide, setOpenSide] = useState(false);
  const [, setShowOverlay] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  console.log("🚀 ~ file: Root.jsx:19 ~ Root ~ collapsed:", collapsed);
  const [toggled, setToggled] = React.useState(false);
  console.log("🚀 ~ file: Root.jsx:20 ~ Root ~ toggled:", toggled);

  const navigate = useNavigate();
  const [changeStyle, setChangeStyle] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setShowOverlay(openSide);
  }, [openSide]);

  const handleClickOutside = () => {
    document.body.removeAttribute("drawer-aside-bar");
    setOpenSide(false);
  };

  useEffect(() => {
    setShowOverlay(openSide);
  }, [openSide]);

  const handleCollapsedSideBar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
    // if (!isSidebarCollapsed) {
    //   document.body.setAttribute("sidebar-collapsed", "true");
    // } else {
    //   document.body.removeAttribute("sidebar-collapsed");
    // }
  };
  useEffect(() => {
    // إضافة معالج السحب إلى العنصر الذي له الكلاس "main"
    const mainElement = document.querySelector(".main");

    if (mainElement) {
      const handleScroll = () => {
        if (mainElement.scrollTop > 10) {
          setChangeStyle(true);
        } else {
          setChangeStyle(false);
        }
      };

      mainElement.addEventListener("scroll", handleScroll);

      return () => {
        mainElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  const { settings, saveSettings, contentWidth } = useSettings();

  const VerticalLayoutWrapper = styled("div")({
    height: "100%",
    display: "flex",
  });
  const MainContentWrapper = styled(Box)({
    flexGrow: 1,
    minWidth: 0,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  });

  const [navVisible, setNavVisible] = useState(false);

  const ContentWrapper = styled("main")(({ theme }) => ({
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(6),
    transition: "padding .25s ease-in-out",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  }));
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const toggleNavVisibility = () => setNavVisible(!navVisible);
  if (token) {
    return (
      <div
        className={
          toggled
            ? "flex"
            : // : collapsed
              "flex"
          // : "grid grid-cols-12 w-full"
        }
      >
        {user?.is_verified && (
          <div
            className={toggled ? "w-[20%]" : collapsed ? "w-[6%]" : " md:w-[23%]"}
          >
            <OutsideClickHandler onOutsideClick={handleClickOutside}>
              <div className="fixed z-[999]">
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
          className={
            collapsed ? "w-full" : user?.is_verified ? "w-full" : "w-full"
          }
        >
          <VerticalLayoutWrapper className="">
            <MainContentWrapper className="layout-content-wrapper">
              <LayoutAppBar
                toggleNavVisibility={toggleNavVisibility}
                settings={settings}
                appBarContent={
                  <AppBarContent
                    settings={settings}
                    isSidebarCollapsed={isSidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    saveSettings={saveSettings}
                    setToggled={setToggled}
                    toggled={toggled}
                    // appBarContent={verticalLayoutProps.appBar?.content}
                    {...props}
                  />
                }
              />
              <ContentWrapper
                className="layout-page-content"
                sx={{
                  ...(contentWidth === "boxed" && {
                    mx: "auto",
                    "@media (min-width:1440px)": { maxWidth: 1440 },
                    "@media (min-width:1200px)": { maxWidth: "100%" },
                  }),
                }}
              >
                {/* <div className="mt-[0px] bg-[#f7f7f9]  h-screen py-5 m"> */}
                <Outlet />
                {/* </div> */}
              </ContentWrapper>
            </MainContentWrapper>
          </VerticalLayoutWrapper>
        </div>

        {/* <Footer /> */}
      </div>
    );
  } else {
    navigate("/");
  }
};

// return <Loading mainTitle={t('loading')} />;
