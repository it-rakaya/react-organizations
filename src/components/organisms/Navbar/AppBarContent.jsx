/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import LanguageDropdown from "./LanguageDropdown";
import ModeToggler from "./ModeToggler";
import UserDropdown from "./UserDropdown";

const AppBarContent = (props) => {
  const { settings, saveSettings, toggled, setToggled } = props;
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
        className=" actions-left dark:bg-"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      >
        <div className="block md:hidden" onClick={() => setToggled(!toggled)}>
          {toggled ? (
            ""
          ) : (
            <IconButton color="inherit" sx={{ ml: -2.75 }}>
              <IconifyIcon icon="mdi:menu" />
            </IconButton>
          )}
        </div>
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <LanguageDropdown/>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

export default AppBarContent;
