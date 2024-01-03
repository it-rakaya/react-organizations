/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types, no-unused-vars
import Icon from "@mdi/react";
import { mdiFileSearchOutline } from "@mdi/js";
import { useTheme } from "@mui/material/styles";

function DataNotFound({ title }) {
  const theme = useTheme();

  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-5"
      style={{ left: "calc(50% - 100px )", top: "calc(60% - 50px)" }}
    >
      <Icon
        path={mdiFileSearchOutline}
        className="dark:text-white"
        size={4}
        style={{ color: theme?.palette?.primary?.main }}
      />
      <div className="text-3xl font-bold md:m-0 dark:text-white">{title}</div>
    </div>
  );
}

export default DataNotFound;
