/* eslint-disable react/prop-types */
import { t } from "i18next";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../../utils/helpers";
import Icon from "@mdi/react";
import { mdiEyeOutline } from "@mdi/js";

function PreviewPdf({ item, eyeIcon }) {
  const theme = useTheme();

  return (
    <div>
      <a
        href={item?.value}
        download={item?.value}
        className=""
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={` flex items-center w-full  p-1  cursor-pointer rounded-md  `}
        >
          {eyeIcon ? (
            <Icon path={mdiEyeOutline} size={1} className="text-black dark:text-white " />
          ) : (
            <IconifyIcon
              icon={"prime:file-pdf"}
              className="text-3xl text-black dark:text-white "
            />
          )}
        </div>
      </a>
    </div>
  );
}

export default PreviewPdf;
