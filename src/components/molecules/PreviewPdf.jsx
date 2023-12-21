/* eslint-disable react/prop-types */
import { t } from "i18next";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../../utils/helpers";

function PreviewPdf({ item }) {
  const theme = useTheme();

  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  return (
    <div>
      <a href={item?.value} download={item?.value} className="" target="_blank" rel="noreferrer">
        <div
          className={` flex items-center w-full  p-1  cursor-pointer rounded-md  `}
  
        >
          <IconifyIcon icon={"prime:file-pdf"} className="text-3xl" />
          {/* <span className="text-sm">
            {t("Click here to view the attachment")}
          </span> */}
        </div>
      </a>
    </div>
  );
}

export default PreviewPdf;
