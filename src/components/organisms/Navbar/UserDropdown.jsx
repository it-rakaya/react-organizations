/* eslint-disable react/prop-types */
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAvarar from "../../../assets/avatars/1.png";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { t } from "i18next";

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
      notify("success", `good luck `);
    },
    onError: (err) => {
      console.log("err", err);
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
          src={user?.attachmentUrl?.length && user?.attachmentUrl[1]?.value}
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
                src={user?.attachmentUrl?.length ? user?.attachmentUrl[1]?.value : ''}
                sx={{ width: "2.5rem", height: "2.5rem" }}
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
              <Typography sx={{ fontWeight: 600 }}>{user?.name}</Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {user?.role_name || "user"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: "0 !important" }} />
        <MenuItem sx={{ p: 0 }} onClick={() => navigate("/")}>
          <Box sx={styles}>
            <IconifyIcon icon="iconoir:page" />
            {t("Landing")}
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => navigate("/dashboard/profile/")}>
          <Box sx={styles}>
            <IconifyIcon icon="mdi:account-outline" />
            {t("Profile")}
          </Box>
        </MenuItem>
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/apps/email")}
        >
          <Box sx={styles}>
            <IconifyIcon icon="mdi:email-outline" />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/apps/chat")}
        >
          <Box sx={styles}>
            <IconifyIcon icon="mdi:message-outline" />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/pages/account-settings/account")}
        >
          <Box sx={styles}>
            <IconifyIcon icon="mdi:cog-outline" />
            Settings
          </Box>
        </MenuItem>
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/pages/pricing")}
        >
          <Box sx={styles}>
            <IconifyIcon icon="mdi:currency-usd" />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose("/pages/faq")}
        >
          <Box sx={styles}>
            <IconifyIcon icon="mdi:help-circle-outline" />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            "& svg": { mr: 2, fontSize: "1.375rem", color: "text.primary" },
          }}
        >
          <IconifyIcon icon="mdi:logout-variant" />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
