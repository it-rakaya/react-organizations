/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import { t } from "i18next";
import { hexToRGBA } from "../../utils/helpers";
import { useTheme } from "@mui/material/styles";

export default function PreviewImageLink({  url }) {
  const theme = useTheme();

  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  return (
    <div className="w-full">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <a data-fancybox="gallery" href={url} className="w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full rounded-xl">
              <div
                className="flex items-center justify-center w-full gap-2 p-2 rounded-md cursor-pointer "
                // style={{
                //   backgroundColor: bgMain,
                // }}
              >
                {/* <PreviewIcon stroke="#292D32" /> */}
                <IconifyIcon 
                    icon={"iconamoon:file-image-light"}
                    className="text-[1.6rem]" />
{/* 
                <span className="text-sm">   
                {t("Click here to view the attachment")}

                
                </span> */}
              </div>
            </div>
          </div>
        </a>
      </Fancybox>
    </div>
  );
}
