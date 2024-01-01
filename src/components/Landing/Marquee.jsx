/* eslint-disable react/prop-types */
import "../../App.css";
import { useTheme } from "@mui/material/styles";

const Marquee = ({ children, disabled }) => {
  const theme = useTheme();

  return (
    <div
      style={{ backgroundColor: theme?.palette?.primary?.main }}
      className=" w-[100%] fixed left-0 bottom-0 overflow-hidden flex justify-center z-[9]"
    >
      <div className="w-[98%] overflow-hidden marquee-container">
        <div
          className={`${
            disabled ? "" : "marquee-content"
          } flex flex-row gap-10`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
