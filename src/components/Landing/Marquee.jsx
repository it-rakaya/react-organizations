/* eslint-disable react/prop-types */
import "../../App.css";
import { useTheme } from "@mui/material/styles";

const Marquee = ({ children }) => {
  const theme = useTheme();

  return (
    <div
      style={{ backgroundColor: theme?.palette?.primary?.main }}
      className="marquee-container w-[100%] fixed left-0 bottom-0 "
    >
      <div className="marquee-content">{children}</div>
    </div>
  );
};

export default Marquee;
