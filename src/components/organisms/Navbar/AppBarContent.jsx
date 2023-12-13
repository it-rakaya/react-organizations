/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LanguageDropdown from "./LanguageDropdown";
import ModeToggler from "./ModeToggler";
import UserDropdown from "./UserDropdown";
import IconifyIcon from "../../atoms/icons/IconifyIcon";

const AppBarContent = (props) => {
  const { settings, saveSettings, setSidebarCollapsed } = props;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className=" actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      >
        <div className="block md:hidden"             onClick={() => setSidebarCollapsed(true)}
>
          <IconButton
            color="inherit"
            sx={{ ml: -2.75 }}
          >
            <IconifyIcon icon="mdi:menu" />
          </IconButton>
        </div>
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

export default AppBarContent;
