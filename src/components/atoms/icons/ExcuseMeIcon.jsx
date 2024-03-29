/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material/styles";

function ExcuseMeIcon({ className }) {
  const theme = useTheme();

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="57"
        viewBox="0 0 24 24"
        className={className}
      >
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M0 0h24v24H0z" />
          <path
            // fill="currentColor"
            fill={theme?.palette?.primary?.main}
            d="M12 1.67c.955 0 1.845.467 2.39 1.247l.105.16l8.114 13.548a2.914 2.914 0 0 1-2.307 4.363l-.195.008H3.882a2.914 2.914 0 0 1-2.582-4.2l.099-.185l8.11-13.538A2.914 2.914 0 0 1 12 1.67M12.01 15l-.127.007a1 1 0 0 0 0 1.986L12 17l.127-.007a1 1 0 0 0 0-1.986zM12 8a1 1 0 0 0-.993.883L11 9v4l.007.117a1 1 0 0 0 1.986 0L13 13V9l-.007-.117A1 1 0 0 0 12 8"
          />
        </g>
      </svg>
    </div>
  );
}

export default ExcuseMeIcon;
