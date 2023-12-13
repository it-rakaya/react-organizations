/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import { t } from "i18next";

export default function PreviewImageLink({ bgMain, url }) {
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
                className="flex items-center justify-center w-full gap-2 p-2 cursor-pointer "
                style={{
                  backgroundColor: bgMain,
                }}
              >
                {/* <PreviewIcon stroke="#292D32" /> */}
                <IconifyIcon icon={"bi:image-fill"} className="text-xl" />

                <span className="text-sm">   
                {t("Click here to view the attachment")}

                
                </span>
              </div>
            </div>
          </div>
        </a>
      </Fancybox>
    </div>
  );
}
