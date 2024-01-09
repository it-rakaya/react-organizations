/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { sideBarItems } from "../../../data/sidebar";
import { useIsRTL } from "../../../hooks/useIsRTL";
import ArrowSideBar_IC from "../../atoms/icons/ArrowSideBar";
import { useTheme } from "@mui/material/styles";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import IconifyIcon from "../../atoms/icons/IconifyIcon";

export const SideBar = ({
  handleCollapsedSideBar,
  setCollapsed,
  collapsed,
  setToggled,
  toggled,
}) => {
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 800px)").matches
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const [opened, setOpened] = useState({});
  const theme = useTheme();
  const { orgData } = UseOrg();
  const { user } = useAuth();

  const path = location.pathname;

  const goTo = (e, link) => {
    e.preventDefault();
    if (e.button === 0) {
      if (e.ctrlKey) {
        window.open(link, "_blank");
      } else {
        navigate(link);
      }
    } else if (e.button === 1) {
      window.open(link, "_blank");
    }
  };

  const findPathParentMenu = (path) => {
    var opened = {};
    sideBarItems.forEach((item) => {
      if (item.link) {
        if (item.link === path) {
          opened[item.id] = true;
        }
      }
      if (item.items) {
        item.items.forEach((innerItem) => {
          if (innerItem.link) {
            if (innerItem.link === path) {
              opened[item.id] = true;
            }
          } else if (innerItem.items) {
            innerItem.items.forEach((innerInnerItem) => {
              if (innerInnerItem.link) {
                if (innerInnerItem.link === path) {
                  opened[item.id] = true;
                  opened[innerItem.id] = true;
                }
              }
            });
          }
        });
      }
    });
    return opened;
  };

  useEffect(() => {
    setOpened(findPathParentMenu(path));
  }, [path]);

  const isOpen = (id) => {
    if (collapsed) return false;
    return opened[id];
  };

  const generateItem = (Item) => {
    if (Item?.heading) {
      return (
        <div className="text-white sidebar-heading">
          {!collapsed && t(Item.heading)}
        </div>
      );
    }
    return Item.items ? (
      <SubMenu
        defaultOpen={isOpen(Item.id)}
        key={Item.id}
        label={t(Item.label)}
        icon={<Item.icon size={15} />}
      >
        {Item.items.map((innerItem) => generateItem(innerItem))}
      </SubMenu>
    ) : (
      <>
        {Item.heading && (
          <div className="sidebar-heading">{!collapsed && t(Item.heading)}</div>
        )}

        {/* <Tooltip label={t(Item?.label)} > */}
        <MenuItem
          rootStyles={{
            [`.ps-active`]: {
              backgroundColor:
                location.pathname === Item.link &&
                `${theme?.palette?.primary?.main} !important`,
              borderRadius: "8px",
              // transition: "all 250ms linear",
              // height: "100vh",
            },
          }}
          className={
            location.pathname === Item.link
              ? `font-bold text-white rounded-[8px] px-2 mt-1`
              : "font-bold rounded-[8px] text-mainBlack px-2 mt-1"
          }
          key={Item.id}
          onClick={(e) => {
            goTo(e, Item.link);
            if (toggled) {
              setToggled(!toggled);
            }
          }}
          icon={<Item.icon size={15} className="dark:text-white"/>}
          active={location?.pathname === Item.link}
        >
          <div className=" dark:text-white">{t(Item.label)}</div>
        </MenuItem>
      </>
    );
  };
  return (
    <div
    
      style={{
        display: "flex",
        height: "100vh",
        minHeight: "400px",
        direction:isRTL ? "rtl" : "ltr",
        position: "relative",
        backgroundColor: toggled
          ? "rgb(249 249 249)"
          : "rgba(249, 249, 249, 0.7)",
      }}
      className="dark:!bg-[#2c3639]"

    >
      <Sidebar

        rtl ={isRTL}
        toggled={toggled}
        customBreakPoint="800px"
        backgroundColor={
          toggled ? "rgb(249 249 249)" : "rgba(249, 249, 249, 0.7)"
        }
        onBreakPoint={setBroken}
        transitionDuration={500}

        collapsed={collapsed}
        onBackdropClick={() => setToggled(false)}
        // rootStyles={{ paddingTop: !toggled && "20px" }}
        
      >
        <div
          className={`${
            !collapsed
              ? "sm:w-[220px] flex flex-row  justify-between pb-5 mt-5"
              : "md:w-[70px] flex justify-center  pb-5 mt-5 "
          } `}
        >
          {!collapsed && (
            <div className="m-auto">
              <img
                src={orgData?.organizations?.logo}
                className="object-contain w-24 h-12 lg:ms-3 image-logo-site"
                alt="logo"
              />
            </div>
          )}
          {!toggled ? (
            <div className="">
              <ArrowSideBar_IC
                className={`cursor-pointer transition-ease collapsed-button-sidebar scale-x-[-1]  ${
                  collapsed && "scale-x-[1]"
                } `}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          ) : (
            <div onClick={() => setToggled(!toggled)} className="ml-5">
              <IconifyIcon icon={"iconoir:cancel"} className="dark:text-white" />
            </div>
          )}
        </div>
        <Menu>
          {sideBarItems.map((Item) =>
            Item.items ? (
              <SubMenu
                defaultOpen={isOpen(Item.id)}
                className={
                  location.pathname === Item.link
                    ? " font-bold text-white"
                    : "font-bold text-mainBlack"
                }
                key={Item.id}
                label={t(Item.label)}
                icon={<Item.icon size={15} />}
                active={location.pathname === Item.link}
              >
                {Item.items.map((innerItem) => generateItem(innerItem))}
              </SubMenu>
            ) : (
              generateItem(Item)
            )
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};
