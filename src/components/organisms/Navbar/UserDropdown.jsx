/* eslint-disable react/prop-types */
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { t } from "i18next";
import defaultImage from "../../../../public/profile pic1.png";

// ** Icon Imports

// ** Context

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = (props) => {
  const { settings } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { direction } = settings;
  const theme = useTheme();
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    if (url) {
      navigate(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      mr: 2,
      fontSize: "1.375rem",
      color: "text.primary",
    },
  };
  const { mutate: LogOut } = useMutate({
    mutationKey: [`Log_out`],
    endpoint: `logout`,
    onSuccess: () => {
      notify("success", t("see you soon"));
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });

  const handleLogout = () => {
    handleDropdownClose();
    logout();
    LogOut();
  };

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          alt="John Doe"
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={
            user?.profile_photo
              ? user?.profile_photo
              : defaultImage
          }
          style={{ backgroundColor: theme?.palette?.primary?.main }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar
                alt="John Doe"
                src={
                  user?.profile_photo
                    ? user?.profile_photo
                    : defaultImage
                }
                sx={{ width: "2.5rem", height: "2.5rem" }}
                style={{ backgroundColor: theme?.palette?.primary?.main }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                ml: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontWeight: 600 }}
                className="!text-black dark:!text-white"
              >
                {user?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: "0 !important" }} />
        {user?.is_verified && (
          <>
            <MenuItem sx={{ p: 0 }} onClick={() => navigate("/")}>
              <Box sx={styles} className="!text-black dark:!text-white">
                <IconifyIcon
                  icon="uil:home"
                  style={{ color: theme?.palette?.primary?.main }}
                />
                {t("Landing")}
              </Box>
            </MenuItem>
            <MenuItem
              sx={{ p: 0 }}
              onClick={() => navigate("/dashboard/profile/")}
            >
              <Box sx={styles} className="!text-black dark:!text-white">
                <IconifyIcon
                  icon="mdi:account-outline"
                  style={{ color: theme?.palette?.primary?.main }}
                />
                {t("Profile")}
              </Box>
            </MenuItem>
          </>
        )}
        <Divider />
        <MenuItem
          onClick={handleLogout}
          className="!text-black dark:!text-white"
          sx={{
            py: 2,
            "& svg": { mr: 2, fontSize: "1.375rem", color: "text.primary" },
          }}
        >
          <IconifyIcon
            icon="mdi:logout-variant"
            style={{ color: theme?.palette?.primary?.main }}
          />
          {t("Logout")}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
