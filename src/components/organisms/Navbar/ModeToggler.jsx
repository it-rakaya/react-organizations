/* eslint-disable react/prop-types */
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import IconifyIcon from "../../atoms/icons/IconifyIcon";

const ModeToggler = (props) => {
  const { settings } = props;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  const handleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
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

  // useEffect(() => {
  //   const savedMode = localStorage.getItem("darkMode");

  //   if (!isDarkMode) {
  //     document.body.classList.remove("dark");
  //   }
  //   if (isDarkMode === null) {
  //     localStorage.setItem("darkMode", "false");
  //   }
  //   if (isDarkMode) {
  //     setIsDarkMode(savedMode === "true");
  //     document.body.classList.add("dark");
  //   }
  // }, []);

  return (
    <IconButton
      color="inherit"
      aria-haspopup="true"
      onClick={handleDarkMode}
      name="darkMode"
      aria-pressed="false"
      aria-label="Toggle dark mode"
    >
      <IconifyIcon
        icon={
          settings.mode === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"
        }
      />
    </IconButton>
  );
};

export default ModeToggler;
