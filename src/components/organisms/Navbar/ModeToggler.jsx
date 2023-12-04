/* eslint-disable react/prop-types */
import IconButton from "@mui/material/IconButton";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { useEffect, useState } from "react";

const ModeToggler = (props) => {





  const { settings, saveSettings } = props;



 
  // const handleDarkMode = () => {
  //   const newMode = !isDarkMode;
  //   setIsDarkMode(newMode);
  //   if (newMode) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }

  //   localStorage.setItem("darkMode", newMode);
  // };



  const handleModeChange = (mode) => {
    saveSettings({ ...settings, mode: mode });
  };
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const handleModeToggle = () => {
    if (settings.mode === "light") {
      localStorage.setItem("darkMode", "true");
      handleModeChange("dark");
      document.body.classList.add("dark");

    } else {
      localStorage.setItem("darkMode", "false");

      handleModeChange("light");
      document.body.classList.remove("dark");
    }
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


  return (
    <IconButton color="inherit" aria-haspopup="true" onClick={handleModeToggle}>
      <IconifyIcon
        icon={
          settings.mode === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"
        }
      />
    </IconButton>
  );
};

export default ModeToggler;
