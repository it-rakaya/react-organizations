/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Typography } from "@mui/material";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import Fancybox from "./Fancybox";
import Icon from "@mdi/react";
import { mdiEyeOutline } from "@mdi/js";
import ViewICon from "../atoms/icons/ViewICon";

export default function PreviewImageLink({ url, eyeIcon }) {
  return (
    <div className="">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <a data-fancybox="gallery" href={url} className="">
          <div className="flex flex-col items-center justify-center w-full ">
            <div className="w-full rounded-xl">
              <div className="flex items-center w-full p-2 rounded-md cursor-pointer ">
                {eyeIcon ? (
                  <ViewICon className="dark:text-white" />
                ) : (
                  <IconifyIcon
                    icon={"iconamoon:file-image-light"}
                    className="text-[1.6rem] cursor-pointer dark:text-white  "
                  />
                )}
                {!eyeIcon && (
                  <Typography className="file-name">
                    {url?.name?.slice(0, 15)}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </a>
      </Fancybox>
    </div>
  );
}
