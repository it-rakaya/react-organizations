/* eslint-disable react/prop-types */
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import { useTheme } from "@mui/material/styles";
// import PropTypes from "prop-types";

// function CircularProgressWithLabel(props) {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{ position: "relative", display: "inline-flex" }}
//       className="progress"
//     >
//       <CircularProgress
//         variant="determinate"
//         {...props}
//         style={{
//           color: theme.palette.primary.main,
//           width: "45px",
//           height: "45",
//         }}
//       />
//       <Box
//         sx={{
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           position: "absolute",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Typography
//           variant="caption"
//           component="div"
//           style={{ color: theme.palette.primary.main }}
//           //   className="!p-2"
//         >
//           {`${Math.round(props.value)}%`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// CircularProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate variant.
//    * Value between 0 and 100.
//    * @default 0
//    */
//   value: PropTypes.number.isRequired,
// };

// export default function Progress({ status }) {
//   return <CircularProgressWithLabel value={status} />;
// }

// -------------------------------------------------------------------------
/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useIsRTL } from "../../hooks/useIsRTL";
function LinearProgressWithLabel(props) {
  const isRTL = useIsRTL();
  return (
    <Box
      sx={{ display: "flex", alignItems: "center" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Box sx={{ width: "100%", mr: 1, transform: !isRTL && "rotate(180deg)" }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-black dark:text-white"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Progress({ status }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={status} />
    </Box>
  );
}
