import React from "react";
import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../../utils/helpers";

function Line() {
  const theme = useTheme();

  return (
    <div>
      <hr
        className="Line"
        style={{ borderColor: hexToRGBA(theme.palette.primary.main, 0.1)}}
      />
    </div>
  );
}

export default Line;
